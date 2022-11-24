import React, { useState } from 'react';
// javascript plugin used to create scrollbars on windows
import { useSelector, useDispatch } from 'react-redux';
import PerfectScrollbar from 'perfect-scrollbar';
import AuthNavbar from 'components/Navbars/AuthNavbar.js';
import { TextField } from '@material-ui/core';
import Footer from 'components/Footer/Footer.js';
import * as yup from 'yup';
import { useFormik } from 'formik';

import routes from 'routes.js';
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

var ps;

const schema = yup.object({
	firstName: yup.string().required('This a required field'),
	lastName: yup.string().required('This a required field'),
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
	code: yup
		.string('')
		.min(4, 'Building code must contain 4 characters')
		.required('This a required field'),
	unit: yup.string().required('This a required field'),
});

const CustomInput = ({ label, field, type = 'text', formik }) => {
	const handleChange = (e) => {
		formik.setFieldValue(field, e.target.value);
		formik.validateField(field);
	};
	const shouldDisable = field === 'code' ? true : false;
	return (
		<Input
			disabled={shouldDisable}
			type={type}
			error={formik.errors[field]}
			onChange={handleChange}
			onBlur={() => formik.validateField(field)}
			value={formik.values[field]}
			defaultValue={formik.values[field]}
			fullWidth
			label={label}
			helperText={formik.errors[field]}
		/>
	);
};

const inputValues = [
	{
		field: 'email',
		label: 'Email',
		type: 'email',
		initialValue: '',
		size: 'col-md-12',
	},
	{
		field: 'password',
		label: 'Password',
		type: 'password',
		initialValue: '',
		size: 'col-md-6',
	},
];

const formikInitialValues = Object.assign(
	{},
	...inputValues.map(({ field, initialValue }) => {
		return { [field]: initialValue };
	})
);

function Login(props) {
	const dispatch = useDispatch();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const formikInitialValues = Object.assign(
		{},
		...inputValues.map(({ field, initialValue }) => {
			return { [field]: initialValue };
		})
	);
	const formik = useFormik({
		initialValues: formikInitialValues,
		validationSchema: schema,
		validateOnBlur: false,
		validateOnChange: false,
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
	return (
		<>
			<AuthNavbar />
			<div className='wrapper wrapper-full-page' ref={fullPages}>
				<div className='full-page section-image'>
					<div className='login-page'>
						<Container>
							<Row>
								<Col className='ml-auto mr-auto' lg='4' md='6'>
									<Form onSubmit={handleSubmit} className='form'>
										<Card className='card-login'>
											<CardHeader>
												<CardHeader>
													<h3 className='header text-center'>Login</h3>
												</CardHeader>
											</CardHeader>
											<CardBody>
												<InputGroup>
													<InputGroupAddon addonType='prepend'>
														<InputGroupText>
															<i className='nc-icon nc-single-02' />
														</InputGroupText>
													</InputGroupAddon>
													<Input
														type='email'
														name='email'
														onChange={(e) => setUsername(e.target.value)}
														value={username}
														placeholder='Email'
														required
													/>
												</InputGroup>
												<InputGroup>
													<InputGroupAddon addonType='prepend'>
														<InputGroupText>
															<i className='nc-icon nc-key-25' />
														</InputGroupText>
													</InputGroupAddon>
													<Input
														type='password'
														name='password'
														autoComplete='off'
														onChange={(e) => setPassword(e.target.value)}
														value={password}
														placeholder='Password'
														required
													/>
												</InputGroup>
												<br />
												<FormGroup>
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
												</FormGroup>
											</CardBody>
											<CardFooter>
												<Button
													block
													className='btn-round mb-3'
													color='warning'
													href='#pablo'
													onClick={handleSubmit}>
													Get Started
												</Button>
											</CardFooter>
										</Card>
									</Form>
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
