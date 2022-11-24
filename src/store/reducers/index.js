import { combineReducers } from 'redux';
import currentUser from './currentUser';
import { user } from './user';
import errors from './errors';
import success from './success';
import { reset } from './resetPassword';
import { employees } from './employees';
import { CreateQuestionnaire } from './questions';
import { companyDepartments } from './company';
import { newQuestionnaire } from './company';
import { employeeQuestionnaires } from './employees';

const rootReducer = combineReducers({
	currentUser,
	errors,
	success,
	user,
	reset,
	employees,
	CreateQuestionnaire,
	companyDepartments,
	newQuestionnaire,
	employeeQuestionnaires,
});

export default rootReducer;
