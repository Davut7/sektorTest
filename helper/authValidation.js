import Joi from 'joi';

const authRegistrationValidation = Joi.object({
	email: Joi.string().email().trim().required(),
	firstName: Joi.string().min(3).max(40).trim().required(),
	lastName: Joi.string().min(3).max(40).trim().required(),
	password: Joi.string().min(8).max(30).trim().required(),
	sex: Joi.string().valid('male', 'female').trim().required(),
});

const authLoginValidation = Joi.object({
	email: Joi.string().email().trim().required(),
	password: Joi.string().min(8).max(30).trim().required(),
});

export { authRegistrationValidation, authLoginValidation };
