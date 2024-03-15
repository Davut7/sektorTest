import createError from 'http-errors';
import {
	getUsersQuery,
	updateUserValidation,
} from '../helper/userValidation.js';
import userService from '../services/userService.js';

class UserController {
	async getUsers(req, res) {
		const { page = 1, limit = 10, order = 'ASC' } = req.query;
		const { error } = getUsersQuery.validate(req.query, {
			abortEarly: true,
		});
		if (error) throw createError.BadRequest(error.details[0].message);
		const user = await userService.getUsers(page, limit, order);
		res.status(200).json({
			message: 'User retrieved successfully',
			user: user,
		});
	}

	async getOneUser(req, res) {
		const user = await userService.getOneUser(req.params.id);

		res.status(200).json({
			message: `User with id ${req.params.id} retrieved successfully`,
			user: user,
		});
	}

	async updateUser(req, res) {
		const userUpdateData = req.body;
		const { file } = req;
		const { error } = updateUserValidation.validate(req.query, {
			abortEarly: true,
		});
		if (error) throw createError.BadRequest(error.details[0].message);
		const user = await userService.updateUser(
			req.params.id,
			userUpdateData,
			file
		);
		res.status(201).json({
			message: `User with id ${req.params.id} updated successfully`,
			user: user,
		});
	}
}
export default new UserController();
