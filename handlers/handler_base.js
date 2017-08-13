const UserValidation = require('../models/user/user_validations');
const RoleValidation = require('../models/role/role_validations');


const HandlerBase = {
	queryParse: function(queryUrl, model){
		let referenceModel = {};
		let response = {
			filters: {},
			pagination: {},
			extra: {},
			sort: [],
		};

		switch (model) {
			case 'user':
				referenceModel = UserValidation;
				break;
			case 'role':
				referenceModel = RoleValidation;
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

			if (referenceModel.sort.hasOwnProperty(e)) {
				let sort = [];
				if (typeof queryUrl[e] === 'string') {
					sort = queryUrl[e].split(',');
				} else {
					sort = queryUrl[e];
				}
				sort.forEach( (el) => {
					if (el[0] === '-') {
						response.sort.push({column: el.substr(1, el.length), direction: 'DESC'})
					} else if (el[0] === '+') {
						response.sort.push({column: el.substr(1, el.length), direction: 'ASC'})
					} else {
						response.sort.push({column: el, direction: 'ASC'})
					}
				});
			}

		});

		return response;

	},

};



module.exports = HandlerBase;