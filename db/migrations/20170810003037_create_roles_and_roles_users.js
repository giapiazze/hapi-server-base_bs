
exports.up = function(knex, Promise) {
	return knex.schema.createTable('roles', function(tbl) {
		tbl.increments('id').primary();
		tbl.string('name', 64).notNullable();

		// Timestamp
		tbl.timestamps();
	}).createTable('roles_users', function(tbl) {
		tbl.integer('roleId')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('roles');
		tbl.integer('userId')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('users');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('roles')
		.dropTable('users_roles');
};