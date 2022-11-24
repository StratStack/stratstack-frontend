import React, { useEffect } from 'react';
// react plugin used to create a form with multiple steps
import ReactWizard from 'react-bootstrap-wizard';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addNewQuestionnaire } from '../../store/actions/company';
import { removeError } from '../../store/actions/errors';
import { removeSuccess } from '../../store/actions/success';

// reactstrap components
import { Col } from 'reactstrap';

// wizard steps
import Step1 from './Sections/Step1.js';
import Step2 from './Sections/Step2.js';
import { isModifier } from 'typescript';
// import Step3 from './Sections/Step3.js';

var steps = [
	{
		stepName: 'Step1',
		stepIcon: 'nc-icon nc-single-02',
		component: Step1,
		stepProps: {
			levelData: 9,
		},
	},
	{
		stepName: 'Review',
		stepIcon: 'nc-icon nc-touch-id',
		component: Step2,
	},
];

function Wizard(props) {
	const history = useHistory();
	const dispatch = useDispatch();
	const errors = useSelector((state) => state.errors);
	const success = useSelector((state) => state.success);
	const currentUser = useSelector((state) => state.currentUser.user);
	const newQuestionnaire = useSelector((state) => state.newQuestionnaire);
	const finishButtonClick = (allStates) => {
		dispatch(
			addNewQuestionnaire(currentUser.company, currentUser.id, newQuestionnaire)
		);
		history.push('/admin/dashboard');
	};
	useEffect(() => {
		let removeS = setTimeout(() => dispatch(removeSuccess()), 3000);
		return () => {
			clearTimeout(removeS);
		};
	}, []);
	return (
		<>
			<div className='content'>
				{errors.message && <Alert severity='error'>{errors?.message}</Alert>}
				{success.message && (
					<Alert severity='success'>{success?.message}</Alert>
				)}
				<Col className='mr-auto ml-auto' md='12'>
					<ReactWizard
						steps={steps}
						navSteps
						validate
						title='Build Your Questionnaire'
						description='We help you to build your questionnaire step by step.'
						headerTextCenter
						finishButtonClasses='btn-wd'
						nextButtonClasses='btn-wd'
						finishButtonClick={finishButtonClick}
						finishButtonText='Submit'
						previousButtonClasses='btn-wd'
					/>
				</Col>
			</div>
		</>
	);
}

export default Wizard;
