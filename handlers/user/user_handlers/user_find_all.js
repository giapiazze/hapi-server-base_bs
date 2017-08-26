const User = require('../../../models/user/user_model');
const Boom = require('boom');
const URL = require('url');

const Mapper = require('jsonapi-mapper');

const UserFindAll =
	{
		userFindAll: function (request, reply) {
			let mapper = new Mapper.Bookshelf(request.server.info.uri);
			let requestData = request.pre.requestData;

			// Calculating records total number
			let totalCount = 0;
			let filteredCount = 0;

			if (requestData.queryData.count && requestData.queryData.count === true) {
				User
					.count()
					.then(function (totCount) {
						if (totCount.isNaN) {
							return reply(Boom.badRequest('Impossible to count'));
						}
						totalCount = totCount;
						User
							.filtered(requestData.queryData)
							// .sorted(requestData.queryData)
							// .related(requestData.queryData)
							.printQuery(request)
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
							.filtered(requestData.queryData)
							.count()
							.then(function (fltCount) {
								if (fltCount.isNaN) {
									return reply(Boom.badRequest('Impossible to count'));
								}
								filteredCount = fltCount;
								User
									.filtered(requestData.queryData)
									.selected(requestData.queryData)
									.sorted(requestData.queryData)
									.related(requestData.queryData)
									.paginated(requestData.queryData)
									.printQuery(request)
									.fetchAll({withRelated: User.withRelated(requestData.queryData)})
									.then(function (collection) {
										if (!collection) {
											return reply(Boom.badRequest('No users'));
										}

										const mapperOptions = {
											meta: {
												totalCount: totalCount,
												filteredCount: filteredCount,
												page: requestData.queryData.pagination.page,
												pageCount: Math.floor(totalCount/requestData.queryData.pagination.pageSize) + 1,
												pageSize: requestData.queryData.pagination.pageSize,
												rowCount: collection.length,
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