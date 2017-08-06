const User = require('../../../models/user/user_model');
const Boom = require('boom');

const HandlerBase = require('../../handler_base');
const Mapper = require('jsonapi-mapper');

const UserFindAll =
	{
		userFindAll: function (request, reply) {
			let mapper = new Mapper.Bookshelf(request.server.info.uri);

			let uri = request.server.info.uri;
			console.log('URI: ' + uri);

			let query = HandlerBase.queryParse(request.query, 'user');

			let paginationOptions = {
				page: parseInt(query.pagination.page) || 1,
				pageSize: parseInt(query.pagination.pageSize) || 10,
				withRelated: query.pagination.withRelated || [],
				columns: query.pagination.columns || [],
			};

			if (query.extra.count) {
				User
					.query(function (qb) {
						Object.keys(query.filters).map((e) => {
							let signal = '=';
							if (typeof query.filters[e] === 'object') {
								signal = 'in';
								qb.whereIn(e, query.filters[e]);
							} else if (typeof query.filters[e] === 'string') {
								signal = 'LIKE';
							}
							qb.where(e, signal, query.filters[e]);
						})
					})
					.count()
					.then(function (count) {
						if (count.isNaN) {
							return reply(Boom.badRequest('Impossible to count'));
						}
						return reply({count: count});
					})
					.catch(function (error) {
						let errorMsg = error.message || 'An error occurred';
						return reply(Boom.gatewayTimeout(errorMsg));
					});
			} else {
				// Calculating records total number
				let totalCount = 'Da fare!';
				let filteredCount = 'Da fare!';

				User
					.query(function (qb) {
						Object.keys(query.filters).map((e) => {
							let signal = '=';
							if (typeof query.filters[e] === 'object') {
								signal = 'in';
								qb.whereIn(e, query.filters[e]);
							} else if (typeof query.filters[e] === 'string') {
								signal = 'LIKE';
							}
							qb.where(e, signal, query.filters[e]);
						})
					})
					.query(function (qb) {
						query.sort.forEach(function (el) {
							qb.orderBy(el.column, el.direction);
						})
					})
					.fetchPage(paginationOptions)
					.then(function (collection) {
						if (!collection) {
							return reply(Boom.badRequest('No users'));
						}

						console.log(collection.pagination);
						const mapperOptions = {
							meta: {
								totalCount: totalCount,
								filteredCount: filteredCount,
								page: collection.pagination.page,
								pageCount: collection.pagination.pageCount,
								pageSize: collection.pagination.pageSize,
								rowCount: collection.pagination.rowCount,
							},
						};
						let collMap = mapper.map(collection, 'user', mapperOptions);
						return reply(collMap);
					})
					.catch(function (error) {
						let errorMsg = error.message || 'An error occurred';
						return reply(Boom.gatewayTimeout(errorMsg));
					})

			}
		}
	};

module.exports = UserFindAll;