import React from 'react';
import { Link } from 'react-router-dom';
import AuthNavbar from 'components/Navbars/AuthNavbar.js';
import Footer from 'components/Footer/Footer.js';

function Terms(props) {
	// MATERIAL KIT AUTH LAYOUT CODE
	const fullPages = React.useRef();

	return (
		<>
			<AuthNavbar />
			<div className='wrapper wrapper-full-page' ref={fullPages}>
				<h1>Terms page</h1>
				<Footer fluid />
			</div>
		</>
	);
}

export default Terms;
