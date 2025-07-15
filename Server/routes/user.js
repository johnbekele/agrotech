const express = require('express');
const router = express.Router();
const {
    getUsers, 
    getUser, 
    loginUser, 
    logoutUser, 
    createUser, 
    updateUser, 
    deleteUser,
    verifyEmail,
    forgotPassword,
    resendVerificationEmail
} = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

// Public routes (no authentication required) - MUST come BEFORE validateToken
router.post('/login', loginUser);
router.post('/', createUser);
router.get('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerificationEmail);
router.post('/forgot-password',forgotPassword )

// Protected routes (authentication required) - AFTER validateToken
router.use(validateToken);

router.post('/logout', logoutUser);
router.get('/all', getUsers);
router.get('/', getUser);  // This is likely causing the 401 on /api/user
router.put('/', updateUser);
router.delete('/', deleteUser);

module.exports = router;