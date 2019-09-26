'use strict';

const ServiceStatusMonitor = require('../../src/ServiceStatusMonitor');

const name = jest.fn(() => 'naughty-monitor');
const run = jest.fn(() =>
{
	throw new Error;
});

/**
 * `NaughtyMonitor` throws an Error.
 */
class NaughtyMonitor extends ServiceStatusMonitor
{
}

NaughtyMonitor.prototype.name = name;
NaughtyMonitor.prototype.run = run;

module.exports = {
	NaughtyMonitor: NaughtyMonitor,
	naughtyNameFunc: name,
	naughtyRunFunc: run,
};
