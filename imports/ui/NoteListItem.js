import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const NoteListItem = (props) => {		
	return (
		<div>
			<h3>{ props.note.title || 'Untitled note' }</h3>
			<p>{ moment(props.note.updatedAt).format('DD/M/YYYY') }</p>
		</div>
	);
};

NoteListItem.propTypes = {
	note: PropTypes.object.isRequired
}

export default NoteListItem;