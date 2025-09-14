const express = require('express');
const { registerUser, loginUser, getUserProfile, handleDeleteUser, updateUserProfile } = require('../controller/user.controller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.delete('/:id', authMiddleware, handleDeleteUser);

module.exports = router;