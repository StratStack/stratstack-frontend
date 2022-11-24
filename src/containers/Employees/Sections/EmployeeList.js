import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../../../store/actions/employees';

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

function EmployeeList() {
	const dispatch = useDispatch();
	const errors = useSelector((state) => state.errors);
	const employees = useSelector((state) => state.employees);
	const currentUser = useSelector((state) => state.currentUser.user);
	useEffect(() => {
		dispatch(fetchEmployees(currentUser.company));
	}, []);
	return (
		<>
			<CardHeader>
				<CardTitle tag='h4'>Companies employee</CardTitle>
			</CardHeader>
			<CardBody>
				<ul className='list-unstyled team-members'>
					{employees.map((employee) => (
						<li key={employee.id}>
							<Row>
								<Col md='2' xs='2'>
									<div className='avatar'>
										<img
											alt='...'
											className='img-circle img-no-padding img-responsive'
											src={employee.image}
										/>
									</div>
								</Col>
								<Col md='7' xs='7'>
									{employee.firstName} {employee.lastName} <br />
									<span className='text-muted'>
										<small>{employee.department.name}</small>
									</span>
								</Col>
								<Col className='text-right' md='3' xs='3'>
									{/* <Button
										className='btn-round btn-icon'
										color='success'
										outline
										size='sm'>
										<i className='fa fa-envelope' />
									</Button> */}
								</Col>
							</Row>
						</li>
					))}
				</ul>
			</CardBody>
		</>
	);
}

export default EmployeeList;
