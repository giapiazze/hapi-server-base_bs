// Roles References:
// role_id: 1 => User
// role_id: 2 => Admin
// role_id: 3 => SuperAdmin
// realm_id: 1 => GameApp
// realm_id: 2 => WebApp
// realm_id: 3 => WebJson


const array = [
	{realm_id: 1, role_id: 2, user_id: 1},
	{realm_id: 1, role_id: 3, user_id: 2},
	{realm_id: 1, role_id: 1, user_id: 3},
	{realm_id: 2, role_id: 1, user_id: 1},
	{realm_id: 2, role_id: 2, user_id: 3},
	{realm_id: 3, role_id: 1, user_id: 1},
	{realm_id: 3, role_id: 2, user_id: 2},
];

module.exports = array;