import Joi from 'joi';

export const createArticleValidator = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().allow(null, '').optional(),
    imageUrl: Joi.string().allow(null, '').optional(),
});
