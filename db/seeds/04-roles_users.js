const RolesUsers = require('./data/04-roles_users_data');


exports.seed = function(knex, Promise) {
	return Promise.join(
		// Deletes ALL existing entries
		knex('roles_users').del(),

		// Inserts seed entries
		knex('roles_users').insert(RolesUsers),
	);
};