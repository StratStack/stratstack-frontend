import {
	LOAD_EMPLOYEES,
	ADD_EMPLOYEE,
	ADD_EMPLOYEEQUESTIONNAIRE,
	ADD_ANSWER,
} from '../actionTypes';

const DEFAULT_STATE = [{ department: {} }];

export const employees = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case LOAD_EMPLOYEES:
			return [...action.employees];
		case ADD_EMPLOYEE:
			return [...state.concat(action.employee)];
		default:
			return state;
	}
};

//Employee Dashboard========================================================

const defaultState = {
	questions: [{ question: '', employees: [], answers: [] }],
};

export const employeeQuestionnaires = (state = defaultState, action) => {
	switch (action.type) {
		case ADD_EMPLOYEEQUESTIONNAIRE:
			return { ...action.questionnaires };
		case ADD_ANSWER:
			return {
				...state,
				questions: state?.questions?.filter(
					(item) => item._id !== action.questionId
				),
			};
		default:
			return state;
	}
};
