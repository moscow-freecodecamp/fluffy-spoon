// const test = require('ava');
// const mongoose = require('mongoose');
// const mockgoose = require('mockgoose');
//
// test.before(() => mockgoose(mongoose));
// test.afterEach(() => mockgoose.reset());

// To get normal classnames instead of CSS Modules classnames for testing
require('mock-css-modules');

// Ignore assets
require.extensions['.jpg'] = noop => noop;
require.extensions['.jpeg'] = noop => noop;
require.extensions['.png'] = noop => noop;
require.extensions['.gif'] = noop => noop;

require('babel-register');
require('babel-polyfill');

global.document = require('jsdom').jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;
