const Joi = require('joi');

const filters = {
	id: Joi.alternatives().try(
		Joi.array().description('the user ID PK increment: 1, [1,2]')
      .items(Joi.number().integer().min(1)),
		Joi.number().integer().min(1)).description('the user ID PK increment: 1, [1,2]'),
	username: Joi.string().min(3).max(64).description('the user name'),
	email: Joi.string().email().description('the user email'),
	isActive: Joi.alternatives().try(
		Joi.array().description('the user active: true, [true, false]')
      .items(Joi.boolean().valid(true, false)),
		Joi.boolean().description('the user active: true, [true, false]').valid(true, false)),
};

const pagination = {
	page: Joi.number().integer().min(1).description('page number')
    .default(1),
	pageSize: Joi.number().integer().min(10).description('rows per page')
    .default(10),
  withRelated: Joi.alternatives().try(
		Joi.array().description('relationships: realms, [realms, roles]')
      .items(Joi.string().valid('realms','roles')),
    Joi.string().description('relationships: realms, [realms, roles]').valid('realms','roles')),
	columns: Joi.alternatives().try(
		Joi.array().description('columns for select: id, [id, username]')
			.items(Joi.string().valid('id', 'username', 'email', 'isActive', 'scope')),
		Joi.string().description('columns for select: id, [id, username]')
			.valid('id', 'username', 'email', 'isActive', 'scope')),
};

const extra = {
	count: Joi.boolean().description('only number of records found'),
};

const sort = {
  sort: Joi.alternatives().try(
	  Joi.array().description('sort column: id, -id, [id, -username]')
		  .items(Joi.string()
        .valid('id', '-id', 'username', '-username', 'email', '-email', 'isActive', '-isActive')),
	  Joi.string().description('sort column: id, -id, [id, -username]')
		  .valid('id', '-id', 'username', '-username', 'email', '-email', 'isActive', '-isActive')),
};



const UserValidations = {
	filters: filters,
	pagination: pagination,
	extra: extra,
  sort: sort,
	query: Joi.object().keys(Object.assign({}, filters, pagination, extra, sort)),

};


module.exports = UserValidations;