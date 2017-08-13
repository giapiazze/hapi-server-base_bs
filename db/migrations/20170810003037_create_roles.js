
exports.up = function(knex, Promise) {
	return knex.schema.createTable('roles', function(tbl) {
		tbl.increments('id').primary();
		tbl.string('name', 64).notNullable();
		tbl.integer('realm_id')
			.unsigned()
			.notNullable()
			.references('realms.id');

		// Timestamp
		tbl.timestamp('created_at').defaultTo(knex.fn.now());
		tbl.timestamp('updated_at').defaultTo(knex.fn.now());
	})
};

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('roles')
};