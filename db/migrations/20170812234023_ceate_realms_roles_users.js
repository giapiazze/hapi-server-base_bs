
exports.up = function(knex, Promise) {
	return knex.schema.createTable('realms_roles_users', function(tbl) {
		tbl.increments('id').primary();

		// Foreign Keys
		tbl.integer('realm_id')
			.unsigned()
			.notNullable()
			.references('realms.id');
		tbl.integer('role_id')
			.unsigned()
			.notNullable()
			.references('roles.id');
		tbl.integer('user_id')
			.unsigned()
			.notNullable()
			.references('users.id');

		// DB Validation
		tbl.unique(['realm_id', 'role_id', 'user_id']);

		// Timestamp
		tbl.timestamp('created_at').defaultTo(knex.fn.now());
		tbl.timestamp('updated_at').defaultTo(knex.fn.now());
		tbl.timestamp('deleted_at').nullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('realms_roles_users');
};

// La tabella di JOIN tripla per realizzare la N-N-N così strutturata dovrebbe
// sia essere una tabella pivot "normale" di quelle che ci sono ma non si maneggiano
// sia una tabella maneggiabile da modello di Bookshelf in maniera tale da poter
// utilizzare la funzione "through" di Bookshelf. La doppia modalità di utilizzo
// perché ancora non so bene come aggiornare il suo contenuto...peggio la cancellazione!!!