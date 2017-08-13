
exports.up = function(knex, Promise) {
	return knex.schema.createTable('realms', function(tbl) {
		tbl.increments('id').primary();
		tbl.string('name', 64).notNullable();

		// Timestamp
		tbl.timestamp('created_at').defaultTo(knex.fn.now());
		tbl.timestamp('updated_at').defaultTo(knex.fn.now());
	});
};

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('realms')
};
