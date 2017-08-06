const Bookshelf = require('../bookshelf');
const Joi = require('joi');
// Related models
const User = require('../../models/user/user_model');

const Realm = Bookshelf.Model.extend({
	tableName: 'realms',
	hasTimestamps: true,

	// validation is passed to Joi.object(), so use a raw object
	validate: {
		name: Joi.string().max(64)
	},

	// relationships
	users: function() {
		return this.belongsToMany(User);
	},


});

module.exports = Realm;