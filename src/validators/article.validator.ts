import Joi from 'joi';

import { validFileMimeType } from '../config';

const fileSchema = Joi.object({
  path: Joi.string().allow('', null).required(),
  size: Joi.number()
    .min(0)
    .max(5 * 1024 * 1024)
    .required(), // 5 MB
  encoding: Joi.string().required(),
  filename: Joi.string().required(),
  mimetype: Joi.string()
    .valid(...validFileMimeType)
    .required(),
  fieldname: Joi.string().allow('', null).optional(),
  destination: Joi.string().allow('', null).optional(),
  originalname: Joi.string().required(),
});

export const createArticleValidator = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().allow(null, '').optional(),
  file: fileSchema.required(),
});

export const updateArticleValidator = Joi.object({
  title: Joi.string().allow(null).optional(),
  content: Joi.string().allow(null, '').optional(),
  file: fileSchema.allow(null).optional(),
});
