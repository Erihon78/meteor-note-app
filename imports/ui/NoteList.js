import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';

export const NoteList = (props) => {
	const notes = props.notes,
		content = notes.map((item) => {
		return <NoteListItem key={item._id} note={item}/>
	});
	return (
		<div>
			<h3>NoteList: { props.notes.length }</h3>
			<NoteListHeader />	
			{content}		
		</div>
	);
};

NodeList.propTypes = {
	notes: PropTypes.array.isRequired
}

export default withTracker(() => {
	Meteor.subscribe('notes');
	return {
		notes: Notes.find().fetch()		
	};
})(NoteList);