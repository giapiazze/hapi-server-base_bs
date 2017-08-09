
exports.up = function(knex, Promise) {
	return knex.schema.createTable('realms', function(tbl) {
		tbl.increments('id').primary();
		tbl.string('name', 64).notNullable();

		// Timestamp
		tbl.timestamps();
	}).createTable('realms_users', function(tbl) {
		tbl.integer('realmId')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('realms');
		tbl.integer('userId')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('users');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('realms')
		.dropTable('users_realms');
};
