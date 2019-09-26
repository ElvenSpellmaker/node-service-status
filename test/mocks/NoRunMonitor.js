'use strict';

const ServiceStatusMonitor = require('../../src/ServiceStatusMonitor');

const name = jest.fn(() => 'no-run-monitor');

/**
 * `NoRunMonitor` has no `run` method.
 */
class NoRunMonitor extends ServiceStatusMonitor
{
}

NoRunMonitor.prototype.name = name;

module.exports = {
	NoRunMonitor: NoRunMonitor,
	noRunNameFunc: name,
};
