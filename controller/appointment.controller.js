const mongoose = require('mongoose');
const Appointment = require('../models/appointment.model');
const User = require('../models/user.model');

exports.createAppointment = async (req, res) => {
  try {
    const { specialization, doctor, healthIssue, symptoms } = req.body;
    
    // For now, make userId optional to allow testing without authentication
    let userId = null;
    let userName = 'Guest User';
    
    if (req.user) {
      userId = req.user.userId;
      const user = await User.findById(userId);
      if (user) {
        userName = user.username;
      }
    }

    const appointment = new Appointment({
      specialization,
      doctor: {
        doctorId: doctor.doctorId,
        doctorName: doctor.doctorName,
        specialization: doctor.specialization,
      },
      healthIssue,
      symptoms: symptoms || '',
      createdBy: {
        userId: userId || new mongoose.Types.ObjectId(),
        userName: userName,
      },
      status: 'confirmed',
      type: 'consultation'
    });

    await appointment.save();
    res.status(201).json({ 
      success: true,
      message: 'Appointment created successfully', 
      data: appointment 
    });
  } catch (error) {
    console.error('Appointment creation error:', error);
    res.status(400).json({ 
      success: false,
      message: 'Failed to create appointment', 
      error: error.message 
    });
  }
};

exports.getUserAppointments = async (req, res) => {
  try {
    const { userId } = req.user;
    const appointments = await Appointment.find({ 'createdBy.userId': userId })
      .populate('createdBy.userId', 'username email')
      .sort({ createdAt: -1 })
      .select('specialization doctor healthIssue symptoms status createdAt createdBy');
    
    // Transform the appointments to include user details
    const appointmentsWithUserDetails = appointments.map(appointment => ({
      ...appointment.toObject(),
      userDetails: {
        username: appointment.createdBy.userId?.username || appointment.createdBy.userName,
        email: appointment.createdBy.userId?.email || 'N/A'
      }
    }));
    
    res.status(200).json({ 
      success: true,
      appointments: appointmentsWithUserDetails
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: 'Failed to fetch appointments', 
      error: error.message 
    });
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    
    if (!appointment) {
      return res.status(404).json({ 
        success: false,
        message: 'Appointment not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      appointmentId: appointment._id,
      specialization: appointment.specialization,
      doctorName: appointment.doctor.doctorName,
      doctorSpecialization: appointment.doctor.specialization,
      healthIssue: appointment.healthIssue,
      symptoms: appointment.symptoms,
      status: appointment.status,
      createdAt: appointment.createdAt
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: 'Failed to fetch appointment', 
      error: error.message 
    });
  }
};

exports.getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;
    
    const appointments = await Appointment.find({ 'doctor.doctorId': doctorId })
      .populate('createdBy.userId', 'username email')
      .sort({ createdAt: -1 })
      .select('specialization doctor healthIssue symptoms status createdAt createdBy');
    
    // Transform the appointments to include user details
    const appointmentsWithUserDetails = appointments.map(appointment => ({
      ...appointment.toObject(),
      userDetails: {
        username: appointment.createdBy.userId?.username || appointment.createdBy.userName,
        email: appointment.createdBy.userId?.email || 'N/A'
      }
    }));
    
    res.status(200).json({ 
      success: true,
      appointments: appointmentsWithUserDetails
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: 'Failed to fetch doctor appointments', 
      error: error.message 
    });
  }
};