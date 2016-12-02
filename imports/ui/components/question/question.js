// Controller for question component

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { AutoForm } from 'meteor/aldeed:autoform';

import "./question.html";
import "./question.scss";

const colors = ["lime", "blue", "green", "teal", "red"];

Template.question.onRendered(function () {
    const template = this;
    template.$("#question-title").css({
        height: template.$("#option-chooser").height,
    });
})

Template.question.helpers({
    evenSuffix(type) {
        return type % 2 ? "" : "-even";
    },
    leftRight(type) {
        return type % 2 ? "left" : "right";
    },
    headColor(type) {
        return colors[type % colors.length];
    }
});

Template.question.events({
    'click .option input'(event, template) {
        const index = event.target.id;
        const quesId = event.target.name;
        const session = template.data.session;
        Meteor.call('session.setChoice', session, quesId, index, function (err) {
            if (err) {
                console.log(err);
                Materialize.toast(err, 4000);
            }
        });
    },
});