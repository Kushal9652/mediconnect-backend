const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerUser= async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        // Save the user to the database
        await newUser.save();
        // Generate a JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        // Respond with the user data and token
        res.status(201).json({
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            },
            token
        }); 
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Respond with the user data and token
        res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
const getUserProfile = async (req, res) => {
    const userId = req.user.userId;

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Respond with the user data
        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
const handleDeleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        // Find the user by ID and delete
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Respond with success message
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
const updateUserProfile = async (req, res) => {
    const userId = req.user.userId;
    const { username, email } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { username, email },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            id: user._id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    handleDeleteUser,
    updateUserProfile
};