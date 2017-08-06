const Bookshelf = require('../bookshelf');

// related models
const Realm = require('../../models/realm/realm_model');
// for schema fields, relations and scopes
const Fields = require('bookshelf-schema/lib/fields');
const Scope = require('bookshelf-schema/lib/scopes');

const User = Bookshelf.Model.extend({
	tableName: 'users',
	hasTimestamps: true,

	hidden: ['password'],

	// relationships
	realms: function() {
		return this.belongsToMany(Realm, 'realms_users', 'realmId', 'userId');
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
			Fields.StringField('username', {maxLength: 64}),
			Fields.EmailField('email'),
			Fields.EncryptedStringField('password', {algorithm: 'Hash', minLength: 8, saltLength: 10}),
			Fields.BooleanField('isActive'),
			//Scope
			Scope('isActive?', function(){ return this.where({active: true}); })
		]
	});

module.exports = Bookshelf.model('User', User);