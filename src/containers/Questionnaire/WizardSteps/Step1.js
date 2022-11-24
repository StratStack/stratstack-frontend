import React, { useEffect } from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
// reactstrap components
import {
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Row,
	Col,
} from 'reactstrap';

// core components
const Step1 = React.forwardRef((props, ref) => {
	const dispatch = useDispatch();
	const [title, setTitle] = React.useState('');
	const [department, setDepartment] = React.useState('');
	const [titleState, setTitleState] = React.useState('');
	const [departmentState, setDepartmentState] = React.useState('');
	const [titleFocus, setTitleFocus] = React.useState('');
	const [departmentFocus, setDepartmentFocus] = React.useState('');
	React.useImperativeHandle(ref, () => ({
		isValidated: () => {
			return isValidated();
		},
		state: {
			title,
			department: department.label,
			titleState,
			departmentState,
		},
	}));
	// function that returns true if value is email, false otherwise
	const verifyEmail = (value) => {
		var emailRex =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (emailRex.test(value)) {
			return true;
		}
		return false;
	};
	// function that verifies if a string has a given length or not
	const verifyLength = (value, length) => {
		if (value.length >= length) {
			return true;
		}
		return false;
	};
	const isValidated = () => {
		if (titleState === 'has-success' && departmentState === 'has-success') {
			return true;
		} else {
			if (titleState !== 'has-success') {
				setTitleState('has-danger');
			}
			if (departmentState !== 'has-success') {
				setDepartmentState('has-danger');
			}
			return false;
		}
	};

	return (
		<>
			<h5 className='info-text'>Let's start with the basic information</h5>
			<Row className='justify-content-center'>
				<Col sm='6'>
					<InputGroup
						className={classnames(titleState, {
							'input-group-focus': titleFocus,
						})}>
						<Input
							name='title'
							placeholder='Choose a title'
							type='text'
							onChange={(e) => {
								if (!verifyLength(e.target.value, 1)) {
									setTitleState('has-danger');
								} else {
									setTitleState('has-success');
								}
								setTitle(e.target.value);
							}}
							onFocus={(e) => setTitleFocus(true)}
							onBlur={(e) => setTitleFocus(false)}
						/>
						{titleState === 'has-danger' ? (
							<label className='error'>This field is required.</label>
						) : null}
					</InputGroup>
					<Select
						name='department'
						value={department}
						onChange={(e) => {
							if (!verifyLength(e.label, 1)) {
								setDepartmentState('has-danger');
							} else {
								setDepartmentState('has-success');
							}
							setDepartment(e);
						}}
						// onChange={(value) => setSingleSelect(value)}
						options={[
							{
								value: '',
								label: 'Single Option',
								isDisabled: true,
							},
							{
								value: '',
								label: 'Corporate',
							},
							{ value: '2', label: 'Direct Report' },
							{ value: '3', label: 'No Report' },
						]}
						onFocus={(e) => setDepartmentFocus(true)}
						onBlur={(e) => setDepartmentFocus(false)}
						// placeholder='Single Select'
					/>
					{departmentState === 'has-danger' ? (
						<label className='error'>This field is required.</label>
					) : null}
				</Col>
			</Row>
		</>
	);
});

export default Step1;
