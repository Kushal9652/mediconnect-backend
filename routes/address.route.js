const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authenticateUser');
const addressController = require('../controller/address.controller');

router.post('/', authenticateUser, addressController.createAddress);
router.get('/', authenticateUser, addressController.getAddresses);
router.delete('/:id', authenticateUser, addressController.deleteAddress);

module.exports = router;
