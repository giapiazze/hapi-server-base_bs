const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');

const options = {
	info: {
		'title': 'HAPI Server API Documentation',
		'version': '1.0.0',
	}
};

const plugin = {
	register: (server, options, next) => {

		server.register([
				Inert,
				Vision,
				{
					register: HapiSwagger,
					options: options
				}],

			next()
		)},
	options: options
};

plugin.attributes = {
	name: 'hapi-swagger',
	version: '7.7.0',
};


module.export = plugin;
