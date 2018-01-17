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

import { notes } from '../fixtures/fixtures';
import { NoteListItem } from './NoteListItem';

Enzyme.configure({
	adapter: new Adapter()
});

if (Meteor.isClient) {
	describe('NoteListItem', function () {
		let Session;

		beforeEach(() => {
			Session = {
				set: expect.createSpy()
			};
		});

		it('should render title and timestamp', function () {
			const wrapper = mount( <NoteListItem note={notes[0]} Session={Session}/>);

			expect(wrapper.find('h3').text()).toBe(notes[0].title);
			expect(wrapper.find('p').text()).toBe(moment(notes[0].updatedAt).format('DD/M/YYYY'));
		});

		it('should set default title no title set', function () {
			const wrapper = mount( <NoteListItem note={notes[1]} Session={Session}/>);

			expect(wrapper.find('h3').text()).toBe('Untitled note');
		});

		it('should call set on click', function () {
			const wrapper = mount( <NoteListItem note={notes[0]} Session={Session}/>);

			wrapper.find('div').simulate('click');			

			expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);			
		});
	});
}