const Bookshelf = require('../bookshelf');

// related models
require('../../models/realm/realm_model');
require('../../models/user/user_model');

let Role = Bookshelf.Model.extend({
		tableName: 'roles',
		hasTimestamps: true,

		// relationships
		realm: function () {
			return this.belongsTo(Bookshelf._models.Realm);
		},
		users: function () {
			return this.belongsToMany(Bookshelf._models.User);
		},

	},
	// {
	// 	scopes: {
	// 		inRealm: function (qb, realmId) {
	// 			qb.where({realmId: realmId});
	// 		},
	// 	},
	// },
);

module.exports = Bookshelf.model('Role', Role);