import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

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
			{count === 0 ? emptyList : content}					
			<NoteListHeader />				
		</div>
	);
};

NoteList.propTypes = {
	notes: PropTypes.array.isRequired
}

export default withTracker(() => {
	Meteor.subscribe('notes');
	return {
		notes: Notes.find().fetch()		
	};
})(NoteList);