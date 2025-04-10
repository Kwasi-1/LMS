import Joi from "joi";

export const validateLogin = Joi.object({
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
  id: Joi.string().optional,
});

export const validateUserType = (role: string) => {
  let validation;
  switch (role) {
    case "student":
      validation = Joi.object({
        name: Joi.string().required(),
        password: Joi.string().required(),
        id: Joi.string().required(),
        role: Joi.string().valid("student").required(),
        userClass: Joi.string().required(),
        status: Joi.string().valid("active", "blocked", "pending").required(),
        gender: Joi.string().required().valid("male", "female"),
      });
      break;

    case "admin":
      validation = Joi.object({
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
        role: Joi.string().valid("admin").required(),
        status: Joi.string().valid("active", "blocked", "pending").required(),
        gender: Joi.string().valid("male", "female"),
      });
      break;

    case "teacher":
      validation = Joi.object({
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
        classes: Joi.array().required(),
        role: Joi.string().valid("teacher").required(),
        status: Joi.string().valid("active", "blocked", "pending").required(),
        gender: Joi.string().valid("male", "female"),
      });
      break;

    case "parent":
      validation = Joi.object({
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
        role: Joi.string().valid("parent").required(),
        status: Joi.string().valid("active", "blocked", "pending").required(),
        gender: Joi.string().valid("male", "female"),
        children: Joi.array().required(),
      });
      break;

    default:
      validation = Joi.object({
        role: Joi.string().required(),
      });
  }

  return validation;
};
