import React from 'react';
import PropTypes from 'prop-types';


import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

export const HeaderLink = (props) => {
	const logOut = (props) => {
		props.handleLogout(); 
		Session.set('selectedNoteId');
	}
	return (
		<div>				
			<h2>{props.title}</h2>

			<p>
				<button onClick={() => logOut(props)}>
					Exit
				</button>
			</p>	
		</div>
	);
}

HeaderLink.propTypes = {	
	title: PropTypes.string.isRequired,
	handleLogout: PropTypes.func.isRequired
}

export default withTracker(() => {
	return {
		handleLogout: () => {
			Accounts.logout()
		}
	};
})(HeaderLink);

