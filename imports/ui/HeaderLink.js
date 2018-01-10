import React from 'react';
import PropTypes from 'prop-types';

import {Accounts} from 'meteor/accounts-base';

const HeaderLink = (props) => {
	return (
		<div>				
			<h2>{props.title}</h2>

			<p>
				<button onClick={ () => {Accounts.logout()} }>
					Exit
				</button>
			</p>	
		</div>
	);
}

HeaderLink.propTypes = {	
	title: PropTypes.string.isRequired	
}

export default HeaderLink;