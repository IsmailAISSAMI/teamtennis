const express = require('express');
const router = express.Router();

const usersRouter = require('./users.route');
const subscriptionsRouter = require('./subscriptions.route');

router.use(usersRouter);
router.use(subscriptionsRouter);


module.exports = router;