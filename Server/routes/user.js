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
    resendVerificationEmail
} = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

// Public routes (no authentication required)
router.post('/login', loginUser);
router.post('/', createUser);
router.get('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerificationEmail);

// Protected routes (authentication required)
router.use(validateToken);

router.post('/logout', logoutUser);
router.get('/all', getUsers);
router.get('/', getUser);
router.put('/', updateUser);
router.delete('/', deleteUser);

module.exports = router;