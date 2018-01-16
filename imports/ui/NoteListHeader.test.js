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

Enzyme.configure({
	adapter: new Adapter()
});

if (Meteor.isClient) {
	describe('NoteListHeader', function () {
		it('it should call meteorCall on click', function () {
			const spy = expect.createSpy(),
				wrapper = mount(<NoteListHeader meteorCall={spy}/>);

			wrapper.find('button').simulate('click');			

			expect(spy).toHaveBeenCalledWith('notes.insert');						
		});
	});
}