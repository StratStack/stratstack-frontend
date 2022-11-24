import React, { useState, useEffect } from 'react';
// javascript plugin used to create scrollbars on windows
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import {
	addQuestion,
	addTitleDepartment,
	loadQuestion,
} from '../../../store/actions/questions';
import { addQuestionnaire } from '../../../store/actions/questions';
import Select from 'react-select';
// import * as yup from 'yup';
// import { useFormik } from 'formik';
import {
	FormControl,
	FormControlLabel,
	TextField,
	Checkbox,
} from '@material-ui/core';
// reactstrap components
import { Button, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';

var ps;
var theList = [];
function EmployeeForms(props) {
	const dispatch = useDispatch();
	const errors = useSelector((state) => state.errors);
	const questions = useSelector((state) => state.questions);
	const currentUser = useSelector((state) => state.currentUser.user);
	const [question, setQuestion] = useState('');
	const [title, setTitle] = useState();
	const [department, setDepartment] = useState();
	const [questionArray, setQuestionArray] = useState([]);
	// useEffect(() => {
	// 	dispatch(loadQuestion(theList));
	// }, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		// const qList = { title, department, question };
		// theList.push(qList);
		dispatch(addQuestion(question));
		setQuestion('');
	};
	useEffect(() => {
		dispatch(
			addTitleDepartment(
				props.wizardData.Start?.title,
				props.wizardData.Start?.department
			)
		);
	});
	const handleSubmitClick = () => {
		dispatch(
			addQuestionnaire(currentUser.company, currentUser.id, department, theList)
		);
	};

	return (
		<>
			<CardBody>
				<CardHeader>
					<h4>Title: {props.wizardData.Start?.title}</h4>
					<h4>Department: {props.wizardData.Start?.department}</h4>
				</CardHeader>
				<form onSubmit={handleSubmit} autoComplete='off' className='form'>
					<Card className='card-login'>
						<CardBody>
							{errors.message && (
								<Alert severity='error'>{errors?.message}</Alert>
							)}
							<div className='row'>
								<div className='col-12 mb-2 col-md-12'>
									<FormControl fullWidth={true}>
										<TextField
											type='text'
											onChange={(e) => {
												setQuestion(e.target.value);
											}}
											value={question}
											fullWidth
											label='Question'
										/>
									</FormControl>
								</div>
							</div>
							<CardFooter>
								<Button
									color='primary'
									// disabled={formik.isSubmitting}
									type='submit'
									style={{ width: '15%' }}>
									Add
								</Button>
							</CardFooter>
						</CardBody>
					</Card>
				</form>
			</CardBody>
		</>
	);
}

export default EmployeeForms;
