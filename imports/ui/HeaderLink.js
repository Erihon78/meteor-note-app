import React from 'react';
import PropTypes from 'prop-types';

import { Accounts } from 'meteor/accounts-base';

import { withTracker } from 'meteor/react-meteor-data';

export const HeaderLink = (props) => {
	return (
		<div>				
			<h2>{props.title}</h2>

			<p>
				<button onClick={ () => props.handleLogout() }>
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

