const Bookshelf = require('../bookshelf');
const Joi = require('joi');
require('./user_model');

let u = Bookshelf._models.User;

let attributes = [];
Object.keys(u.prototype.validate).map((at) => {
	let v = u.prototype.validate[at];
	let w = u.prototype.validate[at]._type;
	let b = new Date();
	attributes = attributes.concat(at);
});

const operators = ['{=}', '{<}', '{<=}', '{>}', '{>=}', '{<>}'];

let idRegExp = '';
operators.forEach(function(str, index){
	if (index > 0) {
		idRegExp += '|';
	}
	if (str === '{=}') {
		idRegExp += "^(?:{not})?(?:" + str + ")?[1-9]{1}[0-9]{0,6}$";
	} else {
		idRegExp += "^(?:{not})?" + str + "[1-9]{1}[0-9]{0,6}$";
	}
});

idRegExp = new RegExp(idRegExp);

const inOperator = ['{in}'];

const betweenOperator = ['btw'];


const filters = {
	id: Joi.alternatives().try(
		Joi.array().items(
			Joi.string().regex(idRegExp)).description('the user ID PK increment: 1 vs [{>}1,{<>}20,{<=}100]'),
		Joi.number().integer().min(1),
	),


	username: Joi.string().min(3).max(64).description('the user name').example('luigi'),
	email: Joi.string().email().description('the user email'),
	isActive: Joi.alternatives().try(
		Joi.array().description('the user active: true, [true, false]')
			.items(Joi.boolean().valid(true, false)),
		Joi.boolean().description('the user active: true, [true, false]').valid(true, false)),
	createdAt: Joi.date().description('the creation date'),
	updatedAt: Joi.date().description('last change date'),
	deletedAt: Joi.date().description('the delete date'),
};

const pagination = {
	page: Joi.number().integer().min(1).description('page number')
		.default(1),
	pageSize: Joi.number().integer().min(5).max(100).description('rows per page')
		.default(10),
	withRelated: Joi.alternatives().try(
		Joi.array().description('relationships: roles, [roles, roles.realm]')
			.items(Joi.string().valid('roles.realm','roles', 'realms', 'realmRoles')),
		Joi.string().description('relationships: roles, [roles, roles.realm]')
			.valid('roles.realm', 'roles', 'realms', 'realmRoles')),
	columns: Joi.alternatives().try(
		Joi.array().description('columns for select: id, [id, username]')
			.items(Joi.string().valid('id', 'username', 'email', 'isActive', 'scope')),
		Joi.string().description('columns for select: id, [id, username]')
			.valid('id', 'username', 'email', 'isActive', 'scope', '[id,isActive]')),
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