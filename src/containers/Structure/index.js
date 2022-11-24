import React, { useState, useRef } from 'react';
import { createStructure } from '../../store/actions/structure';
import { useSelector, useDispatch } from 'react-redux';
import { FaPhotoVideo } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import { editImage } from '../../store/actions/user';
// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	FormControl,
	TextField,
	CardTitle,
	FormGroup,
	Form,
	Input,
	Row,
	Col,
} from 'reactstrap';

function CreatingStructures(props) {
	const dispatch = useDispatch();
	const [structureName, setStructureName] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createStructure(structureName));
	};
	return (
		<>
			<div className='content'>
				<Row>
					<Col md='8'>
						<Card>
							<CardHeader>
								<h5 className='title'>create the structure</h5>
							</CardHeader>
							<CardBody>
								<form
									onSubmit={handleSubmit}
									autoComplete='off'
									className='form'>
									<Card className='card-login'>
										<CardHeader></CardHeader>
										<CardBody>
											<Row>
												<Col md='6'>
													<Input
														type='text'
														placeholder='enter the text'
														onChange={(e) => setStructureName(e.target.value)}
														value={structureName}
													/>
												</Col>
											</Row>
											<br />
											<CardFooter>
												<Button
													color='primary'
													type='submit'
													style={{ width: '100%' }}>
													Sign In
												</Button>
											</CardFooter>
										</CardBody>
									</Card>
								</form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	);
}

export default CreatingStructures;
