import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { Notes } from '../api/notes';

import createHistory from 'history/createBrowserHistory';

export class Editor extends React.Component {	
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			body: ''
		}
	}
	handleBodyChange(e) {
		const body = e.target.value;
		this.setState({ body });
		this.props.call('notes.update', this.props.note._id, { body });
	}
	handleTitleChange(e) {
		const title = e.target.value;
		this.setState({ title });
		this.props.call('notes.update', this.props.note._id, { title });
	}
	noteRemove() {		
		this.props.call('notes.remove', this.props.note._id);	
		this.props.history.push('/dashboard');
		Session.set('selectedNoteId');				
	}
	componentDidUpdate(prevProps, prevState) {
		const currentNoteId = this.props.note ? this.props.note._id : undefined,
			prevNoteId = prevProps.note ? prevProps.note._id : undefined;		
		
		if (currentNoteId && currentNoteId !== prevNoteId) {
			this.setState({
				title: this.props.note.title,
				body: this.props.note.body
			});
		}
	}
	render() {				
		if (this.props.note) {
			return (
				<div>
					<input value={this.state.title} placeholder="Get some title bro" onChange={this.handleTitleChange.bind(this)} />
					<textarea value={this.state.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)}></textarea>
					<button onClick={this.noteRemove.bind(this)}>Delete Note</button>
				</div>
			);		
		} else {
			return (
				<p>
					{this.props.selectNoteId ? 'Note not found.' : 'Pick or create a note to get started!'}
				</p>
			);
		}
	}
};

Editor.propTypes = {
	note: PropTypes.object,
	selectNoteId: PropTypes.string,
	call: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired
}

export default withTracker(() => {
	const selectNoteId = Session.get('selectedNoteId');

	return {
		selectNoteId,
		history: createHistory(),
		call: Meteor.call,
		note: Notes.findOne(selectNoteId)
	}
})(Editor);