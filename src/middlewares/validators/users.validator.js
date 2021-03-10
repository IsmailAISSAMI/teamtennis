const Joi = require('joi');

const userSchemaValidation = (req, res, next) => {

    const userValidationSchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email(),
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required()
    });
    
    const validation = userValidationSchema.validate(req.body);

    if (validation.error) {
        return res.status(400).send({
            error: validation.error
        })
    }

    next();

}


module.exports = userSchemaValidation;