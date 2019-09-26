'use strict';

const ServiceStatusMonitor = require('../../src/ServiceStatusMonitor');

const name = jest.fn(() => 'async-true-monitor');
const run = jest.fn(async () => Promise.resolve(true) );

/**
 * `AsyncTrueMonitor` returns a resolved promise to `true`.
 */
class AsyncTrueMonitor extends ServiceStatusMonitor
{
}

AsyncTrueMonitor.prototype.name = name;
AsyncTrueMonitor.prototype.run = run;

module.exports = {
	AsyncTrueMonitor: AsyncTrueMonitor,
	asyncTrueNameFunc: name,
	asyncTrueRunFunc: run,
};
