// Defines client side routing

import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import { Sessions } from '/imports/api/sessions';

// Import needed templates
import '/imports/ui/layouts/body/body.js';
import '/imports/ui/pages/home/home.js';
import '/imports/ui/pages/session/start.js';
import '/imports/ui/pages/session/main.js';
import '/imports/ui/pages/not-found/not-found.js';


// Set up all routes in the app
FlowRouter.route('/', {
    name: 'App.home',
    action() {
        BlazeLayout.render('App_body', { main: 'App_home' });
    },
});

FlowRouter.route('/session', {
    name: 'App.session.start',
    action() {
        BlazeLayout.render('App_body', { main: 'App_session_start' });
    }
});

FlowRouter.route('/session/:_id', {
    name: 'App.session.main',
    action(params) {
        BlazeLayout.render('App_body', { main: 'App_session_main' });
    }
});

FlowRouter.notFound = {
    action() {
        BlazeLayout.render('App_body', { main: 'App_notFound' });
    },
};
