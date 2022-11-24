import React, { useState, useRef } from 'react';
import { fetchUser, editProfile } from '../../store/actions/user';
import { useSelector, useDispatch } from 'react-redux';
import { FaPhotoVideo } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import { editImage } from '../../store/actions/user';
import { removeError } from '../../store/actions/errors';
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

function CompanyProfile(props) {
	const dispatch = useDispatch();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [image, setImage] = useState('');
	const inputFile = useRef(null);
	const user = useSelector((state) => state.user);
	const currentUser = useSelector((state) => state.currentUser);
	const errors = useSelector((state) => state.errors);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(editProfile(currentUser.user.id, { email, firstName, lastName }));
		setFirstName('');
		setLastName('');
		setEmail('');
	};
	React.useEffect(() => {
		dispatch(fetchUser(currentUser.user.id));
	}, []);
	React.useEffect(() => {
		dispatch(removeError());
	}, []);

	//handeling images upload
	const handleClearInputFile = () => {
		inputFile.current.value = '';
		setImage('');
	};
	const handleImageSubmit = async (e) => {
		e.preventDefault();
		const id = currentUser.user.id;
		dispatch(editImage(id, image));
	};
	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};
	return (
		<>
			<div className='content'>
				<Row>
					<Col md='12'>
						<Card>
							<CardHeader>
								<h5 className='title'>Edit Profile</h5>
							</CardHeader>
							<CardBody>
								<form onSubmit={handleSubmit}>
									<Row>
										<Col className='pr-1' md='6'>
											<FormGroup>
												<label>First Name</label>
												<Input
													defaultValue={user.firstName}
													placeholder={user.firstName}
													onChange={(e) => {
														setFirstName(e.target.value);
													}}
													type='text'
												/>
											</FormGroup>
										</Col>
										<Col className='px-1' md='6'>
											<FormGroup>
												<label>Last Name</label>
												<Input
													defaultValue={user.lastName}
													placeholder={user.lastName}
													onChange={(e) => {
														setLastName(e.target.value);
													}}
													type='text'
												/>
											</FormGroup>
										</Col>
										<Col className='pl-1' md='12'>
											<FormGroup>
												<label htmlFor='exampleInputEmail1'>
													Email address
												</label>
												<Input
													placeholder={user.email}
													defaultValue={user.email}
													onChange={(e) => {
														setEmail(e.target.value);
													}}
													type='email'
												/>
											</FormGroup>
										</Col>
										<Col className='pl-1' md='6'>
											<Button color='primary' type='submit'>
												Submit
											</Button>
										</Col>
									</Row>
								</form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	);
}

export default CompanyProfile;
