import {
	ADD_QUESTIONNAIRE,
	ADD_QUESTION,
	ADD_TITLEANDDEPARTMENT,
} from '../actionTypes';

const DEFAULT_STATE = { questions: [] };

export const CreateQuestionnaire = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case ADD_QUESTION:
			return { ...state, questions: [...action.question] };
		case ADD_TITLEANDDEPARTMENT:
			return {
				...state,
				title: action.title,
				department: action.department,
			};
		case ADD_QUESTIONNAIRE:
			return {
				...state,
				questions: [...state.questions.concat(action.question)],
			};
		default:
			return state;
	}
};
