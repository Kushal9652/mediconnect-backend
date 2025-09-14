const Doctor = require('../models/doctor.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ isActive: true })
      .select('-__v')
      .sort({ rating: -1, totalReviews: -1 });
    
    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch doctors',
      error: error.message
    });
  }
};

// Get doctors by specialization
const getDoctorsBySpecialization = async (req, res) => {
  try {
    const { specialization } = req.params;
    
    const doctors = await Doctor.find({ 
      specialization: specialization,
      isActive: true 
    })
      .select('-__v')
      .sort({ rating: -1, totalReviews: -1 });
    
    if (!doctors.length) {
      return res.status(404).json({
        success: false,
        message: `No doctors found for specialization: ${specialization}`
      });
    }

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors
    });
  } catch (error) {
    console.error('Error fetching doctors by specialization:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch doctors by specialization',
      error: error.message
    });
  }
};

// Get doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const doctor = await Doctor.findOne({ _id: id, isActive: true })
      .select('-__v');
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    console.error('Error fetching doctor by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch doctor',
      error: error.message
    });
  }
};

// Get all specializations
const getAllSpecializations = async (req, res) => {
  try {
    const specializations = await Doctor.distinct('specialization', { isActive: true });
    
    res.status(200).json({
      success: true,
      count: specializations.length,
      data: specializations.sort()
    });
  } catch (error) {
    console.error('Error fetching specializations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch specializations',
      error: error.message
    });
  }
};

// Doctor login
const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find doctor by email
    const doctor = await Doctor.findOne({ email: email.toLowerCase(), isActive: true });
    if (!doctor) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // For demo purposes, we'll use a simple password check
    // In production, you should hash passwords and use bcrypt.compare
    if (password !== 'doctor123') {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        doctorId: doctor._id,
        email: doctor.email,
        name: doctor.name
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization
      }
    });
  } catch (error) {
    console.error('Doctor login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};

// Add new doctor (Admin function)
const addDoctor = async (req, res) => {
  try {
    const doctorData = req.body;
    
    // Check if doctor with this email already exists
    const existingDoctor = await Doctor.findOne({ email: doctorData.email });
    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: 'Doctor with this email already exists'
      });
    }

    const doctor = new Doctor(doctorData);
    await doctor.save();

    res.status(201).json({
      success: true,
      message: 'Doctor added successfully',
      data: doctor
    });
  } catch (error) {
    console.error('Error adding doctor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add doctor',
      error: error.message
    });
  }
};

module.exports = {
  getAllDoctors,
  getDoctorsBySpecialization,
  getDoctorById,
  getAllSpecializations,
  addDoctor,
  doctorLogin
};