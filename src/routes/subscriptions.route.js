const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const subscription = require('../controllers/subscriptions.controller');
const subscriptionSchemaValidation = require('../middlewares/validators/subscriptions.validator');

router.post('/subscriptions' , subscriptionSchemaValidation, subscription.create);
router.get('/subscriptions/', subscription.getSubscriptions);
router.get('/subscriptions/:id', subscription.getSubscription);
router.patch('/subscriptions/:id', subscriptionSchemaValidation, subscription.update);
router.delete('/subscriptions/:id', subscription.delete)

module.exports = router;