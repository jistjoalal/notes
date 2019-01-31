import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';

import { AppRouter, onAuthChange } from '../imports/routes/routes';

import '../imports/startup/simple-schema-configuration';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);  
});

// render
Meteor.startup(() => {
  ReactDOM.render(<AppRouter />, document.getElementById('app'));
});