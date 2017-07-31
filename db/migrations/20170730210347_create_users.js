
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
  	tbl.increments();
  	tbl.string('email').notNullable().defaultTo('');
  	tbl.string('password').notNullable();
  	tbl.string('firstName',64).notNullable().defaultTo('');
	  tbl.string('lastName',64).notNullable().defaultTo('');
	  tbl.boolean('isActive').notNullable().defaultTo(false);
	})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
