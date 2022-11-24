import React, { useEffect } from 'react';
import Employees from '../Components/Step2Employees';
import Questions from '../Components/Step2Questions';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchDepartment,
	emptyFetchDepartment,
	addSelectedDepartment,
	addEmployeesToQuestionnaire,
	addQuestionsToQuestionnaire,
} from '../../../store/actions/company';
// reactstrap components
import { Row, Col, Button } from 'reactstrap';

const Step2 = React.forwardRef((props, ref) => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.currentUser.user);
	const companyDepartments = useSelector((state) => state.companyDepartments);
	const newQuestionnaire = useSelector((state) => state.newQuestionnaire);
	const [employees, setEmployees] = React.useState();
	const [employeesState, setEmployeesState] = React.useState();
	const [questionsState, setQuestionsState] = React.useState();
	const [questions, setQuestions] = React.useState();
	const [employeeButtonColor, setEmployeeButtonColor] =
		React.useState('default');
	const [questionButtonColor, setQuestionButtonColor] =
		React.useState('default');

	React.useImperativeHandle(ref, () => ({
		isValidated: () => {
			return isValidated();
		},
		state: {
			employees,
			employeesState,
			questions,
			questionsState,
		},
	}));
	useEffect(() => {
		dispatch(fetchDepartment(currentUser.company, currentUser.id));
		return () => {
			dispatch(emptyFetchDepartment());
		};
	}, []);
	const selectedDepatrment = companyDepartments.filter((department) => {
		return department.name == newQuestionnaire.departmentName;
	});

	const isValidated = () => {
		if (
			(employeesState === 'has-success') &
			(questionsState === 'has-success')
		) {
			return true;
		} else {
			if (
				(employeesState !== 'has-success') &
				(questionsState !== 'has-success')
			) {
				setEmployeesState('has-danger');
				setQuestionsState('has-danger');
			}
			return false;
		}
	};

	const questionButtonClick = (e) => {
		e.preventDefault();
		const setQuestionIds = selectedDepatrment[0].questionnaire[0].questions.map(
			(q) => {
				return q._id;
			}
		);
		if (questionButtonColor === 'default') {
			setQuestionButtonColor('success');
			setQuestionsState('has-success');
			dispatch(addQuestionsToQuestionnaire(setQuestionIds));
		} else {
			setQuestionButtonColor('default');
			setQuestionsState('has-danger');
		}
	};

	const employeeButtonClick = (e) => {
		e.preventDefault();
		const setEmployeeIds = selectedDepatrment[0].employees.map((employee) => {
			return employee._id;
		});
		if (employeeButtonColor === 'default') {
			setEmployeeButtonColor('success');
			setEmployeesState('has-success');
			dispatch(addEmployeesToQuestionnaire(setEmployeeIds));
		} else {
			setEmployeeButtonColor('default');
			setEmployeesState('has-danger');
		}
	};
	return (
		<>
			<h5 className='info-text'>Review and Submit</h5>
			<Row>
				<Col lg='12'>
					<Row>
						<Col lg='6'>
							<Employees employees={selectedDepatrment[0]?.employees} />
							<Button color={employeeButtonColor} onClick={employeeButtonClick}>
								Confirm
							</Button>
							{employeesState === 'has-danger' ? (
								<label className='error'>This field is required.</label>
							) : null}
						</Col>
						<Col lg='6'>
							<Questions
								questions={selectedDepatrment[0]?.questionnaire[0]?.questions}
							/>
							<Button color={questionButtonColor} onClick={questionButtonClick}>
								Confirm
							</Button>
							{questionsState === 'has-danger' ? (
								<label className='error'>This field is required.</label>
							) : null}
						</Col>
					</Row>
				</Col>
			</Row>
		</>
	);
});

export default Step2;
