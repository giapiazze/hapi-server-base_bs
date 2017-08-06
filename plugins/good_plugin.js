const Good = require('good');

const Options = {
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

const GoodPack = {
	register: Good,
	options: Options
};

module.export = GoodPack;