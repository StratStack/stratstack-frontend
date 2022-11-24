import React, { useEffect } from 'react';
import Select from 'react-select';

//actions and states
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartment } from '../../../store/actions/company';
import { setSelectedDepartment } from '../../../store/actions/company';
// import { fetchDepartment } from '../../../store/actions/company';

// reactstrap components
import { Row, Col } from 'reactstrap';
import { FaRocketchat } from 'react-icons/fa';
import currentUser from 'store/reducers/currentUser';

const Step1 = React.forwardRef((props, ref) => {
	const dispatch = useDispatch();
	const [departmentName, setDepartmentName] = React.useState({});
	const [departmentState, setDepartmentState] = React.useState();
	const [departmentFocus, setDepartmentFocus] = React.useState();
	// const newQuestionnaire = useSelector((state) => state.newQuestionnaire);
	React.useImperativeHandle(ref, () => ({
		isValidated: () => {
			return isValidated();
		},
		state: {
			departmentName,
			departmentState,
			departmentFocus,
		},
	}));
	// function that verifies if a string has a given length or not
	const verifyLength = (value, length) => {
		if (value.length >= length) {
			return true;
		}
		return false;
	};

	const isValidated = () => {
		if (departmentState === 'has-success') {
			return true;
		} else {
			if (departmentState !== 'has-success') {
				setDepartmentState('has-danger');
			}
			return false;
		}
	};
	return (
		<>
			<h5 className='info-text'>
				Let's start: What department do you want to submit the questions to for
				this quarter.
			</h5>
			<Row className='justify-content-center'>
				<Col sm='6'>
					<Select
						className='react-select primary'
						classNamePrefix='react-select'
						name='department'
						value={departmentName}
						// placeholder='Select a Department'
						onChange={(e) => {
							if (!verifyLength(e.label, 1)) {
								setDepartmentState('has-danger');
							} else {
								setDepartmentState('has-success');
							}
							if (e.value == 2) {
								dispatch(setSelectedDepartment('Corporate', 0));
							} else if (e.value == 3) {
								dispatch(setSelectedDepartment('Direct Report', 1));
							} else if (e.value == 4) {
								dispatch(setSelectedDepartment('No Report', 2));
							} else {
								dispatch(setSelectedDepartment('', null));
							}
							setDepartmentName(e);
						}}
						// onChange={(value) => setSingleSelect(value)}
						options={[
							{
								value: '',
								label: 'Single Option',
								isDisabled: true,
							},
							{ value: '2', label: 'Corporate' },
							{ value: '3', label: 'Direct Report' },
							{ value: '4', label: 'No Report' },
						]}
						onFocus={(e) => setDepartmentFocus(true)}
						onBlur={(e) => setDepartmentFocus(false)}
						// placeholder='Single Select'
					/>
					{/* {levelData ? <CardComponent levelData={levelData} /> : <p></p>} */}
					{departmentState === 'has-danger' ? (
						<label className='error'>This field is required.</label>
					) : null}
				</Col>
			</Row>
		</>
	);
});

export default Step1;
