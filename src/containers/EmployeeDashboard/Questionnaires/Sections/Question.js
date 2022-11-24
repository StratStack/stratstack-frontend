import React from 'react';
import { useSelector } from 'react-redux';

function Question(props) {
	const { question } = props;
	return <div> {question.question}</div>;
}

export default Question;
