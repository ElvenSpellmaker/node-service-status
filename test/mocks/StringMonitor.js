'use strict';

const ServiceStatusMonitor = require('../../src/ServiceStatusMonitor');

const name = jest.fn(() => 'string-monitor');
const run = jest.fn(() => 'hello');

/**
 * `StringMonitor` returns a string instead of a boolean value.
 */
class StringMonitor extends ServiceStatusMonitor
{
}

StringMonitor.prototype.name = name;
StringMonitor.prototype.run = run;

module.exports = {
	StringMonitor: StringMonitor,
	stringNameFunc: name,
	stringRunFunc: run,
};
