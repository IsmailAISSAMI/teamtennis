const express = require('express');
const router = express.Router();

const usersRouter = require('./users.route');
const subscriptionsRouter = require('./subscriptions.route');
const billsRouter = require('./bills.route');
const employesRouter = require('./employes.route');

router.use(usersRouter);
router.use(subscriptionsRouter);
router.use(billsRouter);
router.use(employesRouter);

module.exports = router;