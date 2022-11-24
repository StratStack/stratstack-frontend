/*eslint-disable*/

import React, { useState } from 'react';
import AuthNavbar from 'components/Navbars/AuthNavbar.js';
import './index.css';
import { Row, Col } from 'reactstrap';
import Navbar from './Sections/Navbar';
import Footer from './Sections/Footer';
// import vaLogo from './Img/va.jpg';
export default function LandingPage(props) {
	const [vaLogoClass, setVaLogoClass] = useState('vaLogoNotActive');
	const [vaDivClass, setVaDivClass] = useState('vaDivNotActive');
	const vaOnClick = () => {
		if (vaLogoClass == 'vaLogoNotActive') {
			setVaLogoClass('vaLogoActive');
			setVaDivClass('vaDivActive');
		} else {
			setVaLogoClass('vaLogoNotActive');
			setVaDivClass('vaDivNotActive');
		}
	};

	return (
		<>
			<div className='mainLanding'>
				<Navbar />
				{/* <AuthNavbar color='primary' /> */}
				<div className='SectionOneLanding'>
					<Row>
						<Col
							className='SectionOneLandingBoxOne'
							md='4'
							sm={{
								offset: 1,
								size: 'auto',
							}}>
							<h1>Some text will replace this</h1>
							{/* <h2>Some text will replace this</h2> */}
							<h3>Some text will replace this</h3>
							<h4>Some text will replace this</h4>
						</Col>
						<Col
							className='SectionOneLandingBoxTwo'
							md='4'
							sm={{
								offset: 1,
								size: 'auto',
							}}></Col>
					</Row>
				</div>
				<div className='SectionTwoLanding container-xxl'>
					{' '}
					<Row>
						<Col
							className='SectionTwoLandingBoxOne'
							md='4'
							sm={{
								offset: 1,
								size: 'auto',
							}}>
							<h1>Some Text</h1>
						</Col>
						<Col
							className='SectionTwoLandingBoxTwo'
							md='4'
							sm={{
								offset: 1,
								size: 'auto',
							}}>
							<h2>Some text will replace this</h2>
							<h2>Some text will replace this</h2>
							<h2>Some text will replace this</h2>
							<h2>Some text will replace this</h2>
						</Col>
					</Row>
				</div>

				<div className='SectionThreeLanding'>
					<Row>
						<Col
							className='SectionThreeLandingBoxOne'
							md='4'
							sm={{
								offset: 1,
								size: 'auto',
							}}></Col>
						<Col
							className='SectionThreeLandingBoxTwo'
							md='4'
							sm={{
								offset: 1,
								size: 'auto',
							}}>
							<h1>Some text will replace this</h1>
							{/* <h2>Some text will replace this</h2> */}
							<h3>Some text will replace this</h3>
							<h4>Some text will replace this</h4>
						</Col>
					</Row>
					<div className={vaDivClass}>
						<iframe
							src='https://web.powerva.microsoft.com/environments/Default-03ddbfe0-130e-402b-b5fb-bb6ebaa1b94d/bots/new_bot_d73bc26b0d5647c3a74074ad86c0aa65/webchat'
							frameborder='0'
							className='chatVAlanding'></iframe>
					</div>
					<div className={vaLogoClass} onClick={vaOnClick}>
						{/* <img src={vaLogo} /> */}
					</div>
				</div>
			</div>
			<div>
				<Footer />
			</div>
		</>
	);
}
