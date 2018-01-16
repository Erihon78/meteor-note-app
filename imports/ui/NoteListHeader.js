import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

export class NoteListHeader extends React.Component {
	onCreateNote(e) {
		e.preventDefault();

		this.props.meteorCall('notes.insert');				
	}
	render() {
		return (
			<div>
				<button onClick={this.onCreateNote.bind(this)}>Create Note</button>
			</div>
		);
	}
}

NoteListHeader.propsTypes = {
	meteorCall: PropTypes.func.isRequired	
};

export default withTracker(() => {
	return {
		meteorCall: Meteor.call
	};
})(NoteListHeader);