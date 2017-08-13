const HeaderValidation = require('../../models/headerValidation');
const UserValidations = require('../../models/user/user_validations');
const UserHandlers = require('./user_handlers');


module.exports.register = (server, options, next) => {

	server.route([
		{
			method: 'GET',
			path: '/users',
			config: {
				handler: UserHandlers.userFindAll,
				auth: {
					scope: ['WA_SuperAdmin','WA_Admin']
				},
				tags: ['api', 'Users'],
				description: 'Users List',
				notes: ['Returns Users list filtered by query (url), paginated and sorted. Default pageSize: 10'],
				validate: {
					query: UserValidations.query,
					headers: HeaderValidation.header,
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
