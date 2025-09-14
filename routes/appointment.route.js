const express = require('express');
const router = express.Router();
const { createAppointment, getUserAppointments, getAppointmentById, getDoctorAppointments } = require('../controller/appointment.controller');
const authenticateUser = require('../middleware/authenticateUser');

// Optional authentication middleware for createAppointment
const optionalAuth = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token) {
    authenticateUser(req, res, next);
  } else {
    next();
  }
};

router.post('/', optionalAuth, createAppointment);
router.get('/', authenticateUser, getUserAppointments);
router.get('/doctor/:doctorId', getDoctorAppointments); // Get appointments for a specific doctor
router.get('/:id', getAppointmentById); // Public route to get appointment details for video call

module.exports = router;
