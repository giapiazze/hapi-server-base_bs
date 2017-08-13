const Bookshelf = require('../bookshelf');

// related models
require('../../models/realm/realm_model');
require('../../models/role/role_model');


const User = Bookshelf.Model.extend({
		tableName: 'users',
		hasTimestamps: true,

		hidden: ['password'],

		// relationships
		roles: function () {
			return this.belongsToMany(Bookshelf._models.Role);
		},
		realms: function () {
			return this.hasMany(Bookshelf._models.Realm).through(Bookshelf._models.Role);
		},

		// roles: function () {
		// 	return this.belongsToMany(Role, 'realms_roles_users', 'userId', 'roleId');
		// },
		// realmRoles: function (realmId) {
		// 	return this.belongsToMany(Role, 'realms_roles_users', 'userId', 'roleId').inRealm(realmId);
		// },

		// scopes
		scopes: {
			onlyActive: function (qb) {
				qb.where({isActive: true});
			},
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
	{
		// model functions MUST end with fetch(), count()...send the query
		filtered_count: function(filters) {
			return this
				.query(function (qb) {
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
				})
				.count();
		},
	},

);


module.exports = Bookshelf.model('User', User);