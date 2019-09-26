'use strict';

const ServiceStatusMonitor = require('../../src/ServiceStatusMonitor');

const run = jest.fn(() => true);

/**
 * `NoNameMonitor` has no `name` method.
 */
class NoNameMonitor extends ServiceStatusMonitor
{
}

NoNameMonitor.prototype.run = run;

module.exports = {
	NoNameMonitor: NoNameMonitor,
	noNameRunFunc: run,
};
