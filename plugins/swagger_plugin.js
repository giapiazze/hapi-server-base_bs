const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');

const options = {
	info: {
		'title': 'HAPI Server API Documentation',
		'version': '1.0.0',
	}
};

const SwaggerPack = [
	Inert,
	Vision,
	{
		register: HapiSwagger,
		options: options
	}];

module.export = SwaggerPack;