/*global localStorage */

import { apiCall, setTokenHeader } from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError } from './errors';

//function that we dispatch to redux reducer
export function setCurrentUser(user) {
	return {
		type: SET_CURRENT_USER,
		user,
	};
}

export function setAuthorizationToken(token) {
	setTokenHeader(token);
}
export const logout = () => {
	return (dispatch) => {
		localStorage.clear();
		setAuthorizationToken(false);
		dispatch(setCurrentUser({}));
	};
};

//function we run to login or signup successfully its a promiss that will be completed after API call
export function authUserSignup(formData) {
	return (dispatch) => {
		// wrap our thunk in a promise so we can wait for the API call
		return new Promise((resolve, reject) => {
			return apiCall('post', `/api/auth/signup`, { ...formData })
				.then(({ token, ...user }) => {
					localStorage.setItem('jwtToken', token);
					setAuthorizationToken(token);
					dispatch(setCurrentUser(user));
					dispatch(removeError());
					resolve(); // indicate that the API call succeeded
				})
				.catch((err) => {
					dispatch(addError(err?.message));
					reject(); // indicate the API call failed
				});
		});
	};
}

// sign in action
export function authUserSignin(formData) {
	return (dispatch) => {
		// wrap our thunk in a promise so we can wait for the API call
		return new Promise((resolve, reject) => {
			return apiCall('post', `/api/auth/signin`, formData)
				.then(({ token, ...user }) => {
					localStorage.setItem('jwtToken', token);
					setAuthorizationToken(token);
					dispatch(setCurrentUser(user));
					dispatch(removeError());
					resolve(); // indicate that the API call succeeded
				})
				.catch((err) => {
					dispatch(addError(err?.message));
					reject(); // indicate the API call failed
				});
		});
	};
}

// action to remove users
export function userDeavtivate(userId) {
	return (dispatch) => {
		// wrap our thunk in a promise so we can wait for the API call
		return new Promise((resolve, reject) => {
			return apiCall('post', `/api/auth/deactivate/${userId}`)
				.then(() => {
					localStorage.clear();
					setAuthorizationToken(false);
					dispatch(setCurrentUser({}));
					resolve(); // indicate that the API call succeeded
				})
				.catch((err) => {
					dispatch(addError(err?.message));
					reject(); // indicate the API call failed
				});
		});
	};
}
