import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import createHistory from 'history/createBrowserHistory';

export class NoteListHeader extends React.Component {
	onCreateNote(e) {
		e.preventDefault();

		this.props.meteorCall('notes.insert', (err, res) => {
			if (res) {				
				this.props.history.push(`/dashboard/${res}`);
			}
		});				
	}
	render() {
		return (
			<div className="note-list-header">
				<button onClick={this.onCreateNote.bind(this)}>Create Note</button>
			</div>
		);
	}
}

NoteListHeader.propsTypes = {
	meteorCall: PropTypes.func.isRequired,	
	history: PropTypes.object.isRequired
};

export default withTracker(() => {
	return {
		meteorCall: Meteor.call,
		history: createHistory()
	};
})(NoteListHeader);