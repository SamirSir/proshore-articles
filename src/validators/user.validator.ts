import Joi from 'joi';

export const UserSignupValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().required(), // passowrd criteria could be set
});

export const UserLoginValidator = Joi.object({
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().required(),
});
