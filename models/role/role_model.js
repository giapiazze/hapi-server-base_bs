const Bookshelf = require('../bookshelf');

// related models
const User = require('../../models/user/user_model');
// for schema fields, relations and scopes
const Fields = require('bookshelf-schema/lib/fields');

const Role = Bookshelf.Model.extend({
		tableName: 'roles',
		hasTimestamps: true,

		// relationships
		users: function() {
			return this.belongsToMany(User, 'roles_users', 'roleId', 'userId');
		},
	},
	{
		schema: [
			Fields.StringField('name', {maxLength: 64, required: true}),

		]
	});

module.exports = Bookshelf.model('Role', Role);