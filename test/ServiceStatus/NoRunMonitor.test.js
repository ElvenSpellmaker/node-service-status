'use strict';

const { NoRunMonitor, noRunNameFunc } = require('../mocks/NoRunMonitor');
const ServiceStatus = require('../../src/ServiceStatus');
const TestConsoleLogger = require('../mocks/TestConsoleLogger');

test('Test No Run Service Status Monitor', async () =>
{
	let noRunMonitor = new NoRunMonitor;

	let noRunDefaultRunFunc = jest.spyOn(noRunMonitor, 'run');

	let ss = new ServiceStatus(
		[noRunMonitor],
		new TestConsoleLogger,
	);

	expect(noRunNameFunc).toHaveBeenCalledTimes(1);
	expect(noRunDefaultRunFunc).toHaveBeenCalledTimes(0);

	let monitorObject = {
		'successful': false,
		'monitorName': 'no-run-monitor',
	};

	expect(await ss.runMonitors()).toEqual({
		'successful': false,
		'monitors': [
			monitorObject,
		],
	});

	expect(noRunNameFunc).toHaveBeenCalledTimes(2);
	expect(noRunDefaultRunFunc).toHaveBeenCalledTimes(1);

	expect(await ss.runMonitor('no-run-monitor')).toEqual(monitorObject);
	expect(await ss.runMonitor('foo')).toBe(null);


	expect(noRunNameFunc).toHaveBeenCalledTimes(3);
	expect(noRunDefaultRunFunc).toHaveBeenCalledTimes(2);
});
