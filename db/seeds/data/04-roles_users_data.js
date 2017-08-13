// Roles References:
// role_id: 1 => GA_User
// role_id: 2 => GA_Admin
// role_id: 3 => GA_SuperAdmin
// role_id: 4 => WA_User
// role_id: 5 => WA_Admin
// role_id: 6 => WA_SuperAdmin
// role_id: 7 => WJ_User
// role_id: 8 => WJ_Admin
// role_id: 9 => WJ_SuperAdmin

const array = [
	{user_id: 1, role_id: 2},
	{user_id: 1, role_id: 6},
	{user_id: 1, role_id: 7},
	{user_id: 2, role_id: 1},
	{user_id: 2, role_id: 5},
	{user_id: 3, role_id: 3},
	{user_id: 3, role_id: 8},
];

module.exports = array;