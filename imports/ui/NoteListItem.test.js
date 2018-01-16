import {
	Meteor
} from 'meteor/meteor';
import Enzyme, {
	mount
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import expect from 'expect';
import moment from 'moment';

import NoteListItem from './NoteListItem';

Enzyme.configure({
	adapter: new Adapter()
});

if (Meteor.isClient) {
	describe('NoteListItem', function () {
		it('should render title and timestamp', function () {
			const title = 'My title here',
				updatedAt = moment().valueOf(),
				wrapper = mount( <NoteListItem note={{title, updatedAt}}/>);

			expect(wrapper.find('h3').text()).toBe(title);
			expect(wrapper.find('p').text()).toBe(moment(updatedAt).format('DD/M/YYYY'));
		});

		it('should set default title no title set', function () {
			const title = null,				
				wrapper = mount( <NoteListItem note={{title}}/>);

			expect(wrapper.find('h3').text()).toBe('Untitled note');
		});
	});
}