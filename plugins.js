const AuthBasic = require('hapi-auth-basic');
const AuthJWT = require ('hapi-auth-jwt2');

const Good = require('good');
const GoodPack = require('./plugins/good_plugin');
// const Auth = require ('../plugins/auth');

const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');


let swaggerOptions = {
	info: {
		'title': 'Test API Documentation',
		'version': '1.0.0',
	}
};

let goodOptions = {
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
};


const Plugins = [
	// logging
	{ register: GoodPack.register,
		options: GoodPack.options
	},

	// third party auth schemas
	{ register: AuthBasic },
	{ register: AuthJWT },

	// Swagger
	Inert,
	Vision,
	{
		register: HapiSwagger,
		options: swaggerOptions
	},

	// // local auth plugin
	// { register: Auth },
];

module.exports = Plugins;
