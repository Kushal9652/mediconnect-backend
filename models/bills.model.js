const mongoose = require('mongoose');

const billsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  medicines: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Bill = mongoose.model('Bill', billsSchema);
module.exports = Bill;