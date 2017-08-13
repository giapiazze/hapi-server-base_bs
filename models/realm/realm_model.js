const Bookshelf = require('../bookshelf');

// related models
require('../../models/role/role_model');

const Realm = Bookshelf.Model.extend({
		tableName: 'realms',
		hasTimestamps: true,

		// relationships
		roles: function () {
			return this.hasMany(Bookshelf._models.Role);
		},
	},
	// {
	// 	schema: [
	// 		Fields.StringField('name', {maxLength: 64, required: true}),
	// 		//Relations
	// 		BelongsToMany('User', {table: 'realms_users', foreignKey: 'realmId', otherKey: 'userId'}),
	// 		//Scopes
	// 		Scope('findByName', function(name) {
	// 			this.where('name', name)
	// 		}),
	// 	]
	// },
);

module.exports = Bookshelf.model('Realm', Realm);