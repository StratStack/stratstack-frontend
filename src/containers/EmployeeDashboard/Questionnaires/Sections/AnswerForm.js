import React, { useState, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { postAnswer } from '../../../../store/actions/employees';

import { Row, Col, Input, Button } from 'reactstrap';

function AnswerForm(props) {
	const dispatch = useDispatch();
	const [answer, setAnswer] = useState('');
	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(postAnswer(props.question._id, props.userId, answer));
		setAnswer('');
	};
	return (
		<div>
			<Row>
				<Col>
					<form onSubmit={handleSubmit}>
						<Input
							type='textarea'
							placeholder='Write you answer here'
							onChange={(e) => setAnswer(e.target.value)}
							value={answer}
							required
						/>
						<Button type='submit' color='primary'>
							ADD
						</Button>
					</form>
				</Col>
			</Row>
		</div>
	);
}

export default AnswerForm;
