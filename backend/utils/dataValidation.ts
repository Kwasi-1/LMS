import Joi from "joi";

export const validateCreateAccount = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters long",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
  role: Joi.string().valid("student", "teacher", "parent").required().messages({
    "any.only":
      'Role must be one of the following: ["student", "teacher", "parent"]',
    "string.empty": "Role is required",
  }),
  terms: Joi.boolean().valid(true).required().messages({
    "boolean.base": "Terms must be a boolean value",
    "any.only": "You must agree to the terms and conditions",
  }),
});

export const validateLogin = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});

export const validateCreateNewUser = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters long",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
  role: Joi.string().valid("student", "teacher", "parent").required().messages({
    "any.only":
      'Role must be one of the following: ["student", "teacher", "parent"]',
    "string.empty": "Role is required",
  }),
  status: Joi.string().valid("active", "inactive", "pending").required(),
});
