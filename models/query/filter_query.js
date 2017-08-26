const _ = require('lodash');

// Only ONE element follows
const Operator = ['{=}', '{<}', '{<=}', '{>}', '{>=}', '{<>}', '{like}'];

// Array follows
const InOperator = '{in}';
// Array follows ONLY TWO elements
const BtwOperator = '{btw}';
// End condition
const NullOperator = '{null}';
// Change Where => whereNot, orWhere, orWhereNot, orWhereNotLike
const OrOperator = '{or}';
const NotOperator = '{not}';

const FilterQR = {

	filter2Query: (qb, filter) => {
		Object.keys(filter).forEach(function(key) {
			Object.keys(filter[key]).map((op) => {
				if (_.includes(Operator, op)) {
					let signal = _.replace(_.replace(op, '}', ''), '{', '');
					filter[key][op].forEach(function(value){
						qb.where(key, signal, value);
					});
				}
				if (_.includes(InOperator, op)) {
					filter[key][op].forEach(function(value){
						qb.whereIn(key, value);
					});
				}
				if (_.includes(BtwOperator, op)) {
					filter[key][op].forEach(function(value){
						qb.whereBetween(key, value[0], value[1]);
					});
				}
				if (_.includes(NullOperator, op)) {
					qb.whereNull(key);
				}
				if (_.includes(OrOperator, op)) {
					let orKeys = filter[key][op];
					Object.keys(orKeys).map((orOp) => {
						if (_.includes(Operator, orOp)) {
							let signal = _.replace(_.replace(orOp, '}', ''), '{', '');
							orKeys[orOp].forEach(function(value){
								qb.orWhere(key, signal, value);
							});
						}
						if (_.includes(InOperator, orOp)) {
							orKeys[orOp].forEach(function(value){
								qb.orWhereIn(key, value);
							});
						}
						if (_.includes(BtwOperator, orOp)) {
							orKeys[op][orOp].forEach(function(value){
								qb.orWhereBetween(key, value[0], value[1]);
							});
						}
						if (_.includes(NullOperator, orOp)) {
							qb.orWhereNull(key);
						}
						if (_.includes(NotOperator, orOp)){
							let orNotKeys = filter[key][op][orOp];
							Object.keys(orNotKeys).map((orNotOp) => {
								if (_.includes(Operator, orNotOp)) {
									let signal = _.replace(_.replace(orNotOp, '}', ''), '{', '');
									orNotKeys[orNotOp].forEach(function(value){
										qb.orWhereNot(key, signal, value);
									});
								}
								if (_.includes(InOperator, orNotOp)) {
									orNotKeys[orNotOp].forEach(function(value){
										qb.orWhereNotIn(key, value);
									});
								}
								if (_.includes(BtwOperator, orNotOp)) {
									orNotKeys[orNotOp].forEach(function(value){
										qb.orWhereNotBetween(key, value[0], value[1]);
									});
								}
								if (_.includes(NullOperator, orNotOp)) {
									qb.orWhereNotNull(key);
								}
							});
						}
					});
				}
				if (_.includes(NotOperator, op)){
					let notKeys = filter[key][op];
					Object.keys(notKeys).map((notOp) => {
						if (_.includes(Operator, notOp)) {
							let signal = _.replace(_.replace(notOp, '}', ''), '{', '');
							notKeys[notOp].forEach(function(value){
								qb.whereNot(key, signal, value);
							});
						}
						if (_.includes(InOperator, notOp)) {
							notKeys[notOp].forEach(function(value){
								qb.whereNotIn(key, value);
							});
						}
						if (_.includes(BtwOperator, notOp)) {
							notKeys[notOp].forEach(function(value){
								qb.whereNotBetween(key, value[0], value[1]);
							});
						}
						if (_.includes(NullOperator, notOp)) {
							qb.whereNotNull(key);
						}
					});
				}
			})
		});

		return qb;
	}

};



module.exports = FilterQR;

