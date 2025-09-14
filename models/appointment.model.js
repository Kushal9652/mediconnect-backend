const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  specialization: {
    type: String,
    required: true,
    trim: true,
  },
  doctor: {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
  },
  healthIssue: {
    type: String,
    required: true,
    trim: true,
  },
  symptoms: {
    type: String,
    trim: true,
    default: '',
  },
  createdBy: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'confirmed',
  },
  type: {
    type: String,
    enum: ['consultation', 'follow-up', 'emergency'],
    default: 'consultation',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Appointment', appointmentSchema); 