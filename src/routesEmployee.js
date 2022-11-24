import Questionnaires from 'containers/EmployeeDashboard/Questionnaires/index.js';
import UserProfile from 'containers/User/UserProfile.js';

const routes = [
	{
		path: '/em/dashboard',
		name: 'Questionnaire',
		icon: 'nc-icon nc-bank',
		component: Questionnaires,
		layout: '/admin',
	},
	{
		collapse: true,
		name: 'My Account',
		icon: 'nc-icon nc-book-bookmark',
		state: 'pagesCollapse',
		views: [
			{
				path: '/user-profile',
				name: 'UserProfile',
				mini: 'up',
				component: UserProfile,
				layout: '/admin',
			},
		],
	},
];

export default routes;
