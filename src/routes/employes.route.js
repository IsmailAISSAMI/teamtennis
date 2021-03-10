const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const employe = require('../controllers/employes.controller');
const employeValidationSchema = require('../middlewares/validators/employes.validator');

router.post('/employes' , employeValidationSchema, employe.create);
router.get('/employes/', employe.getEmployes);
router.get('/employes/:id', employe.getEmploye);
router.patch('/employes/:id', employeValidationSchema, employe.update);

module.exports = router;