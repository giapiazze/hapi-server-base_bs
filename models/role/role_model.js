const Bookshelf = require('../bookshelf');

// related models
require('../../models/realm/realm_model');
require('../../models/user/user_model');

let Role = Bookshelf.Model.extend({
		tableName: 'roles',

		softDelete: true,
		hasTimestamps: true,

		// relationships
		users: function () {
			return this.belongsToMany(Bookshelf._models.User, 'realms_roles_users');
		},

		// scopes
		scopes: {
			filtered: function (qb, filters) {
				Object.keys(filters).map((e) => {
					let signal = '=';
					if (typeof filters[e] === 'object') {
						signal = 'in';
						qb.whereIn(e, filters[e]);
					} else if (typeof filters[e] === 'string') {
						signal = 'LIKE';
					}
					qb.where(e, signal, filters[e]);
				});
			},
			filtered_ordered: function (qb, filters, sort) {
				Object.keys(filters).map((e) => {
					let signal = '=';
					if (typeof filters[e] === 'object') {
						signal = 'in';
						qb.whereIn(e, filters[e]);
					} else if (typeof filters[e] === 'string') {
						signal = 'LIKE';
					}
					qb.where(e, signal, filters[e]);
				});
				sort.forEach(function (el) {
					qb.orderBy(el.column, el.direction);
				})

			}
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