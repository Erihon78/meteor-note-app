import { Meteor } from 'meteor/meteor';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import expect from 'expect';

import { Signup } from './Signup';

Enzyme.configure({ adapter: new Adapter() });

if (Meteor.isClient) {
	describe('Signup', function () {
		it('should show error messages', function () {
			const error = 'This is not working',
				wrapper = mount(<Signup createUser={() => {}} noLinksForTest={true} />);
			
			wrapper.setState({ error });			
			expect(wrapper.find('i').text()).toBe(error);

			wrapper.setState({ error: '' });
			expect(wrapper.find('i').length).toBe(0);
		});

		it('should call createUser with the form data', function() {
			const email = 'mark@test.com',
				password = 'password123',
				spy = expect.createSpy(),
				wrapper = mount(<Signup createUser={spy} noLinksForTest={true} />);			

			wrapper.ref('email').value = email;
			wrapper.ref('password').value = password;
			wrapper.find('form').simulate('submit');				

			expect(spy.calls[0].arguments[0]).toEqual({ email, password });			
		});

		it('should call error if short password', function() {
			const email = 'mark@test.com',
				password = '123       ',
				spy = expect.createSpy(),
				wrapper = mount(<Signup createUser={spy} noLinksForTest={true} />);			

			wrapper.ref('email').value = email;
			wrapper.ref('password').value = password;
			wrapper.find('form').simulate('submit');			
			
			expect(wrapper.state('error').length).toBeGreaterThan(9)			
		});

		it('should set createUser callback errors', function() {
			const password = 'password1234',
				reason = 'You don\'t have valid email address',
				spy = expect.createSpy(),
				wrapper = mount(<Signup createUser={spy} noLinksForTest={true} />);

			wrapper.ref('password').value = password;
			wrapper.find('form').simulate('submit');			
			
			spy.calls[0].arguments[1]({reason});					
			expect(wrapper.state('error')).toEqual(reason);

			spy.calls[0].arguments[1]();
			expect(wrapper.state('error').length).toBe(0);
		}); 
	});
}