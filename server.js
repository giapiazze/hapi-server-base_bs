const Hapi = require('hapi');

const Plugins = require('./plugins');
const Routes = require('./routes');

const Config = require('./config');

const HOST = Config.get('/host');
const PORT = Config.get('/port');



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
	host: HOST,
	port: PORT
});

// load Plugins
server.register(Plugins, (err) => {
	console.log('Plugins');
	if (err) {
		server.log('error', 'Failed to load plugin:' + err);
	}
});

// load Routes
server.register(Routes, (err) => {
	console.log('Routes');
	if (err) {
		server.log('error', 'Failed to register routes: ' + err);
	}
});

// Start the server
server.start((err) => {

	if (err) {
		throw err;
	}
	console.log(server.registrations);
	server.log('info', 'Server running at: ' + server.info.uri);
});


//
// //EXPORT
// module.exports = server;