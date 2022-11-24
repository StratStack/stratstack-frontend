import React, { useState, useEffect } from 'react';
// javascript plugin used to create scrollbars on windows
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { registerEmployee } from '../../../store/actions/employees';
import { removeError } from '../../../store/actions/errors';
import { removeSuccess } from 'store/actions/success';
import Select from 'react-select';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
	FormControl,
	FormControlLabel,
	TextField,
	Checkbox,
} from '@material-ui/core';
// reactstrap components
import { Button, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';

var ps;

const schema = yup.object({
	firstName: yup.string().required('This a required field'),
	lastName: yup.string().required('This a required field'),
	department: yup.string().required('This a required field'),
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

function EmployeeForms(props) {
	const dispatch = useDispatch();
	const errors = useSelector((state) => state.errors);
	const success = useSelector((state) => state.success);
	const currentUser = useSelector((state) => state.currentUser.user);
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			thedepartment: '',
			department: '',
		},
		validationSchema: schema,
		validateOnBlur: false,
		validateOnChange: true,
		onSubmit: async (evt) => {
			dispatch(registerEmployee(currentUser.company, evt));
		},
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(registerEmployee(currentUser.company, formik.values));
		formik.setFieldValue('firstName', '');
		formik.setFieldValue('lastName', '');
		formik.setFieldValue('email', '');
		formik.setFieldValue('password', '');
		formik.setFieldValue('department', '');
		formik.setFieldValue('thedepartment', '');
	};
	useEffect(() => {
		let removeS = setTimeout(() => dispatch(removeSuccess()), 5000);
		return () => {
			clearTimeout(removeS);
		};
	}, [formik.values]);
	return (
		<>
			<CardBody>
				<form onSubmit={handleSubmit} autoComplete='off' className='form'>
					<Card className='card-login'>
						<CardHeader>
							<CardHeader>
								<h3 className='header text-center'>Register Employee</h3>
							</CardHeader>
						</CardHeader>
						<CardBody>
							{errors.message && (
								<Alert severity='error'>{errors?.message}</Alert>
							)}
							{success.message && (
								<Alert severity='success'>{success?.message}</Alert>
							)}
							<div className='row'>
								<div className='col-6 mb-2 col-md-6'>
									<FormControl fullWidth={true}>
										<TextField
											type='text'
											// error={formik.errors.firstName}
											onChange={(e) => {
												formik.setFieldValue('firstName', e.target.value);
												// formik.validateField('firstName');
											}}
											// onBlur={() => formik.validateField('firstName')}
											value={formik.values.firstName}
											// defaultValue={formik.values.firstName}
											fullWidth
											label='First Name'
											// helperText={formik.errors.firstName}
										/>
									</FormControl>
								</div>
								<div className='col-6 mb-2 col-md-6'>
									<FormControl fullWidth={true}>
										<TextField
											type='text'
											// error={formik.errors.lastName}
											onChange={(e) => {
												formik.setFieldValue('lastName', e.target.value);
												// formik.validateField('lastName');
											}}
											// onBlur={() => formik.validateField('lastName')}
											value={formik.values.lastName}
											// defaultValue={formik.values.lastName}
											fullWidth
											label='Last Name'
											// helperText={formik.errors.lastName}
										/>
									</FormControl>
								</div>
								<div className='col-12 mb-5 col-md-12'>
									<FormControl fullWidth={true}>
										<TextField
											type='email'
											// error={formik.errors.email}
											onChange={(e) => {
												formik.setFieldValue('email', e.target.value);
												// formik.validateField('email');
											}}
											onBlur={() => formik.validateField('email')}
											value={formik.values.email}
											// defaultValue={formik.values.email}
											fullWidth
											label='Email'
											helperText={formik.errors.email}
										/>
									</FormControl>
								</div>
								<div className='col-12 mb-2 col-md-12'>
									<FormControl fullWidth={true}>
										<Select
											className='react-select primary'
											classNamePrefix='react-select'
											name='thedepartment'
											value={formik.values.thedepartment}
											onChange={(e) => {
												formik.setFieldValue('thedepartment', e);
												formik.setFieldValue('department', e.label);
												// formik.validateField('email');
											}}
											options={[
												{
													value: '',
													label: 'Single Option',
													isDisabled: true,
												},
												{ value: '2', label: 'Corporate' },
												{ value: '3', label: 'Direct Report' },
												{ value: '3', label: 'No Report' },
											]}
											placeholder='Select the level of access'
										/>
									</FormControl>
								</div>
								<div className='col-12 mb-2 col-md-12'>
									<FormControl fullWidth={true}>
										<TextField
											type='password'
											// error={formik.errors.password}
											onChange={(e) => {
												formik.setFieldValue('password', e.target.value);
												// formik.validateField('lastName');
											}}
											onBlur={() => formik.validateField('password')}
											value={formik.values.password}
											// defaultValue={formik.values.password}
											fullWidth
											label='Password'
											helperText={formik.errors.password}
										/>
									</FormControl>
								</div>
							</div>
							<br />
							<CardFooter>
								<Button
									color='primary'
									disabled={formik.isSubmitting}
									type='submit'
									style={{ width: '100%' }}>
									Register
								</Button>
							</CardFooter>
						</CardBody>
					</Card>
				</form>
			</CardBody>
		</>
	);
}

export default EmployeeForms;
