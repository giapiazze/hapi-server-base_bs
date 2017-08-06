const Joi = require('joi');

const filters = {
	id: Joi.alternatives().try(
		Joi.array().items(Joi.number().integer().min(1)),
		Joi.number().integer().min(1)).description('the user ID PK increment'),
	username: Joi.string().min(3).max(64).description('the user name'),
	email: Joi.string().email().description('the user email'),
	isActive: Joi.alternatives().try(
		Joi.array().items(Joi.boolean().valid('', true, false)),
		Joi.boolean()).description('the user active'),
};

const pagination = {
	page: Joi.number().integer().min(1).description('page number'),
	pageSize: Joi.number().integer().min(10).description('rows per page'),
	withRelated: Joi.string().description('relationships: realms ex: realms, roles'),
};

const extra = {
	count: Joi.boolean().description('the number of records found')
};



const UserValidations = {
	filters: filters,
	pagination: pagination,
	extra: extra,
	query: Joi.object().keys(Object.assign({},filters, pagination, extra)),

};

let a = filters.hasOwnProperty('page');

module.exports = UserValidations;