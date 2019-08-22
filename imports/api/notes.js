import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Notes = new Mongo.Collection('notes');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('notes', function tasksPublication() {
        return Notes.find();
    });
}

Meteor.methods({
    'notes.save'(note) {
        if (note.title.length === 0) {
            note.title = 'Untitled Note'
        }
        Notes.update(
            {_id: note._id},
            {title: note.title, content: note.content}
        );
    },
    'notes.insert'() {
        let id = Notes.insert({
            title: 'Untitled Note',
            content: '',
            createdAt: new Date()
        });
        return id;
    },
    'notes.delete'(note) {
        Notes.remove({
            _id: note._id
        });
    }
});