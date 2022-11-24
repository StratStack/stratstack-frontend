import React from 'react';
import QuestionList from './Sections/QuestionList';
import QuestionForms from './Sections/QuestionForms';

// reactstrap components
import { Card, Row, Col } from 'reactstrap';

function UserProfile(props) {
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
}

export default UserProfile;
