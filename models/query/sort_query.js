const _ = require('lodash');


const SortQR = {

	sort2Query: (qb, columns) => {
		columns.forEach(function(col){
			qb.orderBy(col[0], col[1]);
		});

		return qb;
	}

};



module.exports = SortQR;

