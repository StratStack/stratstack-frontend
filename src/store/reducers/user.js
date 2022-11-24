import { LOAD_USER, LOAD_PROFILE_IMAGE } from '../actionTypes';

export const user = (state = {}, action) => {
	switch (action.type) {
		case LOAD_USER:
			return { ...action.user };
		case LOAD_PROFILE_IMAGE:
			return {
				...state,
				image: action.image,
			};
		default:
			return state;
	}
};
