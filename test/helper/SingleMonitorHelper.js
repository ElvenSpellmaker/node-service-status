'use strict';

const ServiceStatus = require('../../src/ServiceStatus');
const TestConsoleLogger = require('../mocks/TestConsoleLogger');

module.exports = async (statusMonitor, statusMonitorName, expected, nameFunc, runFunc) =>
{
	let ss = new ServiceStatus([statusMonitor], new TestConsoleLogger);

	expect(nameFunc).toHaveBeenCalledTimes(1);
	expect(runFunc).toHaveBeenCalledTimes(0);

	let monitorObject = {
		'successful': expected,
		'monitorName': statusMonitorName,
	};

	expect(await ss.runMonitors()).toEqual({
		'successful': expected,
		'monitors': [
			monitorObject,
		],
	});

	expect(nameFunc).toHaveBeenCalledTimes(2);
	expect(runFunc).toHaveBeenCalledTimes(1);

	expect(await ss.runMonitor(statusMonitorName)).toEqual(monitorObject);
	expect(await ss.runMonitor('foo')).toBe(null);

	expect(nameFunc).toHaveBeenCalledTimes(3);
	expect(runFunc).toHaveBeenCalledTimes(2);
};
