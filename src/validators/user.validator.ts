import Joi from 'joi';

export const userSignupValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().required(), // passowrd criteria could be set
});

export const userLoginValidator = Joi.object({
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().required(),
});
