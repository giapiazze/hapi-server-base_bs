const Joi = require('joi');

const filters = {
    id: Joi.number().integer().min(1).description('the user ID PK increment'),
    email: Joi.string().email().description('the user email'),
    firstname: Joi.string().min(3).max(64),
    lastname: Joi.string().min(3).max(64),
    is_active: Joi.boolean(),
};

const pagination = {
    page: Joi.number().integer().min(1),
    pageSize: Joi.number().integer().min(10)
};

const count = {
    count: Joi.boolean().description('the number of records found')
};



const UserValidations = {

    query: Joi.object().keys(Object.assign({},filters, pagination, count)),

};

module.exports = UserValidations;