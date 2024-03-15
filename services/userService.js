import createError from 'http-errors';
import { User } from '../models/Model.js';

class UserService {
	async updateUser(userId, userUpdateData, file) {
		const user = await this.getOneUser(userId);

		user.update({
			...userUpdateData,
			imageName: file.filename,
		});
		return user;
	}

	async getOneUser(userId) {
		const user = await User.findOne({ where: { id: userId } });

		if (!user)
			throw new createError.Notfound(`User with id ${userId} not found`);
		return user;
	}

	async getUsers(page, limit, order) {
		const { count, rows } = await User.findAndCountAll({
			limit: Number(limit),
			offset: Number((page - 1) * limit),
			order: [['createdAt', order]],
		});
		return {
			user: rows,
			userCount: count,
		};
	}

	
}

export default new UserService();
