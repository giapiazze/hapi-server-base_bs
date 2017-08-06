const Bookshelf = require('../bookshelf');

// related models
const User = require('../../models/user/user_model');
// for schema fields, relations and scopes
const Fields = require('bookshelf-schema/lib/fields');

const Realm = Bookshelf.Model.extend({
		tableName: 'realms',
		hasTimestamps: true,

		// relationships
		users: function() {
			return this.belongsToMany(User, 'realms_users', 'realmId', 'userId');
		},

		// model methods
		// generatePasswordHash: function (password) {
		//
		// 	return Bcrypt.genSalt(10)
		// 		.then(function (salt) {
		// 			return Bcrypt.hash(password, salt);
		// 		})
		// 		.then(function (hash) {
		// 			return { password, hash };
		// 		});
		//
		// }
	},
	{
		schema: [
			Fields.StringField('name', {maxLength: 64, required: true}),

		]
	});

module.exports = Bookshelf.model('Realm', Realm);