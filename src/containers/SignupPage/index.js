import React, { useState } from 'react';
// javascript plugin used to create scrollbars on windows
import Alert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import AuthNavbar from 'components/Navbars/AuthNavbar.js';
import Select from 'react-select';
import Footer from 'components/Footer/Footer.js';
import { removeError } from '../../store/actions/errors';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
	FormControl,
	FormControlLabel,
	TextField,
	Checkbox,
} from '@material-ui/core';
// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Label,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Col,
	Row,
} from 'reactstrap';
import reactDom from 'react-dom';

var ps;

const schema = yup.object({
	firstName: yup.string().required('This a required field'),
	lastName: yup.string().required('This a required field'),
	companyName: yup.string().required('This a required field'),
	email: yup
		.string()
		.email('Enter a valid email')
		.required('This a required field'),
	password: yup
		.string('')
		.min(8, 'Password must contain at least 8 characters')
		.required('Enter your password'),
	confirmPassword: yup
		.string('Enter your password')
		.required('Confirm your password')
		.oneOf([yup.ref('password')], 'Password does not match'),
});
function Signup(props) {
	const dispatch = useDispatch();
	const [termChecked, setTermChecked] = useState(false);
	const [singleSelect, setSingleSelect] = React.useState(null);
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			companyName: '',
			confirmPassword: '',
			structure: '',
		},
		validationSchema: schema,
		validateOnBlur: false,
		validateOnChange: true,
		onSubmit: async (evt) => {
			dispatch(props.onAuth(evt));
		},
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const isValid = await formik.validateForm();
		if (!Object.keys(isValid).length) {
			formik.handleSubmit();
		}
	};
	// MATERIAL KIT AUTH LAYOUT CODE
	const fullPages = React.useRef();
	React.useEffect(() => {
		if (navigator.platform.indexOf('Win') > -1) {
			ps = new PerfectScrollbar(fullPages.current);
		}
		return function cleanup() {
			if (navigator.platform.indexOf('Win') > -1) {
				ps.destroy();
			}
		};
	});
	React.useEffect(() => {
		document.body.classList.toggle('login-page');
		return function cleanup() {
			document.body.classList.toggle('login-page');
		};
	});
	React.useEffect(() => {
		dispatch(removeError());
	}, []);
	return (
		<>
			<AuthNavbar />
			<div className='wrapper wrapper-full-page' ref={fullPages}>
				<div className='full-page section-image'>
					<div className='login-page'>
						<Container>
							<Row>
								<Col className='ml-auto mr-auto' lg='4' md='6'>
									<form
										onSubmit={handleSubmit}
										autoComplete='off'
										className='form'>
										<Card className='card-login'>
											<CardHeader>
												<CardHeader>
													<h3 className='header text-center'>Register</h3>
												</CardHeader>
											</CardHeader>

											<CardBody>
												{props.errors.message && (
													<Alert severity='error'>
														{props.errors?.message}
													</Alert>
												)}
												<div className='row'>
													<div className='col-6 mb-2 col-md-6'>
														<FormControl fullWidth={true}>
															<TextField
																type='text'
																error={formik.errors.firstName}
																onChange={(e) => {
																	formik.setFieldValue(
																		'firstName',
																		e.target.value
																	);
																	// formik.validateField('firstName');
																}}
																onBlur={() => formik.validateField('firstName')}
																value={formik.values.firstName}
																defaultValue={formik.values.firstName}
																fullWidth
																label='First Name'
																helperText={formik.errors.firstName}
															/>
														</FormControl>
													</div>
													<div className='col-6 mb-2 col-md-6'>
														<FormControl fullWidth={true}>
															<TextField
																type='text'
																error={formik.errors.lastName}
																onChange={(e) => {
																	formik.setFieldValue(
																		'lastName',
																		e.target.value
																	);
																	// formik.validateField('lastName');
																}}
																onBlur={() => formik.validateField('lastName')}
																value={formik.values.lastName}
																defaultValue={formik.values.lastName}
																fullWidth
																label='Last Name'
																helperText={formik.errors.lastName}
															/>
														</FormControl>
													</div>
													<div className='col-12 mb-2 col-md-12'>
														<FormControl fullWidth={true}>
															<TextField
																type='email'
																error={formik.errors.email}
																onChange={(e) => {
																	formik.setFieldValue('email', e.target.value);
																	// formik.validateField('email');
																}}
																onBlur={() => formik.validateField('email')}
																value={formik.values.email}
																defaultValue={formik.values.email}
																fullWidth
																label='Email'
																helperText={formik.errors.email}
															/>
														</FormControl>
													</div>
													<div className='col-12 mb-2 col-md-12'>
														<FormControl fullWidth={true}>
															<TextField
																type='text'
																error={formik.errors.companyName}
																onChange={(e) => {
																	formik.setFieldValue(
																		'companyName',
																		e.target.value
																	);
																	// formik.validateField('companyName');
																}}
																onBlur={() =>
																	formik.validateField('companyName')
																}
																value={formik.values.companyName}
																defaultValue={formik.values.companyName}
																fullWidth
																label='Company Name'
																helperText={formik.errors.companyName}
															/>
														</FormControl>
													</div>
													<div className='col-12 mb-2 mt-4 col-md-12'>
														<Select
															className='react-select primary'
															classNamePrefix='react-select'
															name='singleSelect'
															value={singleSelect}
															onChange={(value) => {
																setSingleSelect(value);
																formik.setFieldValue('structure', value.label);
															}}
															options={[
																{
																	value: '',
																	label: 'Single Option',
																	isDisabled: true,
																},
																{ value: '2', label: 'Organizational' },
																{
																	value: '3',
																	label: 'Competitive',
																	isDisabled: true,
																},
																{
																	value: '4',
																	label: 'Functional',
																	isDisabled: true,
																},
																{
																	value: '5',
																	label: 'Operating',
																	isDisabled: true,
																},
															]}
															placeholder='Single Select'
														/>
													</div>
													<div className='col-12 mb-2 col-md-12'>
														<FormControl fullWidth={true}>
															<TextField
																type='password'
																error={formik.errors.password}
																onChange={(e) => {
																	formik.setFieldValue(
																		'password',
																		e.target.value
																	);
																	// formik.validateField('lastName');
																}}
																onBlur={() => formik.validateField('password')}
																value={formik.values.password}
																defaultValue={formik.values.password}
																fullWidth
																label='Password'
																helperText={formik.errors.password}
															/>
														</FormControl>
													</div>
													<div className='col-12 mb-2 col-md-12'>
														<FormControl fullWidth={true}>
															<TextField
																type='password'
																error={formik.errors.confirmPassword}
																onChange={(e) => {
																	formik.setFieldValue(
																		'confirmPassword',
																		e.target.value
																	);
																	// formik.validateField('lastName');
																}}
																onBlur={() =>
																	formik.validateField('confirmPassword')
																}
																value={formik.values.confirmPassword}
																defaultValue={formik.values.confirmPassword}
																fullWidth
																label='Confirm Your Password'
																helperText={formik.errors.confirmPassword}
															/>
														</FormControl>
													</div>
													<div className='col-12 mt-2 mb-2'>
														<FormControlLabel
															control={
																<Checkbox
																	checked={termChecked}
																	onChange={() => setTermChecked(!termChecked)}
																	required={true}
																/>
															}
															label={
																<>
																	By clicking this, you agree to our{' '}
																	<Link to='/terms'>Terms</Link> and{' '}
																	<Link to='/privacy'>Privacy Policy</Link>
																</>
															}
														/>
													</div>
												</div>

												{/* {inputValues.map((input, key) => (
													<InputGroup key={key}>
														<CustomInput
															label={input.label}
															field={input.field}
															type={input.type}
															formik={formik}
														/>
													</InputGroup>
												))} */}
												<br />
												<CardFooter>
													<Button
														color='primary'
														disabled={formik.isSubmitting}
														type='submit'
														style={{ width: '100%' }}>
														Sign In
													</Button>
												</CardFooter>
												{/* <FormGroup>
													<FormGroup check>
														<Label check>
															<Input
																defaultChecked
																defaultValue=''
																type='checkbox'
															/>
															<span className='form-check-sign' />
															Subscribe to newsletter
														</Label>
													</FormGroup>
												</FormGroup> */}
											</CardBody>
											{/* <CardFooter>
												<Button
													color='primary'
													disabled={formik.isSubmitting}
													type='submit'
													style={{ width: '100%' }}>
													Sign up
												</Button>
											</CardFooter> */}
										</Card>
									</form>
								</Col>
							</Row>
						</Container>
						<div
							className='full-page-background'
							style={{
								backgroundImage: `url(${
									require('assets/img/bg/fabio-mangione.jpg').default
								})`,
							}}
						/>
					</div>
					<Footer fluid />
				</div>
			</div>
		</>
	);
}

export default Signup;
