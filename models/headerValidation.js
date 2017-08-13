const Joi = require('joi');


const auth = {
	authorization: Joi.string().required().options({allowUnknown: true}),
};



const HeaderValidations = {
	header: Joi.object().keys(Object.assign({}, auth)).options({ allowUnknown: true }),
};


module.exports = HeaderValidations;