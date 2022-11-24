import Dashboard from 'containers/MyCompany';
import UserProfile from 'containers/User/UserProfile.js';
import Buttons from 'views/components/Buttons.js';
import Questionnaire from 'containers/Questionnaire';
import CompanyProfile from 'containers/CompanyProfile';
import Employees from 'containers/Employees';

const routes = [
	{
		path: '/dashboard',
		name: 'Submit Actions',
		icon: 'nc-icon nc-bank',
		component: Dashboard,
		layout: '/admin',
	},
	{
		collapse: true,
		name: 'Account',
		icon: 'nc-icon nc-book-bookmark',
		state: 'pagesCollapse',
		views: [
			{
				path: '/user-profile',
				name: 'UserProfile',
				mini: 'UP',
				component: UserProfile,
				layout: '/admin',
			},
			// {
			// 	path: '/company-profile',
			// 	name: 'CompanyProfile',
			// 	mini: 'UP',
			// 	component: CompanyProfile,
			// 	layout: '/admin',
			// },
		],
	},
	{
		path: '/questionnaire',
		name: 'Insert Actions',
		icon: 'nc-icon nc-layout-11',
		component: Questionnaire,
		layout: '/admin',
	},

	{
		path: '/employees',
		name: 'Register Employee',
		icon: 'nc-icon nc-layout-11',
		component: Employees,
		layout: '/admin',
	},
];

export default routes;
