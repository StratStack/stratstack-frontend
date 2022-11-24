import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postForgot } from '../../store/actions/resetPassword';
// import mainbackground from "../images/la22.png";
// import Footer from "./Footer";
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Forgot extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
		};
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.postForgot(this.state.email);
		this.setState({ email: '' });
		this.props.history.push({
			pathname: `/forgot`,
		});
	};

	render() {
		const { email } = this.state;
		return (
			<div>
				<Row>
					<Col md='8'>
						<h2 className='signinContentHeader'>Enter your Email please </h2>
						<Form onSubmit={this.handleSubmit}>
							<FormGroup row>
								<Label sm={2}>Email</Label>
								<Col sm={10}>
									<Input
										autoComplete='off'
										id='email'
										name='email'
										onChange={(e) => this.setState({ email: e.target.value })}
										type='email'
										value={email}
										placeholder='Email'
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
	};
}

export default connect(mapStateToProps, { postForgot })(Forgot);

// class Forgot extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: ""
//     };
//   }
//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.postForgot(this.state.email);
//     this.setState({ email: "" });
//     this.props.history.push("/forgot");
//   };
//   render() {
//     const { email } = this.state;
//     return (
//       <div className="container">
//         <div className="row justify-content-md-center text-center">
//           <div className="col-md-6">
//             <form onSubmit={this.handleSubmit}>
//               <label htmlFor="email">Email</label>
//               <input
//                 autoComplete="off"
//                 className="form-control"
//                 id="email"
//                 name="email"
//                 onChange={e => this.setState({ email: e.target.value })}
//                 type="text"
//                 value={email}
//               />
//               <button
//                 type="submit"
//                 className="btn btn-primary btn-block btn-lg"
//               >
//                 send
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     currentUser: state.currentUser,
//     errors: state.errors
//   };
// }

// export default connect(
//   mapStateToProps,
//   { postForgot }
// )(Forgot);
