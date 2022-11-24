import React, { useState, useRef, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import { fetchUser, editProfile } from '../../store/actions/user';
import { useSelector, useDispatch } from 'react-redux';
import { FaPhotoVideo } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import { editImage } from '../../store/actions/user';
import { removeSuccess } from '../../store/actions/success';
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

function UserProfile() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
	const [email, setEmail] = useState(user.email);
	const [image, setImage] = useState('');
	const inputFile = useRef(null);

	const currentUser = useSelector((state) => state.currentUser);
	const errors = useSelector((state) => state.errors);
	const success = useSelector((state) => state.success);

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
	useEffect(() => {
		let removeS = setTimeout(() => dispatch(removeSuccess()), 3000);
		return () => {
			clearTimeout(removeS);
		};
	}, []);
	return (
		<>
			<div className='content'>
				{errors.message && <Alert severity='error'>{errors?.message}</Alert>}
				{success.message && (
					<Alert severity='success'>{success?.message}</Alert>
				)}
				<Row>
					<Col md='4'>
						<Card className='card-user'>
							<div className='image'>
								<img
									alt='...'
									src={require('assets/img/bg/damir-bosnjak.jpg').default}
								/>
							</div>
							<CardBody>
								<div className='author'>
									{/* <a href='#pablo' onClick={(e) => e.preventDefault()}> */}
									<div
										className='post-preview'
										// onClick={handleClearInputFile}
									>
										<img
											className='avatar border-gray'
											src={user.image}
											alt='preview'
										/>
										{/* =================================================================== */}
										<Col>
											<Button
												type='button'
												color='primary'
												// round
												// justIcon
												onClick={() => inputFile.current.click()}>
												<FaPhotoVideo />
											</Button>
											<form>
												<input
													ref={inputFile}
													type='file'
													multiple
													style={{ display: 'none' }}
													onChange={handleImageChange}
												/>
												{image ? (
													<div
														className='post-preview'
														onClick={handleClearInputFile}>
														<img
															src={URL.createObjectURL(image)}
															alt='preview'
														/>
														<BsTrash />
														<Button
															type='submit'
															color='primary'
															onClick={handleImageSubmit}>
															Submit
														</Button>
													</div>
												) : (
													<></>
												)}
											</form>
										</Col>
										{/* =================================================================================== */}
									</div>
									<h5 className='title'>
										{user.firstName} {user.lastName}
									</h5>
									{/* </a> */}
									<p className='description'>{user.email}</p>
								</div>
							</CardBody>
							<CardFooter>
								<hr />
								<div className='button-container'></div>
							</CardFooter>
						</Card>
					</Col>
					<Col md='8'>
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
													required
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
													required
												/>
											</FormGroup>
										</Col>
										<Col className='pl-1' md='12'>
											<FormGroup>
												<label htmlFor='exampleInputEmail1'>
													Email address (email can't be changed)
												</label>
												<Input
													placeholder={user.email}
													defaultValue={user.email}
													onChange={(e) => {
														setEmail(e.target.value);
													}}
													type='email'
													disabled
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

export default UserProfile;
