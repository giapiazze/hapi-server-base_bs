const Hapi = require('hapi');
const Dotenv = require('dotenv');

const Plugins = require('./config');
const Routes = require('./routes');

Dotenv.config({ silent: true });

// Create a server with a host and port
const server = new Hapi.Server({
	debug: {
		request: ['error']
	},
	connections: {
		routes: {
			security: true,
			cors: true
		}
	},
});

server.connection({
	host: process.env.HOST,
	port: process.env.PORT
});

// load Plugins
server.register(Plugins, (err) => {
	console.log('Plugins');
	if (err) {
		console.error('Failed to load plugin:', err);
	}
});

// load Routes
server.register(Routes, (err) => {
	console.log('Routes');
	if (err) {
		console.error('Failed to register routes:', err);
	}
});

// Start the server
server.start((err) => {

	if (err) {
		throw err;
	}
	console.log(server.registrations);
	console.log('Server running at:', server.info.uri);
});


//
// //EXPORT
// module.exports = server;