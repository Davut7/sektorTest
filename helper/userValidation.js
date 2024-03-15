import Joi from 'joi';

const updateUserValidation = Joi.object({
	email: Joi.string().email().trim().optional(),
	firstName: Joi.string().min(3).max(40).trim().optional(),
	lastName: Joi.string().min(3).max(40).trim().optional(),
	sex: Joi.string().valid('male', 'female').optional(),
});

const getUsersQuery = Joi.object({
	limit: Joi.number().integer().min(1).max(100).optional(),
	page: Joi.number().integer().min(1).optional(),
	order: Joi.string().valid('ASC', 'DESC').optional(),
});

export { updateUserValidation, getUsersQuery };
