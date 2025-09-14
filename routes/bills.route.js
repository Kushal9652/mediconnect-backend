const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authenticateUser');
const billsController = require('../controller/bills.controller');

router.post('/', authenticateUser, billsController.createBill);
router.get('/', authenticateUser, billsController.getBills);
router.delete('/:id', authenticateUser, billsController.deleteBill);

module.exports = router;
