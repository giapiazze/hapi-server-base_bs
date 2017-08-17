const UserValidation = require('../models/user/user_validations');
const RoleValidation = require('../models/role/role_validations');
const _ = require('lodash');


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
				let tmp = _.split(e, '.');
				tmp[tmp.length-1] = _.snakeCase(tmp[tmp.length-1]);
				response.filters[_.join(tmp,'.')] = queryUrl[e];
				let p = 0;
			}

			if (referenceModel.pagination.hasOwnProperty(e)) {
				if (e === 'columns') {
					let row;
					response.pagination[e] = [];
					row = queryUrl[e].split(',');
					response.pagination[e] = response.pagination[e].concat(row);
					response.pagination[e].forEach(function(el, index){
						response.pagination[e][index] = _.snakeCase(el);
					});
				} else {
					response.pagination[e] = queryUrl[e];
				}
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
					let element = _.snakeCase(el);
					if (element[0] === '-') {
						response.sort.push({column: element.substr(1, element.length), direction: 'DESC'})
					} else if (el[0] === '+') {
						response.sort.push({column: element.substr(1, element.length), direction: 'ASC'})
					} else {
						response.sort.push({column: element, direction: 'ASC'})
					}
				});
			}

		});

		return response;

	},

};



module.exports = HandlerBase;