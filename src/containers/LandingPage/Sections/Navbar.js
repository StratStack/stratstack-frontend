import React from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import logo from '../Img/slogo.png';

// reactstrap components
import {
	Collapse,
	NavbarBrand,
	Navbar,
	NavItem,
	Nav,
	Container,
} from 'reactstrap';

function AuthNavbar(props) {
	const [collapseOpen, setCollapseOpen] = React.useState(false);
	const [color, setColor] = React.useState('navbar-dark');
	// this function opens and closes the collapse on small devices
	// it also adds navbar-transparent class to the navbar when closed
	// ad bg-white when opened
	const toggleCollapse = () => {
		if (!collapseOpen) {
			setColor('bg-white');
		} else {
			setColor('navbar-transparent');
		}
		setCollapseOpen(!collapseOpen);
	};
	return (
		<Navbar
			className={classnames('navbar-absolute fixed-top', color)}
			expand='lg'>
			<Container>
				<div className='navbar-wrapper'>
					<NavbarBrand href='/' onClick={(e) => e.preventDefault()}>
						<img className='logoLanding' src={logo} />
					</NavbarBrand>
				</div>
				<button
					aria-controls='navigation-index'
					aria-expanded={false}
					aria-label='Toggle navigation'
					className='navbar-toggler'
					data-toggle='collapse'
					type='button'
					onClick={toggleCollapse}>
					<span className='navbar-toggler-bar navbar-kebab' />
					<span className='navbar-toggler-bar navbar-kebab' />
					<span className='navbar-toggler-bar navbar-kebab' />
				</button>
				<Collapse isOpen={collapseOpen} className='justify-content-end' navbar>
					<Nav navbar>
						<NavItem>
							<NavLink to='/signup' className='nav-link'>
								<i className='nc-icon nc-layout-11' />
								Register
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink to='/signin' className='nav-link'>
								<i className='nc-icon nc-book-bookmark' />
								Sign in
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Container>
		</Navbar>
	);
}

export default AuthNavbar;
