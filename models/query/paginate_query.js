const _ = require('lodash');


const PaginateQR = {

	page2Query: (qb, paginate) => {
		qb.offset(paginate.offset).limit(paginate.limit);

		return qb;
	}

};



module.exports = PaginateQR;

