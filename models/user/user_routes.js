const UserHandlers = require('./user_handlers');
const UserValidations = require('./user_validations');
const Handlers = require('../../handlers/user/user_handlers');

console.log('Handler: ' + UserHandlers);
console.log('Validations: ' + UserValidations);

module.exports.register = (server, options, next) => {

	server.route([
		{
			method: 'GET',
			path: '/users',
			handler: Handlers.userFindAll,
			config: {
				tags: ['api', 'users'],
				description: 'Users List',
				auth: false,
				notes: ['Return the Users list filtered by query (url), paginated and sorted. Default pageSize: 10'],
				validate: {
					query: UserValidations.query
				},
			},
		}
	]);

	next()
};

module.exports.register.attributes = {
	name: 'api.users',
	version: '0.0.1',
};
