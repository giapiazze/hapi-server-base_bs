const Boom = require('boom');
const _ = require('lodash');

const UserValidation = require('../../../models/user/user_validations');
const UserSchema = require('../../../models/user/user_schema');
const PreHandlerBase = require('../../pre_handler_base');



const UserPre = [
	{
		assign: 'requestData',
		method: function (request, reply) {

			let referenceModel = UserValidation;

			let requestData = {
				resourceType: 'users',
				queryData: {
					fields: {},
					filter: {},
					sort: [],
					pagination: {},
					count: {},
					withRelated: [],
					withFields: {},
					relatedQuery: {},
					withFilter: {},
					withSort: {},
					withCount: [],
					countQuery: {},
					innerFields: {},
					error: {},
				}
			};

			let queryUrl = request.query;
			let error = requestData.queryData.error;

			Object.keys(queryUrl).map((e) => {
				if (!Object.keys(error).length > 0) {
					// Filters
					if (referenceModel.filters.hasOwnProperty(e)) {
						if (_.isString(queryUrl[e])) {
							let tmp = [];
							tmp.push(queryUrl[e]);
							queryUrl[e] = tmp;
						}
						requestData = PreHandlerBase.filterParser(requestData, e, queryUrl[e], UserSchema);
					}
				}

				if (!Object.keys(error).length > 0) {
					// SORT
					if (referenceModel.sort.hasOwnProperty(e)) {
						if (_.isString(queryUrl[e])) {
							let tmp = [];
							tmp.push(queryUrl[e]);
							queryUrl[e] = tmp;
						}
						requestData = PreHandlerBase.sortParser(requestData, queryUrl[e], UserSchema);
					}
				}

				if (!Object.keys(error).length > 0) {
					// Extra
					if (referenceModel.extra.hasOwnProperty(e)) {
						if (e === 'count') {
							requestData.queryData.count = queryUrl[e];
						} else if (_.isString(queryUrl[e])) {
							let tmp = [];
							tmp.push(queryUrl[e]);
							queryUrl[e] = tmp;
							requestData = PreHandlerBase.extraParser(requestData, e, queryUrl[e], UserSchema);
						} else {
							requestData = PreHandlerBase.extraParser(requestData, e, queryUrl[e], UserSchema);
						}
					}
				}
			});

			if (Object.keys(error).length > 0) {
				return reply(Boom.badRequest(requestData.queryData.error.message));
			} else {
				// Pagination
				let page = parseInt(queryUrl['page']) || 1;
				let pageSize = parseInt(queryUrl['pageSize']) || 10;
				requestData.queryData.pagination['offset'] = pageSize * (page - 1);
				requestData.queryData.pagination['limit'] = pageSize;
				requestData.queryData.pagination['pageSize'] = pageSize;
				requestData.queryData.pagination['page'] = page;
				request.server.log('info', 'RequestData: ' + JSON.stringify(requestData));
				return reply(requestData);
			}
		}
	},
];


module.exports = UserPre;