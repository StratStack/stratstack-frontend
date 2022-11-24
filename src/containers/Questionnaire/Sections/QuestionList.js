import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
// import { fetchEmployees } from '../../../store/actions/employees';

import { removeSuccess } from 'store/actions/success';
import { removeError } from 'store/actions/errors.js';
// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	CardTitle,
	FormGroup,
	Form,
	Input,
	Row,
	Col,
} from 'reactstrap';

function QuestionList() {
	const errors = useSelector((state) => state.errors);
	const success = useSelector((state) => state.success);
	// const dispatch = useDispatch();
	// const errors = useSelector((state) => state.errors);
	const CreateQuestionnaire = useSelector((state) => state.CreateQuestionnaire);
	// const employees = useSelector((state) => state.employees);
	// const currentUser = useSelector((state) => state.currentUser.user);
	// useEffect(() => {
	// 	dispatch(fetchEmployees(currentUser.company));
	// }, []);
	let count = 1;
	return (
		<>
			<CardHeader>
				{errors.message && <Alert severity='error'>{errors?.message}</Alert>}
				{success.message && (
					<Alert severity='success'>{success?.message}</Alert>
				)}
				<CardTitle>List of Questions</CardTitle>
			</CardHeader>
			<CardBody>
				<ul className='list-unstyled team-members'>
					{CreateQuestionnaire.questions.map((question) => {
						let i = count++;
						return (
							<li key={i}>
								<Row>
									<Col md='11' xs='11'>
										{i}: <strong>{question}</strong>
									</Col>
								</Row>
							</li>
						);
					})}
				</ul>
			</CardBody>
		</>
	);
}

export default QuestionList;
