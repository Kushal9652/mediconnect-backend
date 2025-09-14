const Address = require('../models/address.model');

exports.createAddress = async (req, res) => {
  try {
    const { street, city, state, zip, phone } = req.body;
    const userId = req.user.userId; 
    if (!userId || !street || !city || !state || !zip) {
      return res.status(400).json({ message: 'Street, city, state, and zip are required.' });
    }
    const newAddress = new Address({
      user: userId,
      street,
      city,
      state,
      zip,
      phone
    });
    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const userId = req.user.userId;
    const addresses = await Address.find({ user: userId });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const userId = req.user.userId;
    const address = await Address.findOneAndDelete({ _id: addressId, user: userId });
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};