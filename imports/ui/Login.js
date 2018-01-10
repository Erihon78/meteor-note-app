import React from 'react';
import {
	Link
} from 'react-router-dom';
import {
	Accounts
} from 'meteor/accounts-base';

export default class Login extends React.Component {
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

		Meteor.loginWithPassword({email}, password, (err) => {
			if (err) {
				this.setState({error: err.reason});
			} else {
				this.setState({error: ''});
			}
		});				
	}
	render() {
		return (
			<div>
				<h2>Login Page</h2>

				{this.state.error ? <p>{this.state.error}</p> : undefined}

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
				<Link to='/registration'>Registration</Link>
			</div>
		);
	}
}