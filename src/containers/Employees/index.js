import React from 'react';
import EmployeeList from './Sections/EmployeeList';
import EmployeeForms from './Sections/EmployeeForms';

// reactstrap components
import { Button, Card, Row, Col } from 'reactstrap';

function UserProfile(props) {
	return (
		<>
			<div className='content'>
				<Row>
					<Col md='4'>
						<Card>
							<EmployeeList />
						</Card>
					</Col>
					<Col md='8'>
						<Card>
							<EmployeeForms {...props} />
						</Card>
					</Col>
				</Row>
			</div>
		</>
	);
}

export default UserProfile;
