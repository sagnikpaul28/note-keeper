import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Users = new Mongo.Collection('users');

Meteor.methods({
    'user.insert'(user) {
        let users = Users.find({email: user.email}).fetch();

        if (users.length > 0) {
            return {
                code: 422
            }
        }else {
            Users.insert({
                name: user.name,
                email: user.email,
                password: user.password
            });

            return {
                code: 200
            };
        }
    },
    'user.checkUser'(user) {
        let users = Users.find({email: user.email, password: user.password}).fetch();

        if (users.length > 0) {
            return {
                code: 200
            }
        }else {
            return {
                code: 401
            }
        }
    }
});