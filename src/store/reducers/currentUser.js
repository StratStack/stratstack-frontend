import { SET_CURRENT_USER, SET_CURRENT_USER_IMAGE } from '../actionTypes';

const DEFAULT_STATE = {
	isAuthenticated: false, // hopefully be true, when logged in
	user: {}, // all the user info when logged in
};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				// turn empty object into false or if there are keys, true
				isAuthenticated: !!Object.keys(action.user).length,
				user: action.user,
			};
		case SET_CURRENT_USER_IMAGE:
			return {
				...state,
				user: { ...state.user, image: action.image },
			};
		default:
			return state;
	}
};
