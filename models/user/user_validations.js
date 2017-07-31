const Joi = require('joi');

const UserValidation = {
	email: Joi.string().email().required(),
	password: Joi.string().regex(/[a-zA-Z0-9@-_]{3,30}/).required(),
	firstName: Joi.string().min(3).max(64).required(),
	lastName: Joi.string().min(3).max(64).required(),
	isActive: Joi.boolean()
};

module.export = UserValidation;