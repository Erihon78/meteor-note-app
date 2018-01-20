import React from 'react';

import HeaderLink from './HeaderLink';
import NoteList from './NoteList';
import Editor from './Editor';

export default () => {				
	return (
		<div>
			<HeaderLink title='Note application'/>					

			<div className="content">				
				<NoteList />
				<div className="divider"></div>
				<Editor />
			</div>
		</div>
	);
};