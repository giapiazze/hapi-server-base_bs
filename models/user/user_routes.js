const UserHandlers = require('./user_handlers');
const UserValidation = require('./user_validations');
const User = require('./user_model');
const Boom = require('boom');

console.log(UserHandlers);

module.exports.register = (server, options, next) => {
	server.route([
		{
			method: 'GET',
			path: '/users',
			config: {
				tags: ['api', 'users'],
				auth: false,
				handler: UserHandlers.userFindAll
			},
		}
	]);

	next()
};

module.exports.register.attributes = {
	name: 'api.users',
	version: '0.0.1',
};