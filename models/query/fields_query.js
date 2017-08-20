const _ = require('lodash');


const FieldsQR = {

	fields2Query: (model, fields) => {
		model.select(fields);

		return model;
	}

};



module.exports = FieldsQR;

