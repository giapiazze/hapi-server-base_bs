const User = require('./user_model');
const Boom = require('boom');

const UserHandlers =
      {
	      userFindAll: function (request, reply) {

          const ip = request.info.remoteAddress;
          const params = request.params;
          const options = {};

          console.log('Parametri: '+params);

          User.findAll(params, options)
            .then(function (collection) {
              if (!collection) {
                return reply(Boom.badRequest('Nessun Utente!'));
              }
              let response = JSON.stringify(collection);
              return reply(response);
            })
            .catch(function (error) {
              console.log(error);
              return reply(Boom.gatewayTimeout('An error occurred.'));
            });
        }
      };
      
module.exports = UserHandlers;