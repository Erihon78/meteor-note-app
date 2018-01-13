import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Meteor} from 'meteor/meteor';

import { withTracker } from 'meteor/react-meteor-data';

export class Signup extends React.Component {
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

		if (password.length < 9) {
			return this.setState({error: 'Max 9 letters in password'});
		}		

		this.props.createUser({			
			email,
			password
		}, (err) => {
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
				<h2>Create account</h2>

				{this.state.error ? <i>{this.state.error}</i> : undefined}

				<form onSubmit={this.onSubmit.bind(this)} noValidate>
					<p>
						<input type="email" name="email" ref="email" placeholder="Email" />					
					</p>
					<p>
						<input type="password" name="password" ref="password" placeholder="Password" />
					</p>
					<button>Registation</button>
				</form>
				<br/>
				{this.props.noLinksForTest ? undefined : <Link to={'/Login'}>Login</Link>}
			</div>
		);
	}
};

Signup.propsTypes = {
	createUser: PropTypes.func.isRequired,
	noLinksForTest: PropTypes.bool.isRequired
};

export default withTracker(() => {
	return {
		createUser: Accounts.createUser,
		noLinksForTest: false
	};
})(Signup);