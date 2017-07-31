const User = require('./user_model');
const Boom = require('boom');

const UserHandlers =
      {
	      userFindAll: function (request, reply) {

          const ip = request.info.remoteAddress;
          const options = {
          	page: parseInt(request.query.page) || 1,
	          pageSize: parseInt(request.query.pageSize) || 10
          };
          delete request.query.page;
		      delete request.query.pageSize;
          const query = request.query;

		      let str = JSON.stringify(query);
		      console.log('Query: ' + str);
		      console.log('Options: ' + JSON.stringify(options));

          User.where(query)
	          .fetchPage(options)
            .then(function (collection) {
              if (!collection) {
                return reply(Boom.badRequest('Nessun Utente!'));
              }
	            let response = JSON.stringify(collection);
	            console.log(response);
              return reply(collection);
            })
            .catch(function (error) {
              return reply(Boom.gatewayTimeout('An error occurred.'));
            });
        }
      };
      
module.exports = UserHandlers;