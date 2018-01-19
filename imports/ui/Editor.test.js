import { Meteor } from 'meteor/meteor';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import expect from 'expect';

import { notes } from '../fixtures/fixtures';

Enzyme.configure({
	adapter: new Adapter()
});

if (Meteor.isClient) {
	// Browser history needs a DOM
	import { Editor } from './Editor';
	
	describe('Editor', function () {
		let call, history;

		beforeEach(function () {
			call = expect.createSpy();
			history = {
				push: expect.createSpy()
			};
		});

		it('should render pick note message', function () {			
			const wrapper = mount(<Editor history={history} call={call}/>);						
			expect(wrapper.find('p').text()).toBe('Pick or create a note to get started!');
		});

		it('should render note not found message', function() {
			const wrapper = mount(<Editor history={history} call={call} selectNoteId={notes[1]._id}/>);

			expect(wrapper.find('p').text()).toBe('Note not found.');
		});

		it('should remove note', function () {
			const wrapper = mount(<Editor history={history} call={call} selectNoteId={notes[0]._id} note={notes[0]}/>);			
			
			wrapper.find('button').simulate('click');					
			expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);			
			expect(history.push).toHaveBeenCalledWith('/dashboard');
		});

		it('should update the note body on textarea change', function () {
			const body = 'My new text',
				wrapper = mount(<Editor history={history} call={call} selectNoteId={notes[0]._id} note={notes[0]}/>);	

			wrapper.find('textarea').simulate('change', {
				target: {
					value: body
				}
			});
			
			expect(wrapper.state('body')).toBe(body);
			expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {body});
		});

		it('should update the note title on input change', function () {
			const title = 'My new text for title it\'s awesome',
				wrapper = mount(<Editor history={history} call={call} selectNoteId={notes[0]._id} note={notes[0]}/>);	

			wrapper.find('input').simulate('change', {
				target: {
					value: title
				}
			});
			
			expect(wrapper.state('title')).toBe(title);
			expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {title});
		});

		it('should set state for the new note', function () {
			const wrapper = mount(<Editor history={history} call={call}/>);	

			wrapper.setProps({
				selectedNoteId: notes[0]._id,
				note: notes[0]
			});

			expect(wrapper.state('title')).toBe(notes[0].title);
			expect(wrapper.state('body')).toBe(notes[0].body);
		});

		it('should set state if note prop not provided', function () {
			const wrapper = mount(<Editor history={history} call={call}/>);	

			wrapper.setProps({
				selectedNoteId: notes[0]._id
			});

			expect(wrapper.state('title')).toBe('');
			expect(wrapper.state('body')).toBe('');
		});
	});
}