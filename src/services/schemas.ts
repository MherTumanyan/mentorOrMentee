import Joi from 'joi';

export const registrationSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  type: Joi.string().valid('mentor', 'mentee').required(),
  position: Joi.string(),
  field: Joi.string().valid('Developer', 'DevOps', 'QA').required(),
  shortDescription: Joi.string(),
  education: Joi.string(),
  experience: Joi.string(),
  about: Joi.string(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const listUsersArgsSchema = Joi.object({
  email: Joi.string().email(),
  name: Joi.string(),
  surname: Joi.string(),
  userType: Joi.string().valid('mentor', 'mentee'),
  registrationDateFrom: Joi.date().iso(),
  registrationDateTo: Joi.date().iso(),
});
