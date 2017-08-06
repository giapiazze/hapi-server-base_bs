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
			{userId: 1, realmId: 1},
			{userId: 1, realmId: 2},
			{userId: 1, realmId: 3},
			{userId: 2, realmId: 1},
			{userId: 2, realmId: 2},
			{userId: 3, realmId: 1},
			{userId: 3, realmId: 3},
		])
	);
};