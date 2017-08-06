const UserHandlers = require('./user_handlers');
const UserValidations = require('./user_validations');
const User = require('./user_model');
const Boom = require('boom');
const Joi = require('joi');

console.log('Handler: ' + UserHandlers);
console.log('Validations: ' + UserValidations);

module.exports.register = (server, options, next) => {

	server.route([
		{
			method: 'GET',
			path: '/users',
			handler: UserHandlers.userFindAll,
			config: {
				tags: ['api', 'users'],
				description: 'Users List',
				auth: false,
				notes: ['Return the Users list filtered by query (params) paginated. Default pageSize: 10'],
				validate: {
					query: {
						id: Joi.number().integer().min(1).description('the user ID PK increment'),
						email: Joi.string().email().description('the user email'),
						firstname: Joi.string().min(3).max(64),
						lastname: Joi.string().min(3).max(64),
						is_active: Joi.boolean(),
						page: Joi.number().integer().min(1),
						pageSize: Joi.number().integer().min(10),
						count: Joi.boolean().description('the number of records found'),
					}
				}
			},
		}
	]);

	next()
};

module.exports.register.attributes = {
	name: 'api.users',
	version: '0.0.1',
};
