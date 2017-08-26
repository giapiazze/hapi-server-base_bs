const _ = require('lodash');


const FieldsQR = {

	fields2Query: (qb, fields) => {
		Object.keys(fields).forEach(function(key) {
			qb.select(fields[key]);
		});

		return qb;
	},

	withFields2Query: (qb, fields) => {
		qb.select(fields);


		return qb;
	}

};



module.exports = FieldsQR;

