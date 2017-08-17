const User = require('../../../models/user/user_model');
const Boom = require('boom');
const URL = require('url');


const HandlerBase = require('../../handler_base');
const Mapper = require('jsonapi-mapper');

const UserFindAll =
	{
		userFindAll: function (request, reply) {
			let mapper = new Mapper.Bookshelf(request.server.info.uri);

			let query = HandlerBase.queryParse(request.query, 'user');

			let test = query.filters;

			let paginationOptions = {
				page: parseInt(query.pagination.page) || 1,
				pageSize: parseInt(query.pagination.pageSize) || 10,
				withRelated: query.pagination.withRelated || [],
				columns: query.pagination.columns || [],
			};

			// Calculating records total number
			let totalCount = 0;
			let filteredCount = 0;

			if (query.extra.count) {
				User
					.count()
					.then(function (totCount) {
						if (totCount.isNaN) {
							return reply(Boom.badRequest('Impossible to count'));
						}
						totalCount = totCount;
						User
							.filtered(query.filters)
							.count()
							.then(function (fltCount) {
								if (fltCount.isNaN) {
									return reply(Boom.badRequest('Impossible to count'));
								}
								return reply({
									totalCount: totalCount,
									filteredCount: fltCount
								});
							})
					})
					.catch(function (error) {
						let errorMsg = error.message || 'An error occurred';
						return reply(Boom.gatewayTimeout(errorMsg));
					});
			} else {
				User
					.count()
					.then(function (totCount) {
						if (totCount.isNaN) {
							return reply(Boom.badRequest('Impossible to count'));
						}
						totalCount = totCount;
						User
							.forge()
							.filtered(query.filters)
							.count()
							.then(function (fltCount) {
								if (fltCount.isNaN) {
									return reply(Boom.badRequest('Impossible to count'));
								}
								filteredCount = fltCount;
								User
									.forge()
									.realmRoles(2)
									.filtered_ordered(query.filters, query.sort)
									.fetchPage(paginationOptions)
									.then(function (collection) {
										if (!collection) {
											return reply(Boom.badRequest('No users'));
										}

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
							})
					})
					.catch(function (error) {
						let errorMsg = error.message || 'An error occurred';
						return reply(Boom.gatewayTimeout(errorMsg));
					});
			}
		}
	};

module.exports = UserFindAll;