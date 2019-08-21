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
    
});