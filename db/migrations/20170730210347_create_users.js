
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
  	tbl.increments();
	  tbl.string('username', 64).notNullable();
	  tbl.string('password', 64).notNullable();
  	tbl.string('email').notNullable();
	  tbl.boolean('is_active').notNullable().defaultTo(false);

	  tbl.timestamps();
	})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
