'use strict';

const ServiceStatusMonitor = require('../../src/ServiceStatusMonitor');

const name = jest.fn(() => 'true-monitor');
const run = jest.fn(() => true );

/**
 * `TrueMonitor` always returns `true`.
 */
class TrueMonitor extends ServiceStatusMonitor
{
}

TrueMonitor.prototype.name = name;
TrueMonitor.prototype.run = run;

module.exports = {
	TrueMonitor: TrueMonitor,
	trueNameFunc: name,
	trueRunFunc: run,
};
