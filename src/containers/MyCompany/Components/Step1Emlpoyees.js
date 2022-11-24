import React from 'react';
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
	const { levelData } = props;
	var count = 1;
	return (
		<>
			<div className='content'>
				<Row>
					<Col className='text-center' md='12'>
						<Card>
							<CardHeader>
								<CardText tag='div'>
									<CardTitle tag='h4'>
										List Of Employee of {levelData.Title}
									</CardTitle>
								</CardText>
							</CardHeader>
							<CardBody className='table-responsive'>
								<Table className='table-hover'>
									<thead className='text-warning'>
										<tr>
											<th>ID #</th>
											<th>Employee Names</th>
										</tr>
									</thead>
									<tbody>
										{levelData.Employees.map((data, index) => (
											<tr key={index}>
												<td>{count++}</td>
												<td>{data.firstName}</td>
											</tr>
										))}
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
