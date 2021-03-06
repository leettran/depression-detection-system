// Controller for result page

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';
import { _ } from 'meteor/erasaur:meteor-lodash';

import { Choices } from "/imports/api/choices";
import { Sessions } from '/imports/api/sessions';
import { SessionCookie } from '/imports/lib/cookies';
import { Questions } from "/imports/api/questions";
import { Messages } from '/imports/lib/messages';

import "../../components/loader/loader";
import "../../components/feedback/feedback";
import "./result.html";
import "./result.scss";

function sessionId() {
    return FlowRouter.getParam('_id');
}

Template.App_result.onCreated(function () {
    // load all questions list
    this.autorun(() => {
        this.subscribe('questions.all');
        this.subscribe('choices.user', sessionId());
        this.subscribe('sessions.user', sessionId(), {
            onError() {
                SessionCookie.remove();
                FlowRouter.go('App.session.start');
            }, onReady() {
                SessionCookie.set(sessionId());
            }
        });
    });
});

Template.App_result.helpers({
    session() {
        return Sessions.findOne();
    },
    getAge(dob) {
        return moment(dob).fromNow(true);
    },
    messages() {
        return new Messages(sessionId());
    },
    optionList() {
        const choices = Choices.allChoices(sessionId());
        return Questions.optionDetails(choices);
    },
    upperFirst(data) {
        return _.upperFirst(data);
    }
});