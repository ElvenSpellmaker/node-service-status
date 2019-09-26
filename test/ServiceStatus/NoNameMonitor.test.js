'use strict';

const ServiceStatus = require('../../src/ServiceStatus');
const { NoNameMonitor, noNameRunFunc } = require('../mocks/NoNameMonitor');
const TestConsoleLogger = require('../mocks/TestConsoleLogger');

test('Test No Name Service Status Monitor', async () =>
{
	let noNameMonitor = new NoNameMonitor;

	let noNameDefaultNameFunc = jest.spyOn(noNameMonitor, 'name');

	let ss = new ServiceStatus(
		[noNameMonitor],
		new TestConsoleLogger,
	);

	// Functions are replaced and so don't get called.
	expect(noNameDefaultNameFunc).toHaveBeenCalledTimes(1);
	expect(noNameRunFunc).toHaveBeenCalledTimes(0);

	let monitorObject = {
		'successful': false,
		'monitorName': 'missing-name-1',
	};

	expect(await ss.runMonitors()).toEqual({
		'successful': false,
		'monitors': [
			monitorObject,
		],
	});

	// Functions are replaced and so don't get called.
	expect(noNameDefaultNameFunc).toHaveBeenCalledTimes(1);
	expect(noNameRunFunc).toHaveBeenCalledTimes(0);

	expect(await ss.runMonitor('no-name-monitor')).toBe(null);
	expect(await ss.runMonitor('foo')).toBe(null);

	expect(await ss.runMonitor('missing-name-1')).toEqual(monitorObject);

	expect(noNameDefaultNameFunc).toHaveBeenCalledTimes(1);
	expect(noNameRunFunc).toHaveBeenCalledTimes(0);
});
