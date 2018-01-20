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

import { NoteListHeader } from './NoteListHeader';
import { notes } from '../fixtures/fixtures';

Enzyme.configure({
	adapter: new Adapter()
});

if (Meteor.isClient) {
	describe('NoteListHeader', function () {
		let meteorCall, history;

		beforeEach(function () {
			meteorCall = expect.createSpy();
			history = {
				push: expect.createSpy()
			};
		});
		
		it('should call meteorCall on click', function () {
			const wrapper = mount(<NoteListHeader meteorCall={meteorCall} history={history}/>);

			wrapper.find('button').simulate('click');	
			meteorCall.calls[0].arguments[1](undefined, notes[0]._id);

			expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');	
			expect(history.push).toHaveBeenCalledWith(`/dashboard/${notes[0]._id}`);				
		});

		it('should not push history for failed insert', function () {
			const wrapper = mount(<NoteListHeader meteorCall={meteorCall} history={history}/>);

			wrapper.find('button').simulate('click');	
			meteorCall.calls[0].arguments[1]({}, undefined);

			expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');	
			// expect(history.push).toNotHaveBeenCalled();
			expect(history.push.calls[0]).toBe(undefined);
		});
	});
}