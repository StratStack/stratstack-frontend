import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { removeError } from '../store/actions/errors';

export default function withAuth(ComponentToBeRendered) {
	class Authenticate extends Component {
		componentWillMount() {
			if (this.props.isAuthenticated === false) {
				this.props.history.push('/signin');
			}
		}
		componentWillUpdate(nextProps) {
			if (nextProps.isAuthenticated === false) {
				this.props.history.push('/signin');
			}
		}
		render() {
			return (
				<div>
					{!this.props.currentUser.isAuthenticated ? (
						<Redirect to='/signin' />
					) : (
						<ComponentToBeRendered {...this.props} />
					)}
				</div>
			);
		}
	}

	function mapStateToProps(state) {
		return {
			isAuthenticated: state.currentUser.isAuthenticated,
			errors: state.errors,
			currentUser: state.currentUser,
		};
	}

	return connect(mapStateToProps, { removeError })(Authenticate);
}
