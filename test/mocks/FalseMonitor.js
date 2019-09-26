'use strict';

const ServiceStatusMonitor = require('../../src/ServiceStatusMonitor');

const name = jest.fn(() => 'false-monitor');
const run = jest.fn(() => false );

/**
 * `FalseMonitor` returns `false`.
 */
class FalseMonitor extends ServiceStatusMonitor
{
}

FalseMonitor.prototype.name = name;
FalseMonitor.prototype.run = run;

module.exports = {
	FalseMonitor: FalseMonitor,
	falseNameFunc: name,
	falseRunFunc: run,
};
