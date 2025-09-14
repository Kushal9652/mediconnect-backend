const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./utils/db');
// Force deployment update - case sensitivity fix applied
const userRoutes = require('./routes/user.route');
const addressRoutes = require('./routes/address.route');
const billsRoutes = require('./routes/bills.route');
const appointmentRoutes = require('./routes/appointment.route');
const doctorRoutes = require('./routes/doctor.route');
const paymentRoutes = require('./routes/payment.route');


dotenv.config();

const app = express();
//middlewares
app.use(cors());
app.use(express.json());


const port = process.env.PORT || 3000;

// Root route for health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'MediConnect Backend API is running successfully!',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.use('/api/auth', userRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/bills', billsRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/payments', paymentRoutes);

connectDB(process.env.MONGODB_URI)
  .then(() => console.log('mongodb connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Global error handler for JSON parse errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'error!' });
  }
  next(err);
});