
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
  	tbl.increments();
	  tbl.string('username', 64).notNullable();
	  tbl.string('password', 128).notNullable();
  	tbl.string('email').notNullable();
	  tbl.boolean('is_active').notNullable().defaultTo(false);

	  // DB Validation
	  tbl.unique(['username']);
	  tbl.unique(['email']);

	  // Timestamp
	  tbl.timestamp('created_at').defaultTo(knex.fn.now());
	  tbl.timestamp('updated_at').defaultTo(knex.fn.now());
	  tbl.timestamp('deleted_at').nullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
