const Bookshelf = require('../bookshelf');

// related models
require('../../models/user/user_model');

const Realm = Bookshelf.Model.extend({
		tableName: 'realms',

		softDelete: true,
		hasTimestamps: ['createdAt', 'updatedAt'],

		// relationships
		users: function () {
			return this.belongsToMany(Bookshelf.model('User'), 'realms_roles_users', 'realmId', 'userId');
		},
		realmsRolesUsers: function () {
			return this.hasMany(Bookshelf.model('RealmsRolesUsers'), 'realmId');
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