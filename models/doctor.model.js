const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  specialization: {
    type: String,
    required: true,
    enum: [
      'General Medicine',
      'Cardiology',
      'Dermatology', 
      'Gynecology',
      'Pediatrics',
      'Orthopedics',
      'Neurology',
      'Psychiatry',
      'Ophthalmology',
      'ENT',
      'Oncology',
      'Endocrinology',
      'Gastroenterology',
      'Pulmonology',
      'Nephrology',
      'Urology',
      'Dentistry'
    ],
  },
  experience: {
    type: Number,
    required: true,
    min: 0,
  },
  qualifications: [{
    type: String,
    required: true,
  }],
  hospitalAffiliation: {
    type: String,
    required: true,
  },
  consultationFee: {
    type: Number,
    required: true,
    min: 0,
  },
  availableDays: [{
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  }],
  availableTimeSlots: [{
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String, 
      required: true,
    }
  }],
  profileImage: {
    type: String,
    default: '',
  },
  about: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Update the updatedAt field before saving
doctorSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;