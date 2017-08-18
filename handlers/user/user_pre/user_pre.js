const Boom = require('boom');
const User = require('../../../models/user/user_model');

const UserValidation = require('../models/user/user_validations');


const UserPre = [
	{
		assign: 'queryParsed',
		method: function (request, reply) {

			let referenceModel = UserValidation;

			let requestData = {
				resourceType: 'users',
				queryData: {
					include: [],
					fields: {},
					sort: [],
					page: {},
					filter: {
						eql: {},
						gt: {},
						gte: {},
						lt: {},
						lte: {},
						like: {},
						not: {},
						nll: {},
						btw: [],
						in: {},
					}
				}
			};

			Object.keys(queryUrl).map((e) => {
				if (referenceModel.filters.hasOwnProperty(e)) {
					if (typeof queryUrl[e] === 'string') {
						queryUrl[e] = '%' + queryUrl[e] + '%'
					}
					let tmp = _.split(e, '.');
					tmp[tmp.length - 1] = _.snakeCase(tmp[tmp.length - 1]);
					response.filters[_.join(tmp, '.')] = queryUrl[e];
					let p = 0;
				}
			});
		}
	},
	{
		assign: 'realm',
		method: function (request, reply) {

			let realmName = request.payload.realm;
			let user = request.pre.user.attributes;

			Realm
				.findOne({name: realmName}, {require: false})
				.then(function(result){
					let realm = result;
					if (!realm) {
						return reply(Boom.unauthorized('Invalid realm'));
					} else {
						return reply(realm);
					}
				});
			// .catch(function (error) {
			// 	let errorMsg = error.message || 'An error occurred';
			// 	return reply(Boom.gatewayTimeout(errorMsg));
			// });
		}
	},
];

module.exports = UserPre;