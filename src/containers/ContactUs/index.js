import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import AuthNavbar from 'components/Navbars/AuthNavbar.js';
import Footer from 'components/Footer/Footer.js';
import { removeError } from '../../store/actions/errors';
import { postContact } from '../../store/actions/user';
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
	text: yup.string().required('This a required field'),
	fullName: yup.string().required('This a required field'),
	subject: yup.string().required('This a required field'),
	email: yup
		.string()
		.email('Enter a valid email')
		.required('This a required field'),
});
function ContactUs(props) {
	const dispatch = useDispatch();
	const [termChecked, setTermChecked] = useState(false);
	const formik = useFormik({
		initialValues: {
			text: '',
			subject: '',
			fullName: '',
			email: '',
		},
		validationSchema: schema,
		validateOnBlur: false,
		validateOnChange: true,
		onSubmit: async (evt) => {
			dispatch(postContact(evt));
		},
	});

	const handleSubmit = async (e) => {
		// e.preventDefault();
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
								<Col className='ml-auto mr-auto' lg='8' md='8'>
									<form
										onSubmit={handleSubmit}
										autoComplete='off'
										className='form'>
										<Card className='card-login'>
											<CardHeader>
												<CardHeader>
													<h3 className='header text-center'>Contact Us</h3>
												</CardHeader>
											</CardHeader>

											<CardBody>
												{/* {props.errors.message && (
													<Alert severity='error'>
														{props.errors?.message}
													</Alert>
												)} */}
												<div className='row'>
													<div className='col-12 mb-2 col-md-12'>
														<FormControl fullWidth={true}>
															<TextField
																type='text'
																error={formik.errors.fullName}
																onChange={(e) => {
																	formik.setFieldValue(
																		'fullName',
																		e.target.value
																	);
																	// formik.validateField('firstName');
																}}
																onBlur={() => formik.validateField('fullName')}
																value={formik.values.fullName}
																defaultValue={formik.values.fullName}
																fullWidth
																label='First Name'
																helperText={formik.errors.fullName}
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
																error={formik.errors.subject}
																onChange={(e) => {
																	formik.setFieldValue(
																		'subject',
																		e.target.value
																	);
																	// formik.validateField('subject');
																}}
																onBlur={() => formik.validateField('subject')}
																value={formik.values.subject}
																defaultValue={formik.values.subject}
																fullWidth
																label='Company Name'
																helperText={formik.errors.subject}
															/>
														</FormControl>
													</div>

													<div className='col-12 mb-2 mt-4 col-md-12'>
														<FormControl fullWidth={true}>
															<Input
																type='textarea'
																row='4'
																error={formik.errors.text}
																onChange={(e) => {
																	formik.setFieldValue('text', e.target.value);
																	// formik.validateField('lastName');
																}}
																onBlur={() => formik.validateField('text')}
																value={formik.values.text}
																defaultValue={formik.values.text}
																fullWidth
																placeholder='Your Message'
																helperText={formik.errors.text}
															/>
														</FormControl>
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
														Send
													</Button>
												</CardFooter>
											</CardBody>
										</Card>
									</form>
								</Col>
							</Row>
						</Container>
						<div
							className='full-page-background'
							style={{
								backgroundImage: `url(${
									require('assets/img/bg/rawpixel-com.jpg').default
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

export default ContactUs;
