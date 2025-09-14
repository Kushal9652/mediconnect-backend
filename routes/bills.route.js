const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const billsController = require('../controller/bills.controller');

router.post('/', authMiddleware, billsController.createBill);
router.get('/', authMiddleware, billsController.getBills);
router.delete('/:id', authMiddleware, billsController.deleteBill);

module.exports = router;
