// All questions-related publications

import { Meteor } from 'meteor/meteor';
import { check } from "meteor/check";
import { Sessions } from './sessions';
import { Questions } from './questions';

Meteor.publish('questions.all', function () {
    return Questions.find();
});

Meteor.publish('sessions.user', function (_id) {
    check(_id, String);
    const res = Sessions.find({ _id });
    if (res.count() === 0) {        
        throw new Meteor.Error("No session was found");
    }
    return res;
});   
