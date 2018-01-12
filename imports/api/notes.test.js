import {
	Meteor
} from 'meteor/meteor';

import {
	Notes
} from './notes';

import expect from 'expect';

if (Meteor.isServer) {
	describe('notes', function() {
		const noteOne = {
			_id: 'testNoteId1',
			title: 'My Title',
			body: 'My body for note',
			updatedAt: 0,
			userId: 'testUserId1'
		};

		const noteTwo = {
			_id: 'testNoteId2',
			title: 'Go to Magazine',
			body: 'Buy milk',
			updatedAt: 0,
			userId: 'testUserId2'
		};

		beforeEach(function() {
			Notes.remove({});

			Notes.insert(noteOne);
			Notes.insert(noteTwo);
		});

		it('should insert new note', function() {
			// .apply() use this context in function
			const userId = 'testid',
				_id = Meteor.server.method_handlers['notes.insert'].apply({
					userId
				});

			expect(Notes.findOne({
				_id,
				userId
			})).toBeTruthy();
		});

		it('shoild not insert note if not authenticated', function() {
			expect(() => {
				Meteor.server.method_handlers['notes.insert']();
			}).toThrow();
		});

		it('should remove note', function() {
			Meteor.server.method_handlers['notes.remove'].apply({
				userId: noteOne.userId
			}, [noteOne._id]);

			expect(Notes.findOne({
				_id: noteOne._id
			})).toBeFalsy();
		});

		it('should not remove if unauthenticated', function() {
			expect(() => {
				Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
			}).toThrow();
		});

		it('should not remove note if invalid _id', function() {
			expect(() => {
				Meteor.server.method_handlers['notes.remove'].apply({
					userId: noteOne.userId
				}, []);
			}).toThrow();
		});

		it('should update note', function() {
			const title = 'This is updated title';

			Meteor.server.method_handlers['notes.update'].apply({
				userId: noteOne.userId
			}, [
				noteOne._id, {
					title
				}
			]);

			const note = Notes.findOne({
				_id: noteOne._id
			});

			expect(note.updatedAt).toBeGreaterThan(0);

			expect(note).toInclude({
				title,
				body: noteOne.body
			});
		});

		it('should throw error if extra updates provided', function() {
			expect(() => {
				Meteor.server.method_handlers[notes.updtae].apply({
					userId: noteOne.userId
				}, [
					noteOne._id, {
						title: 'new title',
						city: 'London'
					}
				]);
			}).toThrow();
		});

		it('sholud not update note if user not creator', function() {
			const title = 'This is updated title';

			Meteor.server.method_handlers['notes.update'].apply({
				userId: 'testid'
			}, [
				noteOne._id, {
					title
				}
			]);

			const note = Notes.findOne({
				_id: noteOne._id
			});

			expect(note).toInclude(noteOne);
		});

		it('should not update if unauthenticated', function() {
			expect(() => {
				Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
			}).toThrow();
		});

		it('should not update note if invalid _id', function() {
			expect(() => {
				Meteor.server.method_handlers['notes.update'].apply({
					userId: noteOne.userId
				}, []);
			}).toThrow();
		});

		it('should return a users notes', function() {
			const res = Meteor.server.publish_handlers.notes.apply({
					userId: noteOne.userId
				}),
				notes = res.fetch();

			expect(notes.length).toBe(1);
			expect(notes[0]).toEqual(noteOne);
		});

		it('should return notes a users who have not notes', function() {
			const res = Meteor.server.publish_handlers.notes.apply({
					userId: 'testingId'
				}),
				notes = res.fetch();

			expect(notes.length).toBe(0);			
		});
	});
}