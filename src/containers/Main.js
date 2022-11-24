import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authUserSignup, authUserSignin } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
import AuthLayout from 'layouts/Auth.js';
import AdminLayout from 'layouts/Admin.js';
import EmployeeLayout from 'layouts/Employee.js';
import LandingPage from 'containers/LandingPage';
import Structure from 'containers/Structure';
import LoginPage from 'containers/LoginPage';
import SignupPage from 'containers/SignupPage';
import Forgot from 'containers/ResetPassword/Forgot';
import TheReset from 'containers/ResetPassword/TheReset';
import ContactUs from 'containers/ContactUs';
import Terms from 'containers/Terms';
import Privacy from 'containers/Privacy';
import AboutUs from 'containers/AboutUs';
import Page1 from 'containers/Test/page1.js';
import withAuth from '../hocs/withAuth';

const Main = (props) => {
	const { authUserSignup, authUserSignin, errors, removeError, currentUser } =
		props;
	return (
		<Switch>
			<Route
				exact
				path='/test'
				render={(props) =>
					!currentUser.isAuthenticated ? (
						<Page1 />
					) : (
						<Redirect to='/admin/dashboard' />
					)
				}
			/>
			<Route
				exact
				path='/signin'
				render={(props) =>
					!currentUser.isAuthenticated ? (
						<LoginPage
							errors={errors}
							removeError={removeError}
							onAuth={authUserSignin}
							{...props}
						/>
					) : (
						<Redirect to='/admin/dashboard' />
					)
				}
			/>
			<Route
				exact
				path='/'
				render={(props) =>
					!currentUser.isAuthenticated ? (
						<LandingPage {...props} />
					) : (
						<Redirect to='/admin/dashboard' />
					)
				}
			/>

			<Route
				exact
				path='/forgot'
				render={(props) => {
					return (
						<Forgot
							{...props}
							errors={errors}
							removeError={removeError}
							currentUser={currentUser}
						/>
					);
				}}
			/>
			<Route
				exact
				path='/reset/:token'
				render={(props) => {
					return (
						<TheReset
							{...props}
							errors={errors}
							removeError={removeError}
							currentUser={currentUser}
						/>
					);
				}}
			/>
			{/* <Route
				exact
				path='/signin'
				render={(props) => (
					<LoginPage
						removeError={removeError}
						errors={errors}
						onAuth={authUserSignin}
						{...props}
					/>
				)}
			/> */}
			<Route
				exact
				path='/signup'
				render={(props) =>
					!currentUser.isAuthenticated ? (
						<SignupPage
							removeError={removeError}
							errors={errors}
							onAuth={authUserSignup}
							{...props}
						/>
					) : (
						<Redirect to='/admin/dashboard' />
					)
				}
			/>
			<Route
				exact
				path='/structure'
				render={(props) =>
					!currentUser.isAuthenticated ? (
						<Structure removeError={removeError} errors={errors} {...props} />
					) : (
						<Redirect to='/admin/dashboard' />
					)
				}
			/>
			<Route
				exact
				path='/contactus'
				render={(props) => {
					return <ContactUs {...props} />;
				}}
			/>
			<Route
				exact
				path='/terms'
				render={(props) => {
					return <Terms {...props} />;
				}}
			/>
			<Route
				exact
				path='/privacy'
				render={(props) => {
					return <Privacy {...props} />;
				}}
			/>
			<Route
				exact
				path='/aboutus'
				render={(props) => {
					return <AboutUs {...props} />;
				}}
			/>
			<Route path='/admin' component={withAuth(AdminLayout)} />
			{/* <Route path='/auth' render={(props) => <AuthLayout {...props} />} /> */}
			{/* <Route path='/admin' render={(props) => <AdminLayout {...props} />} /> */}
			<Redirect to='/admin/dashboard' />
		</Switch>
	);
};

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		errors: state.errors,
	};
}

export default withRouter(
	connect(mapStateToProps, { authUserSignup, authUserSignin, removeError })(
		Main
	)
);
