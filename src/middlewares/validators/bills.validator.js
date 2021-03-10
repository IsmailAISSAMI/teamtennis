const Joi = require('joi');

const billSchemaValidation = (req, res, next) => {
    const billValidationSchema = Joi.object({
        Reference: Joi.string().required(),
        billDate: Joi.date().required(),
        totalHT: Joi.number().min(0).required(),
        totalTTC: Joi.number().min(0).required(),
        member: Joi.allow(null),
        subscriptions: Joi.allow(null)
    });
    
    const validation = billValidationSchema.validate(req.body);

    if (validation.error) {
        return res.status(400).send({
            error: validation.error
        })
    }

    next();
}

module.exports = billSchemaValidation;