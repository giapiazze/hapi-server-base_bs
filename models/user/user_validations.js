const Joi = require('joi');

const UserValidations = {

	query: Joi.object({
		id: Joi.number().integer().min(1).description('the user ID PK increment'),
		email: Joi.string().email().description('the user email'),
		firstName: Joi.string().min(3).max(64),
		lastName: Joi.string().min(3).max(64),
		isActive: Joi.boolean(),
		page: Joi.number().integer().min(1),
		pageSize: Joi.number().integer().min(10)
	}),

	params: function() {
		let params = {};
		return params;
	},
	payload: function() {
		let payload = {};
		return payload;

	}
};


module.exports = UserValidations;