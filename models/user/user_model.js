const Bookshelf = require('../bookshelf');
const UserSchema = require('./user_schema');
const QueryBase = require('../query/query_base');
const FilterQR = require('../query/filter_query');
const FieldsQR = require('../query/fields_query');
const SortQR = require('../query/sort_query');
const RelatedQR = require('../query/related_query');
const PaginateQR = require('../query/paginate_query');
const Pluralize = require('pluralize');

const _ = require('lodash');

// related models
require('../../models/realm/realm_model');
require('../../models/role/role_model');
require('../realms_roles_users/realms_roles_users_model');


const User = Bookshelf.Model.extend({
		tableName: 'users',

		softDelete: true,
		hasTimestamps: ['createdAt', 'updatedAt'],

		hidden: ['password'],

		// validations
		validate: UserSchema.schemaModel,

		// relationships
		roles: function () {
			return this.belongsToMany(Bookshelf.model('Role'), 'realms_roles_users', 'userId', 'roleId')
				.withPivot(['realmId'])
		},
		realms: function () {
			return this.belongsToMany(Bookshelf.model('Realm'), 'realms_roles_users', 'userId', 'realmId')
				.withPivot(['roleId']);
		},
		realmsRolesUsers: function () {
			return this.hasMany(Bookshelf.model('RealmsRolesUsers'), 'userId');
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
			// filtered: function (qb, filters) {
			// 	Object.keys(filters).map((e) => {
			// 		let signal = '=';
			// 		if (typeof filters[e] === 'object') {
			// 			signal = 'in';
			// 		} else if (typeof filters[e] === 'string') {
			// 			signal = 'LIKE';
			// 		}
			// 		qb.where(e, signal, filters[e]);
			// 	});
			// },
			filtered: function(qb, queryData) {
				if (Object.keys(queryData.filter).length) {
					return FilterQR.filter2Query(qb, queryData.filter);
				}
			},
			selected: function(qb, queryData) {
				if (Object.keys(queryData.fields).length) {
					return FieldsQR.fields2Query(qb, queryData.fields);
				}
			},
			sorted: function(qb, queryData) {
				if (queryData.sort.length) {
					return SortQR.sort2Query(qb, queryData.sort);
				}
			},
			related: function(qb, queryData) {
				let related = [];

				// return RelatedQR.with2Query(this, queryData);
			},
			paginated: function(qb, queryData) {
				return PaginateQR.page2Query(qb, queryData.pagination);
			},
			printQuery: function(qb, request) {
				qb.debug(true);
				request.server.log('sql', qb.toString());
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
		},
		withRelated: function(queryData) {
			let related = [];
			let bsModel = Bookshelf._models['RealmsRolesUsers'];

			_.mapValues(queryData.withRelated, function(value) {
				if (_.has(queryData.withFields, value) || _.has(queryData.relatedQuery, value)) {
					let bsModelName = Pluralize.singular(_.upperFirst(value));
					let bsPivotName = _.upperFirst(value);
					let bsModel = Bookshelf._models[bsPivotName] || Bookshelf._models[bsModelName];

					let relation = value;
					let relationObject = {[value]: function(qb) {
						let fields = queryData.withFields[value];
						let filters = queryData.withFilter[value];

						if (fields) {
							qb = FieldsQR.withFields2Query(qb, fields);
						}
						if (filters) {
						qb = FilterQR.filter2Query(qb, filters);
						}

					}
					};

					related.push(relation, relationObject);
				} else {
					let relation = value;
					related.push(relation);
				}

			});
			return related;
		},
	},

);


module.exports = Bookshelf.model('User', User);