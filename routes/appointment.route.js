const express = require('express');
const router = express.Router();
const { createAppointment, getUserAppointments, getAppointmentById, getDoctorAppointments } = require('../controller/appointment.controller');
const authMiddleware = require('../middleware/authMiddleware');

const optionalAuth = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token) {
    authMiddleware(req, res, next);
  } else {
    next();
  }
};

router.post('/', optionalAuth, createAppointment);
router.get('/', authMiddleware, getUserAppointments);
router.get('/doctor/:doctorId', getDoctorAppointments);
router.get('/:id', getAppointmentById); 
module.exports = router;
