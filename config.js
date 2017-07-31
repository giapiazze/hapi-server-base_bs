const AuthBasic = require('hapi-auth-basic');
const AuthJWT = require ('hapi-auth-jwt2');

const Good = require('good');
// const Auth = require ('../plugins/auth');
// const Users = require('../plugins/api/users');

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
		}},

	// third party auth schemas
	{ register: AuthBasic },
	{ register: AuthJWT },

	// // local auth plugin
	// { register: Auth },
	//
	// // api plugins
	// { register: Users }
];

module.exports = Plugins;