
exports.up = function(knex, Promise) {
	return knex.schema.createTable('roles_users', function(tbl) {
		tbl.integer('user_id')
			.unsigned()
			.notNullable()
			.references('users.id');
		tbl.integer('role_id')
			.unsigned()
			.notNullable()
			.references('roles.id');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('roles_users');
};
