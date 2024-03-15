import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';
import { v4 as uuidv4 } from 'uuid';

const User = sequelize.define('User', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: () => uuidv4(),
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	lastName: {
		type: DataTypes.STRING,
		allowNull: true,
	},

	imageName: {
		type: DataTypes.STRING,
		allowNull: true,
	},

	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

const Token = sequelize.define('Token', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: () => uuidv4(),
	},
	refreshToken: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	userId: {
		type: DataTypes.UUID,
		allowNull: false,
	},
});

User.hasOne(Token, {
	foreignKey: 'userId',
	onDelete: 'CASCADE',
});

Token.belongsTo(User, {
	foreignKey: 'userId',
	onDelete: 'CASCADE',
});

// (async () => {
// 	await sequelize.sync({ force: true });
// 	console.log('All models were synchronized successfully.');
// })();

export { User, Token };
