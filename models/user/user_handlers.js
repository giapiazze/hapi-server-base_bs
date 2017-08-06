const User = require('./user_model');
const Boom = require('boom');

const Bookshelf = require('../bookshelf');
const Mapper = require('jsonapi-mapper');

const UserHandlers =
	{
		userFindAll: function (request, reply) {
			let mapper = new Mapper.Bookshelf(request.server.info.uri);

			let uri = request.server.info.uri;
			console.log('URI: ' + uri);

			let options = {
				page: parseInt(request.query.page) || 1,
				pageSize: parseInt(request.query.pageSize) || 10,
				withRelated: ['realms'],
			};
			let count = Boolean(request.query.count) || false;

			console.log(request.toString());
			console.log('Reply: ' + reply);

			let user = User.model;

			console.log(user);

			let optionsFetch = request.query;
			delete optionsFetch.page;
			delete optionsFetch.pageSize;
			options.fetchOptions = optionsFetch;

			console.log('Query: ' + JSON.stringify(optionsFetch));
			console.log('Options: ' + JSON.stringify(options));

			if (count === true) {
				User
					.count('id')
					.then(function (count) {
						if (!count) {
							return reply(Boom.badRequest('Impossible to count'));
						}
						return reply({count: count});
					})
					.catch(function (error) {
						return reply(Boom.gatewayTimeout('An error occurred.'));
					});
			} else {
				User.collection()
					.fetchPage(options)
					.then(function (collection) {
						if (!collection) {
							return reply(Boom.badRequest('Nessun Utente!'));
						}
						console.log(collection.pagination);
						return reply(mapper.map(collection, 'user',
							{ pagination:
								{ offset: collection.pagination.page,
									limit: collection.pagination.pageSize}
							}));
						//{users: collection, pagination: collection.pagination});
					})
					.catch(function (error) {
						return reply(Boom.gatewayTimeout('An error occurred.'));
					});
			}
		}
	};

module.exports = UserHandlers;