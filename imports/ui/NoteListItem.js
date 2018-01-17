import React from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';

import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

export const NoteListItem = (props) => {		
	const selected = (window.location.pathname.split('/')[2] === props.note._id);		
	return (
		<div onClick={() => {
			props.Session.set('selectedNoteId', props.note._id)
		}}>
			<h3>{ props.note.title || 'Untitled note' }</h3>			

			{selected ? 'selected' : undefined}

			<p>{ moment(props.note.updatedAt).format('DD/M/YYYY') }</p>
		</div>
	);
};

NoteListItem.propTypes = {
	note: PropTypes.object.isRequired,
	Session: PropTypes.object.isRequired
}

export default withTracker(() => {		
	return { Session };
})(NoteListItem);