import {
	Meteor
} from 'meteor/meteor';

import expect from 'expect';

import {
	validateNewUser
} from './users';

if (Meteor.isServer) {
	describe('users', function() {
		it('should allow valid email address', function() {
			const testUser = {
				emails: [{
					address: "user@notes.com"
				}]
			};

			const res = validateNewUser(testUser);

			expect(res).toBe(true);
		});

		it('should reject a not valid email address', function() {
			const testUser = {
				emails: [{
					address: "user.com"
				}]
			};

			expect(() => {
				validateNewUser(testUser);
			}).toThrow();
		});
	});
}

// const add = (a, b) => {
// 	if (typeof b !== 'number') {
// 		return a + a;
// 	}

// 	return a + b;
// };

// describe('add', function() {
// 	it('should two numbers', function() {
// 		const res = add(20, 40);

// 		expect(res).toBeGreaterThan(0);
// 		// if (res < 0) {
// 		// 	throw new Error('Sum not expected value');
// 		// }

// 	});
// });

// const squire = (a) => a * a;

// describe('squire', function(){
// 	it ('should be four', function(){
// 		const res = squire(2);

// 		// if (res !== 4) {
// 		// 	throw new Error('Result must be equal to four');
// 		// }
// 		expect(res).toBe(6);
// 	});
// });