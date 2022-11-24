/*global localStorage */

import { apiCall, setTokenHeader } from '../../services/api';
import { ADD_STRUCTURE } from '../actionTypes';
import { addError, removeError } from './errors';

// ACTION TO ADD STRUCTURE
export const addStructure = (structure) => ({
	type: ADD_STRUCTURE,
	structure,
});
export const createStructure = (str) => {
	return (dispatch) => {
		try {
			const res = apiCall('post', `/api/structure`, {
				str,
			});
			dispatch(addStructure(res));
		} catch (err) {
			dispatch(addError(err?.message));
		}
	};
};
