const Joi = require('joi');

const UserValidations = {

	query: Joi.object().keys({
        id: Joi.number().integer().min(1).description('the user ID PK increment'),
        email: Joi.string().email().description('the user email'),
        firstname: Joi.string().min(3).max(64),
        lastname: Joi.string().min(3).max(64),
        is_active: Joi.boolean(),
        page: Joi.number().integer().min(1),
        pageSize: Joi.number().integer().min(10),
        count: Joi.boolean().description('the number of records found')}),

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