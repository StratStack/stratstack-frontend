import React, { useState, useEffect } from 'react';
//actions and states
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchDepartment,
	addEmployeesToQuestionnaire,
} from '../../../store/actions/company';
// reactstrap components
import {
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	CardText,
	Table,
	Row,
	Col,
} from 'reactstrap';

function Widgets(props) {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.currentUser.user);
	const companyDepartments = useSelector((state) => state.companyDepartments);
	const [department, setDepartment] = React.useState({});
	const [employee, setEmployee] = React.useState();
	let count = 1;
	const { employees, employeeIds } = props;
	const dispatchEmployees = (employees) => {
		return dispatch(addEmployeesToQuestionnaire(employees));
	};
	// useEffect(() => {
	// 	let { employees } = props;
	// 	let employeeIds = employees.map((employee) => {
	// 		return employee._id;
	// 	});
	// 	dispatch(addEmployeesToQuestionnaire(employeeIds));
	// }, []);
	return (
		<>
			<div className='content'>
				<Row>
					<Col className='text-center' md='12'>
						<Card>
							<CardHeader>
								<CardHeader>
									<CardTitle tag='h4'>List of Employees</CardTitle>
								</CardHeader>
							</CardHeader>
							<CardBody className='table-responsive'>
								<Table className='table-hover'>
									<thead className='text-warning'>
										<tr>
											<th>ID #</th>
											<th>Employee Name</th>
										</tr>
									</thead>
									<tbody>
										{!employees ? (
											<>
												<tr>
													<td>{count++}</td>
													<td>not defined</td>
												</tr>
											</>
										) : (
											<>
												{employees.map((employee) => {
													return (
														<tr>
															<td>{count++}</td>
															<td>
																{employee.firstName} {employee.lastName}
															</td>
														</tr>
													);
												})}
											</>
										)}
									</tbody>
								</Table>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	);
}

export default Widgets;
