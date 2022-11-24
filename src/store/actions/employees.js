/*global localStorage */

import { apiCall, setTokenHeader } from '../../services/api';
import {
	SET_CURRENT_EMPLOYEE,
	ADD_EMPLOYEE,
	LOAD_EMPLOYEES,
	ADD_EMPLOYEEQUESTIONNAIRE,
	ADD_ANSWER,
} from '../actionTypes';
import { addError, removeError } from './errors';
import { addSuccess } from './success';

export const loadEmployees = (employees) => ({
	type: LOAD_EMPLOYEES,
	employees,
});

export const fetchEmployees = (companyId) => {
	return (dispatch) => {
		return apiCall(`get`, `/api/employee/${companyId}`)
			.then((res) => {
				dispatch(loadEmployees(res));
			})
			.catch((err) => {
				dispatch(addError(err?.message));
			});
	};
};

// ADD SINGLE EMPLOYEE
export const addEmployee = (employee) => ({
	type: ADD_EMPLOYEE,
	employee,
});

//function we run to login or signup successfully its a promise that will be completed after API call
export const registerEmployee = (companyId, formData) => async (dispatch) => {
	const fd = new FormData();
	fd.append('department', formData.department);
	fd.append('firstName', formData.firstName);
	fd.append('lastName', formData.lastName);
	fd.append('email', formData.email);
	fd.append('password', formData.description);
	try {
		const res = await apiCall('post', `/api/employee/signup/${companyId}`, {
			...formData,
		});
		dispatch(addEmployee(res[0]));
		dispatch(addSuccess(res[1]?.message));
	} catch (err) {
		dispatch(addError(err?.message));
	}
};

// =========================EMPLOYEE DASHBOARD ACTIONS
// FETCHING ALL THE QUESTIONNAIRES BELONG TO THE EMPLOYEE
export const loadEmployeeQuestionnaire = (questionnaires) => ({
	type: ADD_EMPLOYEEQUESTIONNAIRE,
	questionnaires,
});

//function we run to login or signup successfully its a promise that will be completed after API call
export const fetchEmployeeQuestionnaires =
	(companyId, departmentId, userId) => async (dispatch) => {
		try {
			const res = await apiCall(
				'get',
				`/api/employee/questions/${companyId}/${departmentId}/${userId}`
			);
			dispatch(loadEmployeeQuestionnaire(res[0]));
		} catch (err) {
			dispatch(addError(err?.message));
		}
	};

//ADD ANSWER TO THE QUESTION BY EMPLOYEE
export const addAnswer = (questionId) => ({
	type: ADD_ANSWER,
	questionId,
});

//function we run to login or signup successfully its a promise that will be completed after API call
export const postAnswer = (questionId, userId, answer) => async (dispatch) => {
	try {
		const res = await apiCall(
			'post',
			`/api/employee/answer/${questionId}/${userId}`,
			answer
		);
		dispatch(addSuccess('Your Answer is submitted'));
		dispatch(addAnswer(res));
	} catch (err) {
		dispatch(addError(err?.message));
	}
};
