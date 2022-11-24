import React from 'react';

import QuestionList from '../Sections/QuestionList';
import QuestionForms from '../Sections/QuestionForms';
import classnames from 'classnames';

// reactstrap components
import { Row, Col, Card } from 'reactstrap';

const Step2 = React.forwardRef((props, ref) => {
	React.useImperativeHandle(ref, () => ({
		isValidated: undefined,
		state: undefined,
	}));
	return (
		<>
			<div className='content'>
				<Row>
					<Col md='4'>
						<Card>
							<QuestionList />
						</Card>
					</Col>
					<Col md='8'>
						<Card>
							<QuestionForms {...props} />
						</Card>
					</Col>
				</Row>
			</div>
		</>
	);
});

export default Step2;
