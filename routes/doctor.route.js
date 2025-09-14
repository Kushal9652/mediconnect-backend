const express = require('express');
const router = express.Router();
const {
  getAllDoctors,
  getDoctorsBySpecialization,
  getDoctorById,
  getAllSpecializations,
  addDoctor,
  doctorLogin
} = require('../controller/doctor.controller');

// Public routes
router.get('/', getAllDoctors);
router.get('/specializations', getAllSpecializations);
router.get('/specialization/:specialization', getDoctorsBySpecialization);
router.get('/:id', getDoctorById);

// Authentication routes
router.post('/login', doctorLogin);

// Admin routes (you can add authentication middleware later)
router.post('/', addDoctor);

module.exports = router;