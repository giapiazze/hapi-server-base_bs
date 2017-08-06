const User = require('../../models/user/user_model');

exports.up = function(knex, Promise) {
	return knex.schema.createTable('realms', function(table) {
		table.increments('id').primary();
		table.string('name', 64).notNullable();
		table.timestamps();
	}).createTable('realms_users', function(table) {
		table.integer('user_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('users');
		table.integer('realm_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('realms');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('realms')
		.dropTable('users_realms');
};
