const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const addressController = require('../controller/address.controller');

router.post('/', authMiddleware, addressController.createAddress);
router.get('/', authMiddleware, addressController.getAddresses);
router.delete('/:id', authMiddleware, addressController.deleteAddress);

module.exports = router;
