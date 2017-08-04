const ModelBase = require('../bookshelf');
const Joi = require('joi');
const Bcrypt = require('bcrypt');

const User = ModelBase.extend({
	tableName: 'users',
	hasTimestamps: true,

	hidden: ['password'],

	// validation is passed to Joi.object(), so use a raw object
	validate: {
		firstName: Joi.string()
	},


	// model methods
	generatePasswordHash: function (password) {

		return Bcrypt.genSalt(10)
			.then(function (salt) {
				return Bcrypt.hash(password, salt);
			})
			.then(function (hash) {
				return { password, hash };
			});
	}
});

module.exports = User;