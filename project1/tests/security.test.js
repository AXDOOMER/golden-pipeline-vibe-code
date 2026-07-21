'use strict';

const assert = require('assert');
const app = require('../src/server.js');

assert.strictEqual(typeof app, 'function', 'Express app should be exported as a function');

console.log('security.test.js: OK');
