import { User } from '../models/Model.js';
import tokenService from '../services/tokenService.js';
import createError from 'http-errors';

export default async (req, res, next) => {
	try {
		const authorization = req.headers.authorization;
		if (!authorization) {
			return next(
				createError.Unauthorized('Authorization header is missing')
			);
		}

		const tokenParts = authorization.split(' ');
		if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
			return next(
				createError.Unauthorized('Invalid authorization header')
			);
		}
		const accessToken = tokenParts[1];
		const verifiedUser = tokenService.verifyAccessToken(accessToken);
		if (!verifiedUser) {
			return next(createError.Unauthorized('Invalid access token'));
		}
		req.user = verifiedUser;
		next();
	} catch (error) {
		console.error('Authentication error:', error);
		return next(createError.Unauthorized('Authentication failed'));
	}
};
