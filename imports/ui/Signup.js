import React from 'react';
import {Link} from 'react-router-dom';
import {Meteor} from 'meteor/meteor';

export default class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: '',
			email: '',
			password: ''
		};
	}
	handleInputChange(e) {
		const target = e.target;
		const name = target.name;

		if (target.value) {
			this.setState({
				[name]: target.value.trim(),
			});
		}		
	}
	onSubmit(e) {
		e.preventDefault();

		let email = this.state.email,
			password = this.state.password;

		if (password.length < 9) {
			return this.setState({error: 'Max 9 letters in password'});
		}

		Accounts.createUser({			
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

				{this.state.error ? <p>{this.state.error}</p> : undefined}

				<form onSubmit={this.onSubmit.bind(this)} noValidate>
					<p>
						<input type="email" name="email" onChange={this.handleInputChange.bind(this)} placeholder="Email"/>					
					</p>
					<p>
						<input type="password" name="password" placeholder="Password" onChange={this.handleInputChange.bind(this)}/>
					</p>
					<button>Registation</button>
				</form>
				<br/>
				<Link to='/'>Login</Link>
			</div>
		);
	}
};