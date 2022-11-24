import React, { useEffect } from 'react';
// react plugin used to create DropdownMenu for selecting items
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

// reactstrap components
import {
	FormGroup,
	Input,
	Row,
	Col,
	Card,
	CardBody,
	CardHeader,
	CardTitle,
	Button,
} from 'reactstrap';

const Step3 = React.forwardRef((props, ref) => {
	const dispatch = useDispatch();
	const CreateQuestionnaire = useSelector((state) => state.CreateQuestionnaire);
	const [title, setTitle] = React.useState('');
	const [department, setDepartment] = React.useState('');
	const [questions, setQuestions] = React.useState([]);
	const [questionsState, setQuestionsState] = React.useState();
	const [questionButtonColor, setQuestionButtonColor] =
		React.useState('default');

	React.useImperativeHandle(ref, () => ({
		isValidated: () => {
			return isValidated();
		},
		state: {
			title,
			department,
			questions,
			questionsState,
		},
	}));
	let count = 1;
	// const handleClick = () => {
	// 	setTitle(CreateQuestionnaire.title);
	// 	setDepartment(CreateQuestionnaire.department);
	// 	setQuestions(CreateQuestionnaire.questions);
	// };
	const isValidated = () => {
		if (questionsState === 'has-success') {
			return true;
		} else {
			if (questionsState !== 'has-success') {
				setQuestionsState('has-danger');
			}
			return false;
		}
	};
	const handleClick = (e) => {
		e.preventDefault();

		if (questionButtonColor === 'default') {
			setQuestionButtonColor('success');
			setQuestionsState('has-success');
			setTitle(CreateQuestionnaire.title);
			setDepartment(CreateQuestionnaire.department);
			setQuestions(CreateQuestionnaire.questions);
		} else {
			setQuestionButtonColor('default');
			setQuestionsState('has-danger');
		}
	};
	return (
		<>
			<div className='content'>
				<Row>
					<Col md='4'>
						<Card>
							<CardHeader>
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
						</Card>
					</Col>
					<Col md='8'>
						<Card>
							<CardHeader>
								<CardTitle>List of Questions</CardTitle>
							</CardHeader>
							<CardBody>
								<h4>Title: {CreateQuestionnaire.title}</h4>
								<h4>Department: {CreateQuestionnaire.department}</h4>
							</CardBody>
						</Card>
						<Button color={questionButtonColor} onClick={handleClick}>
							Confirm *
						</Button>
						{questionsState === 'has-danger' ? (
							<label className='error'>This field is required.</label>
						) : null}
					</Col>
				</Row>
			</div>
		</>
	);
});

export default Step3;
