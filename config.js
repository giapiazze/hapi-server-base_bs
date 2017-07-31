const AuthBasic = require('hapi-auth-basic');
const AuthJWT = require ('hapi-auth-jwt2');

const Good = require('good');
// const Auth = require ('../plugins/auth');

const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');

const options = {
	info: {
		'title': 'Test API Documentation',
		'version': '1.0.0',
	}
};


const Plugins = [
	// logging
	{ register: Good,
		options: {
			reporters: {
				console: [{
					module: 'good-squeeze',
					name: 'Squeeze',
					args: [{
						response: '*',
						log: '*'
					}]
				}, {
					module: 'good-console'
				}, 'stdout']
			}
		}
	},

	// third party auth schemas
	{ register: AuthBasic },
	{ register: AuthJWT },

	// Swagger
	Inert,
	Vision,
	{
		register: HapiSwagger,
		options: options
	},

	// // local auth plugin
	// { register: Auth },
];

module.exports = Plugins;
