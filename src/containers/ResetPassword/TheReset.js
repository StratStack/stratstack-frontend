import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postReset } from '../../store/actions/resetPassword';
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class TheReset extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password: '',
			confirm: '',
		};
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	handleSubmit = (e) => {
		const { token } = this.props.match.params;
		e.preventDefault();
		this.props.postReset(token, this.state);
		this.setState({ password: '', confirm: '' });
		this.props.history.push(`/reset/${token}`);
	};
	render() {
		const { reset } = this.props;
		const { password, confirm } = this.state;
		return (
			<div>
				<Row className='container'>
					<Col md='8'>
						{reset && <div>{reset}</div>}
						<h2>Enter your Email please </h2>
						<Form onSubmit={this.handleSubmit}>
							<FormGroup row>
								<Label sm={2}>New Password</Label>
								<Col sm={10}>
									<Input
										autoComplete='off'
										id='password'
										name='password'
										onChange={this.handleChange}
										type='password'
										value={password}
										placeholder='New password'
										required
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label sm={2}>Confirm your password</Label>
								<Col sm={10}>
									<Input
										autoComplete='off'
										id='confirm'
										name='confirm'
										onChange={this.handleChange}
										type='password'
										value={confirm}
										placeholder='Confirm your password'
										required
									/>
								</Col>
							</FormGroup>
							<FormGroup check row>
								<Button color='info' size='sm'>
									Submit
								</Button>
							</FormGroup>
						</Form>
					</Col>
					<Col md='2'></Col>
				</Row>
				{/* <Footer /> */}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		errors: state.errors,
		reset: state.reset,
	};
}

export default connect(mapStateToProps, { postReset })(TheReset);
