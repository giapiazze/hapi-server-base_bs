const UserRoutes = require('./handlers/user/user_routes');
const AuthRoutes = require('./handlers/auth/auth_routes');

const Routes = [
	// Authentication Routes
	{ register: AuthRoutes},

	// User Routes
	{ register: UserRoutes},



];

module.exports = Routes;