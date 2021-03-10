const Joi = require('joi');

const employeValidationSchema = (req, res, next) => {
    const employeValidationSchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        age: Joi.number().min(0).max(100).required(),
        address: Joi.string().max(500).required(),
        phoneNumber: Joi.string().max(14).required(),
        employePosition: Joi.string().valid('chairperson', 'secretary', 'club welfare officer','marketing','treasurer','coatch').required(),
        hourPerWeek: Joi.number().min(0).max(40).required(),
        salaryPerHour: Joi.number().min(0).required(),
        description: Joi.string().max(2000)
    });
    
    const validation = employeValidationSchema.validate(req.body);

    if (validation.error) {
        return res.status(400).send({
            error: validation.error
        })
    }

    next();
}

module.exports = employeValidationSchema;