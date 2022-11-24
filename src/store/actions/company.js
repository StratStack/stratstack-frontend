/*global localStorage */

import { apiCall, setTokenHeader } from '../../services/api';
import {
	LOAD_DEPARTMENT,
	SET_SELECTDEPARTMENT,
	ADD_EMPLOYEEIDS,
	ADD_QUESTIONSTOQUESTIONNAIRE,
} from '../actionTypes';
import { addError, removeError } from './errors';
import { addSuccess, removeSuccess } from './success';

// ACTION TO LOAD ALL DEPARTMENT BELONG TO THE STRUCTURE OF THE COMPANY
export const loadDepartment = (departments) => ({
	type: LOAD_DEPARTMENT,
	departments,
});

export const fetchDepartment = (companyId, adminId) => {
	return (dispatch) => {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await apiCall(
					'get',
					`/api/company/departments/${companyId}/${adminId}`
				);
				dispatch(loadDepartment(res));
				resolve(); // indicate that the API call succeeded
			} catch (err) {
				dispatch(addError(err?.message));
				reject(); // indicate the API call failed
			}
		});
	};
};
export const emptyFetchDepartment = () => {
	return (dispatch) => {
		return new Promise(async (resolve, reject) => {
			try {
				dispatch(loadDepartment([]));
				resolve(); // indicate that the API call succeeded
			} catch (err) {
				dispatch(addError(err?.message));
				reject(); // indicate the API call failed
			}
		});
	};
};

//Action to save the wizardProcess data for creating the questionnaire ===========================================================================
export const selectDepartment = (departmentName, index) => ({
	type: SET_SELECTDEPARTMENT,
	departmentName,
	index,
});
export const setSelectedDepartment = (departmentName, index) => {
	return (dispatch) => {
		try {
			dispatch(selectDepartment(departmentName, index));
		} catch (err) {
			dispatch(addError(err?.message));
		}
	};
};

export const addDepartment = (department) => ({
	type: ADD_SELECTDEPARTMENT,
	department,
});

export const addSelectedDepartment = (department) => {
	return (dispatch) => {
		try {
			dispatch(addDepartment(department));
		} catch (err) {
			dispatch(addError(err?.message));
		}
	};
};
export const addEmployeeList = (employeeIds) => ({
	type: ADD_EMPLOYEEIDS,
	employeeIds,
});

export const addEmployeesToQuestionnaire = (employeeIds) => {
	return (dispatch) => {
		try {
			dispatch(addEmployeeList(employeeIds));
		} catch (err) {
			dispatch(addError(err?.message));
		}
	};
};
export const addQuestionList = (questions) => ({
	type: ADD_QUESTIONSTOQUESTIONNAIRE,
	questions,
});

export const addQuestionsToQuestionnaire = (questions) => {
	return (dispatch) => {
		try {
			dispatch(addQuestionList(questions));
		} catch (err) {
			dispatch(addError(err?.message));
		}
	};
};

// THE POST ACTION TO SUBMIT THE QUESTIONNAIRE AND ADD TO THE DEPARTMENT
export const addNewQuestionnaire =
	(companyId, adminId, formData) => async (dispatch) => {
		try {
			const res = await apiCall(
				'post',
				`/api/company/questionnaire/create/${companyId}/${adminId}`,
				{
					...formData,
				}
			);
			dispatch(addSuccess(res));
		} catch (err) {
			dispatch(addError(err?.message));
		}
	};
