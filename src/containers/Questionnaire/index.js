import React, { useEffect } from 'react';
// react plugin used to create a form with multiple steps
import Alert from '@material-ui/lab/Alert';
import ReactWizard from 'react-bootstrap-wizard';
import { useHistory } from 'react-router-dom';
// reactstrap components
import { Col } from 'reactstrap';

// wizard steps
import Step1 from './WizardSteps/Step1.js';
import Step2 from './WizardSteps/Step2.js';
import Step3 from './WizardSteps/Step3.js';

//dealing with State and rendering the filled information
import { useDispatch, useSelector } from 'react-redux';
import { addQuestionnaire } from '../../store/actions/questions';
import { removeSuccess } from 'store/actions/success';
import { removeError } from 'store/actions/errors.js';

var steps = [
	{
		stepName: 'Start',
		stepIcon: 'nc-icon nc-single-02',
		component: Step1,
	},
	{
		stepName: 'Questionnaire',
		stepIcon: 'nc-icon nc-touch-id',
		component: Step2,
	},
	{
		stepName: 'Review',
		stepIcon: 'nc-icon nc-pin-3',
		component: Step3,
	},
];

function Wizard(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const errors = useSelector((state) => state.errors);
	const success = useSelector((state) => state.success);
	const currentUser = useSelector((state) => state.currentUser);
	const finishButtonClick = (allStates) => {
		dispatch(
			addQuestionnaire(
				currentUser.user.company,
				currentUser.user.id,
				allStates.Review
			)
		);
		history.push('/admin/questionnaire');
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
				<Col className='mr-auto ml-auto' md='10'>
					{errors.message && <Alert severity='error'>{errors?.message}</Alert>}
					{success.message && (
						<Alert severity='success'>{success?.message}</Alert>
					)}
					<ReactWizard
						steps={steps}
						navSteps
						validate
						title='Build a Questionnaire'
						description='Using this menu you can create a questionnaire for any specific department and save it for future'
						headerTextCenter
						finishButtonClasses='btn-wd'
						nextButtonClasses='btn-wd'
						previousButtonClasses='btn-wd'
						finishButtonClick={finishButtonClick}
						finishButtonText='Submit'
					/>
				</Col>
			</div>
		</>
	);
}

export default Wizard;
