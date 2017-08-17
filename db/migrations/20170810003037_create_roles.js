
exports.up = function(knex, Promise) {
	return knex.schema.createTable('roles', function(tbl) {
		tbl.increments('id').primary();
		tbl.string('name', 64).notNullable();
		tbl.string('description').nullable();

		// DB Validation
		tbl.unique(['name']);

		// Timestamp
		tbl.timestamp('created_at').defaultTo(knex.fn.now());
		tbl.timestamp('updated_at').defaultTo(knex.fn.now());
		tbl.timestamp('deleted_at').nullable();
	})
};

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('roles')
};