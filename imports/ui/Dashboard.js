import React from 'react';

import HeaderLink from './HeaderLink';
import NoteList from './NoteList';

export default () => {				
	return (
		<div>
			<HeaderLink title='Note application'/>					

			<div>				
				<NoteList />
			</div>
		</div>
	)
}