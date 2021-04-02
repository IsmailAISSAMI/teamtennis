const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');
const verifyToken = require('../middlewares/verifyToken');
const userRegistrationSchemaValidation = require('../middlewares/validators/users.registration.validator.js');
const userUpdateSchemaValidation = require('../middlewares/validators/users.update.validator.js');

router.post('/users' , userRegistrationSchemaValidation,user.create);
router.post('/users/login', user.login);
// router.get('/users/:id', verifyToken, user.findOne);
// router.post('/users/:id', verifyToken, userUpdateSchemaValidation, user.update);

module.exports = router;