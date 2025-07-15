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
    console.log(req.body);
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

    // Check for required fields
    if(!userDetails.name || !userDetails.email || !userDetails.password || !userDetails.age || !userDetails.mobile){
        return res.status(400).json({message: 'Please fill all required fields (name, email, password, age, mobile)'});
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(userDetails.email)) {
        return res.status(400).json({message: 'Please enter a valid email address'});
    }

    // Validate mobile format
    const mobileRegex = /^[0-9]{10,15}$/;
    if(!mobileRegex.test(userDetails.mobile)) {
        return res.status(400).json({message: 'Please enter a valid mobile number (10-15 digits)'});
    }

    // Validate age
    const age = parseInt(userDetails.age);
    if(isNaN(age) || age <= 0 || age > 120) {
        return res.status(400).json({message: 'Please enter a valid age (1-120)'});
    }

    // Check if user already exists with email or mobile
    const existingUser = await User.findOne({ 
        $or: [
            { email: userDetails.email },
            { mobile: userDetails.mobile }
        ]
    });
    
    if(existingUser){
        if(existingUser.email === userDetails.email) {
            return res.status(400).json({message: 'User already exists with this email'});
        }
        if(existingUser.mobile === userDetails.mobile) {
            return res.status(400).json({message: 'User already exists with this mobile number'});
        }
    }

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const emailVerificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    console.log('Generated token:', emailVerificationToken);
    console.log('Token expires:', emailVerificationTokenExpires);

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(userDetails.password, salt);

    // Create user object matching your schema
    const userData = {
        name: userDetails.name.trim(),
        email: userDetails.email.trim().toLowerCase(),
        password: hashedPassword,
        age: age,
        mobile: userDetails.mobile.trim(), // Include mobile
        address: userDetails.address ? userDetails.address.trim() : undefined,
        city: userDetails.city ? userDetails.city.trim() : undefined,
        state: userDetails.state ? userDetails.state.trim() : undefined,
        zipCode: userDetails.zipCode ? parseInt(userDetails.zipCode) : undefined,
        role: userDetails.role || 'farmer',
        emailVerificationToken: emailVerificationToken,
        emailVerificationTokenExpires: emailVerificationTokenExpires,
        isVerified: false
    };

    console.log('User data before creation:', userData);

    try {
        const user = await User.create(userData);
        console.log('User created:', user);

        if(user){
            // Send verification email
            try {
                const fullName = user.name;
                await mailer.sendVerificationEmail(user.email, emailVerificationToken, fullName);
                
                res.status(201).json({ 
                    message: 'User registered successfully! Please check your email to verify your account.',
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        mobile: user.mobile,
                        age: user.age,
                        address: user.address,
                        city: user.city,
                        state: user.state,
                        zipCode: user.zipCode,
                        role: user.role,
                        isVerified: user.isVerified,
                        registrationDate: user.registrationDate
                    }
                });
            } catch (emailError) {
                console.error('Email sending failed:', emailError);
                res.status(201).json({ 
                    message: 'User registered successfully, but verification email could not be sent. Please contact support.',
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        mobile: user.mobile,
                        age: user.age,
                        address: user.address,
                        city: user.city,
                        state: user.state,
                        zipCode: user.zipCode,
                        role: user.role,
                        isVerified: user.isVerified,
                        registrationDate: user.registrationDate
                    }
                });
            }
        } else {
            res.status(400).json({ message: 'Invalid user data'});
        }
    } catch (dbError) {
        console.error('Database error:', dbError);
        
        // Handle specific MongoDB errors
        if (dbError.code === 11000) {
            if (dbError.keyPattern.email) {
                res.status(400).json({ message: 'Email already exists' });
            } else if (dbError.keyPattern.mobile) {
                res.status(400).json({ message: 'Mobile number already exists' });
            } else {
                res.status(400).json({ message: 'Duplicate entry detected' });
            }
        } else if (dbError.name === 'ValidationError') {
            const errors = Object.values(dbError.errors).map(err => err.message);
            res.status(400).json({ message: `Validation Error: ${errors.join(', ')}` });
        } else {
            res.status(500).json({ message: 'Server error during user creation' });
        }
    }
});

//@desc Verify email
//@route GET /api/user/verify-email
//@access Public
const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.body;
    
    console.log('Verification request received:', { token });

    if(!token) {
        console.log('No token provided');
        return res.status(400).json({message: 'Verification token is required'});
    }

    try {
        console.log('Looking for user with token:', token);
        
        const user = await User.findOne({
            emailVerificationToken
: token,
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
 console.log(req.body);
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

     console.log("user found " , user);

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

const forgotPassword=asyncHandler(async (req, res) => {
    const {email}=req.body;
    if(!email) {
        return res.status(404).json({message: 'email not found'});
    }
    
    const user =await User.findOne({email:email});

    if(!user){
         return res.status(404).json({message: 'User not found'});
    }
await mailer.sendResetPasswordEmail(user.email, emailVerificationToken, fullName);

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
    forgotPassword,
    resendVerificationEmail
};