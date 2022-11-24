import React, { useState } from 'react';

import { Row, Col } from 'reactstrap';

function Example(args) {
	return (
		<div className='landingFooter'>
			<Row>
				<Col md='4'>Some text</Col>
				<Col md='4'>Some text</Col>
				<Col md='4'>Some text</Col>
			</Row>
		</div>
	);
}

export default Example;
