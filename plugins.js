const AuthBasic = require('hapi-auth-basic');
const AuthJWT = require ('hapi-auth-jwt2');

const GoodPack = require('./plugins/good_plugin');
// const Auth = require ('../plugins/auth');
const SwaggerPack = require('./plugins/swagger_plugin');


const Plugins = [
	// logging
	GoodPack,

	// third party auth schemas
	{ register: AuthBasic },
	{ register: AuthJWT },

	// Swagger
	SwaggerPack.inert,
	SwaggerPack.vision,
	SwaggerPack.swagger,

	// // local auth plugin
	// { register: Auth },
];

module.exports = Plugins;
