/*global localStorage */

import { apiCall, setTokenHeader } from '../../services/api';
import {
	ADD_QUESTION,
	ADD_QUESTIONNAIRE,
	ADD_TITLEANDDEPARTMENT,
} from '../actionTypes';
import { addError, removeError } from './errors';
import { addSuccess, removeSuccess } from './success';

// ACTION TO LOAD QUESTIONS
export const loadQuestions = (question) => ({
	type: ADD_QUESTION,
	question,
});

export const loadQuestion = (theQuestion) => {
	return (dispatch) => {
		try {
			dispatch(loadQuestions(theQuestion));
		} catch (err) {
			dispatch(addError(err?.message));
		}
	};
};

// ACTION TO ADD QUESTION TO OUR QUESTIONNAIRE
export const addQuestions = (question) => ({
	type: ADD_QUESTIONNAIRE,
	question,
});
export const addQuestion = (theQuestion) => {
	return (dispatch) => {
		try {
			dispatch(addQuestions(theQuestion));
			dispatch(addSuccess('question added'));
		} catch (err) {
			dispatch(addError(err?.message));
		}
	};
};

//adding title and department
export const addTitleDep = (title, department) => ({
	type: ADD_TITLEANDDEPARTMENT,
	title,
	department,
});

export const addTitleDepartment = (title, department) => {
	return (dispatch) => {
		try {
			dispatch(addTitleDep(title, department));
			// dispatch(addSuccess('The Title and Department added'));
		} catch (err) {
			dispatch(addError(err?.message));
		}
	};
};

// THE POST ACTION TO SUBMIT THE QUESTIONNAIRE AND ADD TO THE DEPARTMENT
export const addQuestionnaire =
	(companyId, adminId, formData) => async (dispatch) => {
		try {
			const res = await apiCall(
				'post',
				`/api/question/questionnaire/create/${companyId}/${adminId}`,
				{
					...formData,
				}
			);
			dispatch(loadQuestions([]));
			dispatch(addSuccess(res.message));
		} catch (err) {
			dispatch(addError(err?.message));
		}
	};
