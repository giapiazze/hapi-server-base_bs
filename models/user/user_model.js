const Bookshelf = require('../bookshelf');
const Joi = require('joi');

// related models
require('../../models/realm/realm_model');
require('../../models/role/role_model');


const User = Bookshelf.Model.extend({
		tableName: 'users',

		softDelete: true,
		hasTimestamps: true,

		hidden: ['password'],

		// validations
		validate: {
			id: Joi.number().integer().min(1),
			username: Joi.string().min(3).max(64),
			email: Joi.string().email(),
			is_active: Joi.boolean().valid(true, false),
		},

		// relationships
		roles: function () {
			return this.belongsToMany(Bookshelf._models.Role, 'realms_roles_users');
		},
		realms: function () {
			return this.belongsToMany(Bookshelf._models.Realm, 'realms_roles_users')
		},

		// roles: function () {
		// 	return this.belongsToMany(Role, 'realms_roles_users', 'userId', 'roleId');
		// },
		// realmRoles: function (realmId) {
		// 	return this.belongsToMany(Role, 'realms_roles_users', 'userId', 'roleId').inRealm(realmId);
		// },

		// scopes
		scopes: {
			realmRoles: function (qb, realmId) {
				// qb.join('roles_users', 'roles_users.user_id', '=', 'users.id');
				// qb.join('roles', 'roles.id', '=', 'roles_users.role_id');
				// qb.where('roles.realm_id', '=', realmId).debug(true);

			},
			onlyActive: function (qb) {
				qb.where({isActive: true});
			},
			filtered: function (qb, filters) {
				Object.keys(filters).map((e) => {
					let signal = '=';
					if (typeof filters[e] === 'object') {
						signal = 'in';
					} else if (typeof filters[e] === 'string') {
						signal = 'LIKE';
					}
					qb.where(e, signal, filters[e]);
				});
			},
			filtered_ordered: function (qb, filters, sort) {
				Object.keys(filters).map((e) => {
					let signal = '=';
					let pippo = filters[e].length;
					if (typeof filters[e] === 'object') {
						if (filters[e].length) {
							signal = 'in';
						}
					} else if (typeof filters[e] === 'string') {
						signal = 'LIKE';
					}
					qb.where(e, signal, filters[e]);
				});
				sort.forEach(function (el) {
					qb.orderBy(el.column, el.direction);
				});
				qb.debug(true);
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