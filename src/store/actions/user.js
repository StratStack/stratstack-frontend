/*global localStorage */
import { apiCall } from '../../services/api';
import { setAuthorizationToken } from './auth';
import { addError, removeError } from './errors';
import { addSuccess, removeSuccess } from './success';
import {
	LOAD_USER,
	LOAD_PROFILE_IMAGE,
	SET_CURRENT_USER_IMAGE,
} from '../actionTypes';

// ======================================================
// TO LOAD MYBUSINESS
export const loadUser = (user) => ({
	type: LOAD_USER,
	user,
});

export const fetchUser = (userId) => {
	return (dispatch) => {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await apiCall('get', `/api/admin/${userId}`);
				dispatch(loadUser(res));
				resolve(); // indicate that the API call succeeded
			} catch (err) {
				dispatch(addError(err?.message));
				reject(); // indicate the API call failed
			}
		});
	};
};
// EDIT USER PROFILE ACTION
export const editProfile = (userId, fields) => {
	return async (dispatch) => {
		try {
			const res = await apiCall('put', `/api/admin/${userId}/edit`, fields);
			dispatch(addSuccess('Information Edited'));
			return dispatch(loadUser(res));
		} catch (err) {
			addError(err?.message);
		}
	};
};

// EDIT THE USER IMAGE
export const changeImage = (imageURL) => ({
	type: LOAD_PROFILE_IMAGE,
	image: imageURL,
});
export const changeImageOnCurrentUser = (imageURL) => ({
	type: SET_CURRENT_USER_IMAGE,
	image: imageURL,
});

export const editImage = (userId, formData) => {
	return async (dispatch) => {
		const fd = new FormData();
		fd.append('image', formData);
		try {
			const res = await apiCall('put', `/api/admin/${userId}/image`, fd);
			dispatch(changeImage(res));
			dispatch(changeImageOnCurrentUser(res));
			dispatch(addSuccess('Image Changed'));
			// localStorage.setItem('jwtToken', res.token);
			// setAuthorizationToken(res.token);
		} catch (err) {
			addError(err?.message);
		}
	};
};
//Action to post a contactus
export const postContact = (contactData) => (dispatch, getState) => {
	return apiCall('post', `/api/admin/contact`, {
		...contactData,
	})
		.then((res) => dispatch(res))
		.catch((err) => addError(err.message));
};
