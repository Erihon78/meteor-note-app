import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';

import { Notes } from '../api/notes';

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export const NoteList = (props) => {	
	const notes = props.notes,
		content = notes.map((item) => {
			return <NoteListItem key={item._id} note={item}/>
		}),
		count = props.notes.length,
		emptyList = <NoteListEmptyItem />;
	return (
		<div>
			<h3>NoteList: { count }</h3>			
			<NoteListHeader />
			{count === 0 ? emptyList : content}											
		</div>
	);
};

NoteList.propTypes = {
	notes: PropTypes.array.isRequired
}

export default withTracker(() => {	
	const urlDashboard = location.pathname.split('/');

	let selectedNoteId;

	if (urlDashboard.includes('dashboard') && urlDashboard[2] && Meteor.userId()) {
		Session.set('selectedNoteId', urlDashboard[2]);

		selectedNoteId = Session.get('selectedNoteId');		
	}	

	Meteor.subscribe('notes');	

	return {
		notes: Notes.find().fetch().map((note) => {
			return {
				...note,
				selected: note._id === selectedNoteId
			}
		})
	};
})(NoteList);