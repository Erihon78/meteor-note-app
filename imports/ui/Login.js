import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';

export class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: ''
		};
	}
	onSubmit(e) {
		e.preventDefault();

		let email = this.refs.email.value.trim(),
			password = this.refs.password.value.trim();		

		this.props.loginWithPassword({email}, password, (err) => {
			if (err) {
				this.setState({error: 'Unable to login. Check the Email and Password'});
			} else {
				this.setState({error: ''});
			}
		});				
	}
	render() {		
		return (
			<div className="auth-page">
				<h2>Login Page</h2>

				{this.state.error ? <i>{this.state.error}</i> : undefined}

				<form onSubmit={this.onSubmit.bind(this)}>
					<p>
						<input type="email" name="email" ref="email" placeholder="Email"/>
					</p>
					<p>
						<input type="password" name="password" ref="password" placeholder="Password"/>
					</p>
					<button>Login</button>
				</form>
				<br/>

				{this.props.noLinksForTest ? undefined : <Link to={'/registration'}>Registration</Link>}				
			</div>
		);
	}
}

Login.propsTypes = {
	loginWithPassword: PropTypes.func.isRequired,
	noLinksForTest: PropTypes.bool.isRequired
};

export default withTracker(() => {
	return {
		loginWithPassword: Meteor.loginWithPassword,
		noLinksForTest: false
	};
})(Login);