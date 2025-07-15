const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../utils/mailer');

//@desc Get all users
//@route GET /api/user
//@access Private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password');
    res.status(200).json({message: 'Success', users});
});

//@desc Get user by ID
//@route GET /api/user/
//@access Private
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    if(!user) {
        return res.status(404).json({message: 'User not found'});
    }

    res.status(200).json({message: 'Success', user});
});

//@desc Login user
//@route POST /api/user/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    if(!email || !password){
        return res.status(400).json({message: 'Please fill all fields'});
    }
    
    const user = await User.findOne({ email });
    
    if(!user) {
        return res.status(401).json({message: 'Invalid email or password'});
    }
    
    // Check if user is verified
    if(!user.isVerified) {
        return res.status(401).json({
            message: 'Please verify your email address before logging in. Check your inbox for verification email.'
        });
    }

    //compare password with hashed password
    if(user && bcrypt.compareSync(password, user.password)){
        const token = jwt.sign({ 
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            } 
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: '24h' });
        
        user.password = undefined;
        res.setHeader('Authorization', 'Bearer ' + token);
        res.status(200).json({message: 'Success', user, token});
    } else {
        res.status(401).json({message: 'Invalid email or password'});
    }
});
 
//@desc logout User 
//@route POST /api/user/logout
//@access Public
const logoutUser = asyncHandler(async (req, res) => {
    // In a stateless JWT system, logout is handled client-side
    // The client should remove the token from storage
    res.status(200).json({message: 'Logged out successfully'});
});

//@desc Register user
//@route POST /api/user
//@access Public
const createUser = asyncHandler(async (req, res) => {
    let userDetails = req.body;

    // Check for correct field names (firstname, lastname instead of name)
    if(!userDetails.firstname || !userDetails.lastname || !userDetails.email || !userDetails.password || !userDetails.role){
        return res.status(400).json({message: 'Please fill all fields'});
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(userDetails.email)) {
        return res.status(400).json({message: 'Please enter a valid email address'});
    }

    const userAvailable = await User.findOne({ email: userDetails.email });
    if(userAvailable){
        return res.status(400).json({message: 'User already exists with this email'});
    }

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const emailVerificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    console.log('Generated token:', emailVerificationToken); // Debug log
    console.log('Token expires:', emailVerificationTokenExpires); // Debug log

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(userDetails.password, salt);

    // Create user object with verification fields
    const userData = {
        firstname: userDetails.firstname,
        lastname: userDetails.lastname,
        email: userDetails.email,
        password: hashedPassword,
        role: userDetails.role,
        emailVerificationToken: emailVerificationToken,
        emailVerificationTokenExpires: emailVerificationTokenExpires,
        isVerified: false // Make sure this is set to false
    };

    console.log('User data before creation:', userData); // Debug log

    const user = await User.create(userData);

    console.log('User created:', user); // Debug log

    if(user){
        // Send verification email
        try {
            const fullName = `${user.firstname} ${user.lastname}`;
            await mailer.sendVerificationEmail(user.email, emailVerificationToken, fullName);
            
            res.status(201).json({ 
                message: 'User registered successfully! Please check your email to verify your account.',
                user: {
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    role: user.role,
                    isVerified: user.isVerified
                }
            });
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            res.status(201).json({ 
                message: 'User registered successfully, but verification email could not be sent. Please contact support.',
                user: {
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    role: user.role,
                    isVerified: user.isVerified
                }
            });
        }
    } else {
        res.status(400).json({ message: 'Invalid user data'});
    }
});

//@desc Verify email
//@route GET /api/user/verify-email
//@access Public
const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.query;
    
    console.log('Verification request received:', { token });

    if(!token) {
        console.log('No token provided');
        return res.status(400).json({message: 'Verification token is required'});
    }

    try {
        console.log('Looking for user with token:', token);
        
        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationTokenExpires: { $gt: Date.now() }
        });

        console.log('User found:', user ? 'Yes' : 'No');

        if(!user) {
            console.log('Invalid or expired token');
            return res.status(400).json({message: 'Invalid or expired verification token'});
        }

        // Update user
        user.isVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationTokenExpires = undefined;
        
        await user.save();

        console.log('User verified successfully');
        res.status(200).json({message: 'Email verified successfully! You can now log in.'});
        
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({message: 'Database connection error. Please try again later.'});
    }
});

//@desc Resend verification email
//@route POST /api/user/resend-verification
//@access Public
const resendVerificationEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if(!email) {
        return res.status(400).json({message: 'Email is required'});
    }

    const user = await User.findOne({ email });

    if(!user) {
        return res.status(404).json({message: 'User not found'});
    }

    if(user.isVerified) {
        return res.status(400).json({message: 'Email is already verified'});
    }

    // Generate new verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const emailVerificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    user.emailVerificationToken = emailVerificationToken;
    user.emailVerificationTokenExpires = emailVerificationTokenExpires;
    await user.save();

    try {
        await mailer.sendVerificationEmail(user.email, emailVerificationToken, user.name);
        res.status(200).json({message: 'Verification email sent successfully'});
    } catch (emailError) {
        console.error('Email sending failed:', emailError);
        res.status(500).json({message: 'Failed to send verification email'});
    }
});

//@desc Update user
//@route PUT /api/user/
//@access Private
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    if(!user) {
        return res.status(404).json({message: 'User not found'});
    }

    // Don't allow updating email or password through this endpoint
    const { email, password, ...updateData } = req.body;

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, {
        new: true,
        runValidators: true
    }).select('-password');
    
    res.status(200).json({message: 'Success', updatedUser});
});

//@desc Delete user
//@route DELETE /api/user/
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    if(!user) {
        return res.status(404).json({message: 'User not found'});
    }
    
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({message: 'User deleted successfully', user});
});

module.exports = { 
    getUsers, 
    loginUser, 
    logoutUser, 
    getUser, 
    createUser, 
    updateUser, 
    deleteUser,
    verifyEmail,
    resendVerificationEmail
};