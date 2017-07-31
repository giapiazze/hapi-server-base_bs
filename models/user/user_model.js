const ModelBase = require('../bookshelf');
const Joi = require('joi');

const User = ModelBase.extend({
	tableName: 'users',

	hidden: ['password'],

	// validation is passed to Joi.object(), so use a raw object
	// validate: {
	// 	firstName: Joi.string()
	// }
});

module.exports = User;