const Joi = require('joi');

const userSchemaValidation = (req, res, next) => {
    // Password: Minimum six characters, at least one uppercase letter, one lowercase letter and one number
    const userValidationSchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email(),
        isAdmin: Joi.boolean(),
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/).required()
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