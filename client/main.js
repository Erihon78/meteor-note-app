import ReactDOM from 'react-dom';

import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import createHistory from 'history/createBrowserHistory';


import { onAuthChange, routes } from '../imports/routes/routes';

import '../imports/startup/simple-schema-configuration';

const history = createHistory();

Tracker.autorun(() => {
	const isAuthenticated = !!Meteor.userId();
	onAuthChange(isAuthenticated);
});

Tracker.autorun(() => {
	const selectedNoteId = Session.get('selectedNoteId');

	if (selectedNoteId) {
		history.replace(`/dashboard/${selectedNoteId}`);
	}
});

Meteor.startup(() => {
	Session.set('selectedNoteId', undefined);
	ReactDOM.render(routes, document.getElementById('app'));
});
