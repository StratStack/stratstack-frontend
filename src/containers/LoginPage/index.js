import React, { useState } from 'react';
// javascript plugin used to create scrollbars on windows
import Alert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import AuthNavbar from 'components/Navbars/AuthNavbar.js';
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
	email: yup
		.string()
		.email('Enter a valid email')
		.required('This a required field'),
	password: yup
		.string('')
		.min(8, 'Password must contain at least 8 characters')
		.required('Enter your password'),
});

// const CustomInput = ({ label, field, type = 'text', formik }) => {
// 	const handleChange = (e) => {
// 		formik.setFieldValue(field, e.target.value);
// 		formik.validateField(field);
// 	};
// 	const shouldDisable = field === 'code' ? true : false;
// 	return (
// 		<TextField
// 			disabled={shouldDisable}
// 			type={type}
// 			error={formik.errors[field]}
// 			onChange={handleChange}
// 			onBlur={() => formik.validateField(field)}
// 			value={formik.values[field]}
// 			// defaultValue={formik.values[field]}
// 			label={label}
// 			helperText={formik.errors[field]}
// 		/>
// 	);
// };

function Login(props) {
	const dispatch = useDispatch();
	const [termChecked, setTermChecked] = useState(false);
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
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
													<h3 className='header'>Login</h3>
												</CardHeader>
											</CardHeader>
											<CardBody>
												{props.errors.message && (
													<Alert severity='error'>
														{props.errors?.message}
													</Alert>
												)}
												<div className='row'>
													<div className='col-12 mb-2 col-md-12'>
														<FormControl fullWidth={true}>
															<TextField
																type='text'
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
													<br />
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
												</div>
											</CardBody>

											<CardFooter>
												<Button
													color='primary'
													disabled={formik.isSubmitting}
													type='submit'
													style={{ width: '100%' }}>
													Sign In
												</Button>
												<Link to='/forgot'>I forgot my password!</Link>
											</CardFooter>
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

export default Login;
