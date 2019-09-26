'use strict';

const ServiceStatusMonitor = require('../../src/ServiceStatusMonitor');

const name = jest.fn(() => 'async-reject-monitor');
const run = jest.fn(async () => Promise.reject(true) );

/**
 * `AsyncRejectMonitor` returns a rejected promise.
 */
class AsyncRejectMonitor extends ServiceStatusMonitor
{
}

AsyncRejectMonitor.prototype.name = name;
AsyncRejectMonitor.prototype.run = run;

module.exports = {
	AsyncRejectMonitor: AsyncRejectMonitor,
	asyncRejectNameFunc: name,
	asyncRejectRunFunc: run,
};
