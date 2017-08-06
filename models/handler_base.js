const UserValidation = require('./user/user_validations');


const HandlerBase = {
	queryParse: function(queryUrl, model){
		let referenceModel = {};
		let response = {
			filters: {},
			pagination: {},
			extra: {},
			columns: [],
		};

		switch (model) {
			case 'user':
				referenceModel = UserValidation;
				break;
		}

		Object.keys(queryUrl).map((e) => {
			if (referenceModel.filters.hasOwnProperty(e)) {
				if (typeof queryUrl[e] === 'string') {
					queryUrl[e] = '%' + queryUrl[e] + '%'
				}
				response.filters[e] = queryUrl[e];
			}

			if (referenceModel.pagination.hasOwnProperty(e)) {
				response.pagination[e] = queryUrl[e];
			}

			if (referenceModel.extra.hasOwnProperty(e)) {
				response.extra[e] = queryUrl[e];
			}

		});

		return response;

	},

};



module.exports = HandlerBase;