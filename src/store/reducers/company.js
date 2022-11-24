import {
	LOAD_DEPARTMENT,
	SET_SELECTDEPARTMENT,
	ADD_SELECTDEPARTMENT,
	ADD_EMPLOYEEIDS,
	ADD_QUESTIONSTOQUESTIONNAIRE,
} from '../actionTypes';

const DEFAULT_STATE = [
	{
		employees: [],
		questionnaire: [{ questions: [{ question: '' }], employees: [] }],
	},
];

export const companyDepartments = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case LOAD_DEPARTMENT:
			return [...action.departments];
		default:
			return state;
	}
};

const initialState = { questions: [], employees: [] };
export const newQuestionnaire = (state = initialState, action) => {
	switch (action.type) {
		case SET_SELECTDEPARTMENT:
			return {
				...state,
				departmentName: action.departmentName,
				departmentIndex: action.index,
			};
		case ADD_SELECTDEPARTMENT:
			return {
				...state,
				departments: { ...action.department },
			};
		case ADD_EMPLOYEEIDS:
			return {
				...state,
				employees: [...action.employeeIds],
			};
		case ADD_QUESTIONSTOQUESTIONNAIRE:
			return {
				...state,
				questions: [...action.questions],
			};
		default:
			return state;
	}
};
