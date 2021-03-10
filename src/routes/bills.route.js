const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const bill = require('../controllers/bills.controller');
const billSchemaValidation = require('../middlewares/validators/bills.validator');

router.post('/bills' , billSchemaValidation, bill.create);
router.get('/bills/', bill.getBills);
router.get('/bills/:id', bill.getBill);
router.patch('/bills/:id', billSchemaValidation, bill.update);

module.exports = router;