import React from 'react';

// reactstrap components
import {
	Badge,
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	CardTitle,
	Label,
	FormGroup,
	Input,
	Table,
	Row,
	Col,
	UncontrolledTooltip,
} from 'reactstrap';

function Widgets(props) {
	const { questions } = props;
	let count = 1;
	return (
		<>
			<div className='content'>
				<Row>
					<Col className='text-center' md='12'>
						<Card className='card-tasks'>
							<CardHeader>
								<CardTitle tag='h4'>List of Questions</CardTitle>
							</CardHeader>
							<CardBody>
								<div className='table-full-width table-responsive'>
									<Table>
										<thead className='text-warning'>
											<tr>
												<th>Count #</th>
												<th>Question</th>
											</tr>
										</thead>
										<tbody>
											{!questions ? (
												<>
													<td>
														<FormGroup check>
															{/* <Label check>
																<Input defaultChecked type='checkbox' />
																<span className='form-check-sign' />
															</Label> */}
														</FormGroup>
													</td>

													<td className='text-left'>
														Question 1: Some text??????????????????????
													</td>
												</>
											) : (
												<>
													{questions.map((q) => {
														return (
															<tr key={q._id}>
																<td className='text-left'>
																	<strong>Question {count++}: </strong>{' '}
																	{/* {q.question} */}
																	{q.question}
																</td>
															</tr>
														);
													})}
												</>
											)}

											{/* <td className='td-actions text-right'>
													<Button
														className='btn-round btn-icon btn-icon-mini btn-neutral'
														color='info'
														id='tooltip42906017'
														title=''
														type='button'>
														<i className='nc-icon nc-ruler-pencil' />
													</Button>
													<UncontrolledTooltip
														delay={0}
														target='tooltip42906017'>
														Edit Task
													</UncontrolledTooltip>
													<Button
														className='btn-round btn-icon btn-icon-mini btn-neutral'
														color='danger'
														id='tooltip570363224'
														title=''
														type='button'>
														<i className='nc-icon nc-simple-remove' />
													</Button>
													<UncontrolledTooltip
														delay={0}
														target='tooltip570363224'>
														Remove
													</UncontrolledTooltip>
												</td> */}
										</tbody>
									</Table>
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	);
}

export default Widgets;
