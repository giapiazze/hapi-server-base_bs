const Users = require('./data/01-user_data');
const Realms = require('./data/01-realm_data');

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('users').del()
		.then(function () {
			// Inserts seed entries
			return knex('users').insert(Users);
		});
};

exports.seed = function(knex, Promise) {
	return Promise.join(
		// Deletes ALL existing entries
		knex('users').del(),
		knex('realms').del(),
		knex('realms_users').del(),

		// Inserts seed entries
		knex('users').insert(Users),
		knex('realms').insert(Realms),
		knex('realms_users').insert([
			{user_id: 1, realm_id: 1},
			{user_id: 1, realm_id: 2},
			{user_id: 1, realm_id: 3},
			{user_id: 2, realm_id: 1},
			{user_id: 2, realm_id: 2},
			{user_id: 3, realm_id: 1},
			{user_id: 3, realm_id: 3},
		])
	);
};