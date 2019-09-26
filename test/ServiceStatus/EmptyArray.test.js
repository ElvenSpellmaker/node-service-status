'use strict';

const ServiceStatus = require('../../src/ServiceStatus');
const TestConsoleLogger = require('../mocks/TestConsoleLogger');

test('Empty Array Service Status Monitor', async () =>
{
	let ss = new ServiceStatus([], new TestConsoleLogger);

	expect(await ss.runMonitors()).toEqual({
		'successful': true,
		'monitors': [],
	});

	expect(await ss.runMonitor('foo')).toBe(null);
});
