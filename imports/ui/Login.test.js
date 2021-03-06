import {
	Meteor
} from 'meteor/meteor';
import Enzyme, {
	mount
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import expect from 'expect';

import { Login } from './Login';

Enzyme.configure({
	adapter: new Adapter()
});

if (Meteor.isClient) {
	describe('Login', function () {
		it('should show error messages', function () {
			const error = 'This is not working',
				wrapper = mount(<Login loginWithPassword={() => {}} noLinksForTest={true} />);
			
			wrapper.setState({ error });			
			expect(wrapper.find('i').text()).toBe(error);

			wrapper.setState({ error: '' });
			expect(wrapper.find('i').length).toBe(0);
		});

		it('should call loginWithPassword with the form data', function() {
			const email = 'mark@test.com',
				password = 'password123',
				spy = expect.createSpy(),
				wrapper = mount(<Login loginWithPassword={spy} noLinksForTest={true} />);

			wrapper.ref('email').value = email;
			wrapper.ref('password').value = password;
			wrapper.find('form').simulate('submit');			

			expect(spy.calls[0].arguments[0]).toEqual({ email });
			expect(spy.calls[0].arguments[1]).toBe(password);
		});

		it('should set loginWithPassword callback errors', function() {
			const spy = expect.createSpy(),
				wrapper = mount(<Login loginWithPassword={spy} noLinksForTest={true} />);

			wrapper.find('form').simulate('submit');			

			spy.calls[0].arguments[2]({});			
			expect(wrapper.state('error').length).toNotBe(0);

			spy.calls[0].arguments[2]();
			expect(wrapper.state('error').length).toBe(0);
		}); 
	});
}