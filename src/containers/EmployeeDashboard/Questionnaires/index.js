import React, { useEffect } from 'react';
//Redux store
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeeQuestionnaires } from '../../../store/actions/employees';
import { removeSuccess } from 'store/actions/success';

import Question from './Sections/Question';
import AnswerForm from './Sections/AnswerForm';
// reactstrap components
import { Button, Card, Row, Col } from 'reactstrap';

function UserProfile(props) {
	const dispatch = useDispatch();
	const success = useSelector((state) => state.success);
	const errors = useSelector((state) => state.errors);
	const employeeQuestionnaires = useSelector(
		(state) => state.employeeQuestionnaires
	);
	const currentUser = useSelector((state) => state.currentUser.user);
	useEffect(() => {
		dispatch(
			fetchEmployeeQuestionnaires(
				currentUser.company,
				currentUser.department,
				currentUser.id
			)
		);
	}, []);
	useEffect(() => {
		let removeS = setTimeout(() => dispatch(removeSuccess()), 5000);
		return () => {
			clearTimeout(removeS);
		};
	}, []);
	return (
		<>
			<div className='content'>
				<Row>
					<Col md='12'>
						<Card>
							<Row>
								<Col md='11'>
									{errors.message && (
										<Alert severity='error'>{errors.message}</Alert>
									)}
									{success.message && (
										<Alert severity='success'>{success?.message}</Alert>
									)}
									{employeeQuestionnaires.questions.map((question) => (
										<div key={question._id}>
											{!question.employees.includes(currentUser.id) && (
												<>
													<Question
														userId={currentUser.id}
														question={question}
													/>
													<AnswerForm
														userId={currentUser.id}
														question={question}
													/>
												</>
											)}
										</div>
									))}
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	);
}

export default UserProfile;
