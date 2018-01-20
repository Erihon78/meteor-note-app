import React, { Component } from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';

import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

export const NoteListItem = (props) => {		 		
	return (
		<li onClick={() => {
			props.Session.set('selectedNoteId', props.note._id)
		}} className={props.current ? 'active' : undefined}>
			<h3>{ props.note.title || 'Untitled note' }</h3>						
			<p>{ moment(props.note.updatedAt).format('lll') }</p>
		</li>
	);
};

NoteListItem.propTypes = {
	note: PropTypes.object.isRequired,
	Session: PropTypes.object.isRequired
}

export default withTracker((props) => {	
	return { 
		Session,
		current: Session.get('selectedNoteId') === props.note._id
	};
})(NoteListItem);