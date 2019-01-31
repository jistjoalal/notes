import { assert } from 'chai';

import { Notes } from './notes';

if (Meteor.isServer) {
  describe('notes', function() {

    const MMethods = Meteor.server.method_handlers;

    const noteOne = {
      _id: 'testNoteId1',
      title: 'My Title',
      body: 'My body for note',
      updatedAt: 0,
      userId: 'testUserId1',
    };

    const noteTwo = {
      _id: 'testNoteId2',
      title: 'My Title 2',
      body: 'My body 2 for note',
      updatedAt: 0,
      userId: 'testUserId2',
    };

    beforeEach(function() {
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    it('should insert new note', function() {
      const { userId } = noteOne;
      const _id = MMethods['notes.insert'].apply({ userId });
      const note = Notes.findOne({ _id, userId });
      assert.exists(note);
    });

    it('should not insert note if unauthenticated', function() {
      const insert = () => MMethods['notes.insert']();
      assert.throws(insert);
    });

    it('should remove note', function() {
      const { userId, _id } = noteOne;
      MMethods['notes.remove'].apply({ userId }, [ _id ]);
      const note = Notes.findOne({ _id });
      assert.notExists(note);
    });

    it('should not remove note if run by incorrect user', function() {
      const { _id } = noteOne;
      const userId = 'notTheUser'; 
      MMethods['notes.remove'].apply({ userId }, [ _id ]);
      const note = Notes.findOne({ _id });
      assert.exists(note);
    });

    it('should not remove note if unauthenticated', function() {
      const { _id } = noteOne;
      const remove = () => MMethods['notes.remove'].apply({}, [ _id ]);
      assert.throws(remove);
    });

    it('should not remove note if invalid _id', function() {
      const { userId } = noteOne;
      const remove = () => MMethods['notes.remove'].apply({ userId });
      assert.throws(remove);
    });

    it('should update note', function() {
      const { _id, userId } = noteOne;
      const updates = { title: 'New Title' };
      MMethods['notes.update'].apply({ userId }, [ _id, updates ]);
      const note = Notes.findOne({ _id });
      assert.notDeepEqual(note, noteOne);
      assert.isAbove(note.updatedAt, 0);
      assert.include(note, {
        title: updates.title,  // title changed
        body: noteOne.body     // body same
      });
    });

    it('should throw err if extra updates', function() {
      const { _id, userId } = noteOne;
      const updates = { badKey: 'whoa there' };
      const update = () => MMethods['notes.update'].apply({ userId }, [ _id, updates ]);
      assert.throws(update);
    });

    it('should not update note w/ incorrect user', function() {
      const { _id } = noteOne;
      const userId = 'notTheUser';
      const updates = { title: 'New Title' };
      MMethods['notes.update'].apply({ userId }, [ _id, updates ]);
      const note = Notes.findOne({ _id });
      assert.deepEqual(note, noteOne);
    });

    it('should not update note if unauthenticated', function() {
      const { _id } = noteOne;
      const update = () => MMethods['notes.update'].apply({}, [ _id ]);
      assert.throws(update);
    })

    it('should not update note if invalid _id', function() {
      const { userId } = noteOne;
      const updates = { title: 'New Title' };
      const update = () => MMethods['notes.update'].apply({ userId }, [ _id, updates ]);
      assert.throws(update);
    });

    it('should return a users notes', function() {
      const { userId } = noteOne;
      const res = Meteor.server.publish_handlers.notes.apply({ userId });
      const notes = res.fetch();
      assert.equal(notes.length, 1);
      assert.deepEqual(notes[0], noteOne);
    });

    it('should return 0 notes for user that has none', function() {
      const userId = 'notTheUser';
      const res = Meteor.server.publish_handlers.notes.apply({ userId });
      const notes = res.fetch();
      assert.equal(notes.length, 0);
    });
  });
}
