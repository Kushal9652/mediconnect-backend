const express = require('express');
const { registerUser, loginUser, getUserProfile, handleDeleteUser, updateUserProfile } = require('../controller/user.controller');
const authenticateUser = require('../middleware/authenticateUser');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateUser, getUserProfile);
router.put('/profile', authenticateUser, updateUserProfile);
router.delete('/:id', authenticateUser, handleDeleteUser);

module.exports = router;