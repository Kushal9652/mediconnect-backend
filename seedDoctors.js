const mongoose = require('mongoose');
const Doctor = require('./models/doctor.model');
require('dotenv').config();

const sampleDoctors = [
  {
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@mediconnect.com",
    specialization: "Cardiology",
    experience: 12,
    qualifications: ["MD - Cardiology", "MBBS", "Fellowship in Interventional Cardiology"],
    hospitalAffiliation: "City General Hospital",
    consultationFee: 150,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    availableTimeSlots: [
      { start: "09:00", end: "12:00" },
      { start: "14:00", end: "17:00" }
    ],
    about: "Dr. Sarah Wilson is a renowned cardiologist with over 12 years of experience in treating heart conditions. She specializes in interventional cardiology and has performed over 1000 successful procedures.",
    rating: 4.8,
    totalReviews: 156,
    isActive: true
  },
  {
    name: "Dr. Michael Brown",
    email: "michael.brown@mediconnect.com", 
    specialization: "General Medicine",
    experience: 8,
    qualifications: ["MBBS", "MD - Internal Medicine"],
    hospitalAffiliation: "Downtown Medical Center",
    consultationFee: 100,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    availableTimeSlots: [
      { start: "08:00", end: "12:00" },
      { start: "15:00", end: "18:00" }
    ],
    about: "Dr. Michael Brown is a dedicated general practitioner who provides comprehensive healthcare services. He believes in preventive medicine and patient education.",
    rating: 4.6,
    totalReviews: 89,
    isActive: true
  },
  {
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@mediconnect.com",
    specialization: "Gynecology", 
    experience: 10,
    qualifications: ["MBBS", "MS - Gynecology", "Fellowship in Reproductive Medicine"],
    hospitalAffiliation: "Women's Health Center",
    consultationFee: 120,
    availableDays: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    availableTimeSlots: [
      { start: "10:00", end: "13:00" },
      { start: "16:00", end: "19:00" }
    ],
    about: "Dr. Emily Rodriguez specializes in women's health and reproductive medicine. She provides compassionate care for all stages of a woman's life.",
    rating: 4.9,
    totalReviews: 234,
    isActive: true
  },
  {
    name: "Dr. James Chen",
    email: "james.chen@mediconnect.com",
    specialization: "Pediatrics",
    experience: 15,
    qualifications: ["MBBS", "MD - Pediatrics", "Fellowship in Pediatric Cardiology"],
    hospitalAffiliation: "Children's Hospital",
    consultationFee: 110,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    availableTimeSlots: [
      { start: "09:00", end: "12:30" },
      { start: "14:30", end: "17:30" }
    ],
    about: "Dr. James Chen is a pediatrician with expertise in children's health and development. He has a special interest in pediatric cardiology.",
    rating: 4.7,
    totalReviews: 178,
    isActive: true
  },
  {
    name: "Dr. Lisa Parker",
    email: "lisa.parker@mediconnect.com",
    specialization: "Dermatology",
    experience: 9,
    qualifications: ["MBBS", "MD - Dermatology", "Fellowship in Cosmetic Dermatology"],
    hospitalAffiliation: "Skin Care Institute", 
    consultationFee: 130,
    availableDays: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
    availableTimeSlots: [
      { start: "10:00", end: "13:00" },
      { start: "15:00", end: "18:00" }
    ],
    about: "Dr. Lisa Parker is a dermatologist specializing in both medical and cosmetic dermatology. She helps patients achieve healthy, beautiful skin.",
    rating: 4.5,
    totalReviews: 92,
    isActive: true
  },
  {
    name: "Dr. Robert Kumar",
    email: "robert.kumar@mediconnect.com",
    specialization: "Orthopedics",
    experience: 14,
    qualifications: ["MBBS", "MS - Orthopedics", "Fellowship in Joint Replacement"],
    hospitalAffiliation: "Orthopedic Center of Excellence",
    consultationFee: 140,
    availableDays: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    availableTimeSlots: [
      { start: "08:30", end: "12:00" },
      { start: "14:00", end: "17:30" }
    ],
    about: "Dr. Robert Kumar is an orthopedic surgeon with extensive experience in joint replacement and sports medicine. He has helped thousands of patients regain mobility.",
    rating: 4.8,
    totalReviews: 203,
    isActive: true
  },
  {
    name: "Dr. Amanda Davis",
    email: "amanda.davis@mediconnect.com",
    specialization: "Neurology",
    experience: 11,
    qualifications: ["MBBS", "MD - Neurology", "Fellowship in Epilepsy"],
    hospitalAffiliation: "Neurological Institute",
    consultationFee: 160,
    availableDays: ["Monday", "Tuesday", "Thursday", "Friday"],
    availableTimeSlots: [
      { start: "09:30", end: "12:30" },
      { start: "15:30", end: "18:00" }
    ],
    about: "Dr. Amanda Davis is a neurologist specializing in epilepsy and movement disorders. She provides comprehensive neurological care with a patient-centered approach.",
    rating: 4.6,
    totalReviews: 145,
    isActive: true
  },
  {
    name: "Dr. Thomas Anderson",
    email: "thomas.anderson@mediconnect.com",
    specialization: "Psychiatry",
    experience: 13,
    qualifications: ["MBBS", "MD - Psychiatry", "Fellowship in Child Psychiatry"],
    hospitalAffiliation: "Mental Health Center",
    consultationFee: 125,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    availableTimeSlots: [
      { start: "10:00", end: "13:00" },
      { start: "16:00", end: "19:00" }
    ],
    about: "Dr. Thomas Anderson is a psychiatrist who specializes in treating mental health conditions in both adults and children. He believes in holistic treatment approaches.",
    rating: 4.7,
    totalReviews: 167,
    isActive: true
  }
];

const addSampleDoctors = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing doctors (optional - comment out if you want to keep existing data)
    await Doctor.deleteMany({});
    console.log('Cleared existing doctors');

    // Add sample doctors
    const result = await Doctor.insertMany(sampleDoctors);
    console.log(`Successfully added ${result.length} doctors to the database`);

    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    
  } catch (error) {
    console.error('Error adding sample doctors:', error);
    process.exit(1);
  }
};

// Run the script
addSampleDoctors();