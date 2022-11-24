//Action to post a feed
import { apiCall } from '../../services/api';
import { addError } from './errors';
import { POST_FORGET, POST_RESET } from '../actionTypes';

// TO POST THE EMAIL FOR FORGOT THE PASSWORD
export const forgetMessage = (message) => ({
	type: POST_FORGET,
	message,
});
export const postForgot = (email) => {
	return async (dispatch) => {
		try {
			const res = await apiCall('post', `/api/admin/forgot`, { email });
			return dispatch(forgetMessage(res));
		} catch (err) {
			return addError(err?.message);
		}
	};
};
// TO POST THE password and confirm to change the password
export const resetMassage = (message) => ({
	type: POST_RESET,
	message,
});
export const postReset = (token, data) => {
	return async (dispatch) => {
		try {
			const res = await apiCall('post', `/api/admin/reset/${token}`, {
				...data,
			});
			return dispatch(resetMassage(res));
		} catch (err) {
			return addError(err?.message);
		}
	};
};
