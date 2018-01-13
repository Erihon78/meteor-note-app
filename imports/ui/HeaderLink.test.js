import {
	Meteor
} from 'meteor/meteor';
import Enzyme, {
	mount
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import expect from 'expect';

Enzyme.configure({
	adapter: new Adapter()
});

import { HeaderLink } from './HeaderLink';

if (Meteor.isClient) {
	describe('HeaderLink', function() {
		it('should set button text to Exit', function() {
			const wrapper = mount( <HeaderLink title = "Text title" handleLogout={() => {}}/> ),
				buttonText = wrapper.find('button').text();

			expect(buttonText).toBe('Exit');
		});

		it('should use title prop as h2 text', function() {
			const title = 'Note application',
				wrapper = mount( <HeaderLink title={title} handleLogout={() => {}}/> ),
				h2Text = wrapper.find('h2').text();

			expect(h2Text).toBe(title);
		});

		it('should call handleLogout on click', function () {
			const spy = expect.createSpy(),
				wrapper = mount(<HeaderLink title="Title" handleLogout={spy}/>);

	 		wrapper.find('button').simulate('click');

	 		expect(spy).toHaveBeenCalled();
		});
	});
}