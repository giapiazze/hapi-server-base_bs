const Bookshelf = require('../bookshelf');

const FilterQR = require('../query/filter_query');
const FieldsQR = require('../query/fields_query');
const SortQR = require('../query/sort_query');
const RelatedQR = require('../query/related_query');
const PaginateQR = require('../query/paginate_query');

// related models
require('../../models/realm/realm_model');
require('../../models/role/role_model');
require('../../models/user/user_model');

const RealmsRolesUsers = Bookshelf.Model.extend({
		tableName: 'realms_roles_users',

		softDelete: true,
		hasTimestamps: true,

		// relationships
		realm: function () {
			return this.belongsTo(Bookshelf._models.Realm)
		},
		role: function () {
			return this.belongsTo(Bookshelf._models.Role)
		},
		user: function () {
			return this.belongsTo('User', 'id');
		},
		// scopes
		scopes: {
			filtered: function (qb, queryData) {
				if (Object.keys(queryData.filter).length) {
					return FilterQR.filter2Query(qb, queryData.filter);
				}
			},
			selected: function (qb, queryData) {
				if (Object.keys(queryData.fields).length) {
					return FieldsQR.fields2Query(qb, queryData.fields);
				}
			},
			sorted: function (qb, queryData) {
				if (queryData.sort.length) {
					return SortQR.sort2Query(qb, queryData.sort);
				}
			},
			related: function (qb, queryData) {
				return RelatedQR.with2Query(this, queryData);
			},
			paginated: function (qb, queryData) {
				return PaginateQR.page2Query(qb, queryData.pagination);
			},
			printQuery: function (qb, request) {
				request.server.log('sql', qb.toString());
			},
		},
	}
);

module.exports = Bookshelf.model('RealmsRolesUsers', RealmsRolesUsers);