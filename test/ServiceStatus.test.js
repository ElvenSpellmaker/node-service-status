'use strict';

const ServiceStatus = require('../src/ServiceStatus');
const { TrueMonitor, trueNameFunc, trueRunFunc } = require('./mocks/TrueMonitor');
const { FalseMonitor, falseNameFunc, falseRunFunc } = require('./mocks/FalseMonitor');
const { NaughtyMonitor, naughtyNameFunc, naughtyRunFunc } = require('./mocks/NaughtyMonitor');
const { StringMonitor, stringNameFunc, stringRunFunc } = require('./mocks/StringMonitor');
const { AsyncTrueMonitor, asyncTrueNameFunc, asyncTrueRunFunc } = require('./mocks/AsyncTrueMonitor');
const { AsyncRejectMonitor, asyncRejectNameFunc, asyncRejectRunFunc } = require('./mocks/AsyncRejectMonitor');
const { NoNameMonitor, noNameRunFunc } = require('./mocks/NoNameMonitor');
const { NoRunMonitor, noRunNameFunc } = require('./mocks/NoRunMonitor');
const TestConsoleLogger = require('./mocks/TestConsoleLogger');

test('Test All Test Service Status Monitors', async () =>
{
	let noNameMonitor = new NoNameMonitor;

	let noNameDefaultNameFunc = jest.spyOn(noNameMonitor, 'name');

	let ss = new ServiceStatus(
		[
			new TrueMonitor,
			new FalseMonitor,
			new NaughtyMonitor,
			new StringMonitor,
			new AsyncTrueMonitor,
			new AsyncRejectMonitor,
			noNameMonitor,
			new NoRunMonitor,
		],
		new TestConsoleLogger,
	);

	expect(trueNameFunc).toHaveBeenCalledTimes(1);
	expect(trueRunFunc).toHaveBeenCalledTimes(0);
	expect(falseNameFunc).toHaveBeenCalledTimes(1);
	expect(falseRunFunc).toHaveBeenCalledTimes(0);
	expect(naughtyNameFunc).toHaveBeenCalledTimes(1);
	expect(naughtyRunFunc).toHaveBeenCalledTimes(0);
	expect(stringNameFunc).toHaveBeenCalledTimes(1);
	expect(stringRunFunc).toHaveBeenCalledTimes(0);
	expect(asyncTrueNameFunc).toHaveBeenCalledTimes(1);
	expect(asyncTrueRunFunc).toHaveBeenCalledTimes(0);
	expect(asyncRejectNameFunc).toHaveBeenCalledTimes(1);
	expect(asyncRejectRunFunc).toHaveBeenCalledTimes(0);

	expect(noRunNameFunc).toHaveBeenCalledTimes(1);

	// Functions are replaced and so don't get called the same amount of times.
	expect(noNameDefaultNameFunc).toHaveBeenCalledTimes(1);
	expect(noNameRunFunc).toHaveBeenCalledTimes(0);

	let trueMonitorObject = {
		'successful': true,
		'monitorName': 'true-monitor',
	};

	let falseMonitorObject = {
		'successful': false,
		'monitorName': 'false-monitor',
	};

	let naughtyMonitorObject = {
		'successful': false,
		'monitorName': 'naughty-monitor',
	};

	let stringMonitorObject = {
		'successful': false,
		'monitorName': 'string-monitor',
	};

	let asyncTrueMonitorObject = {
		'successful': true,
		'monitorName': 'async-true-monitor',
	};

	let asyncRejectMonitorObject = {
		'successful': false,
		'monitorName': 'async-reject-monitor',
	};

	let noNameMonitorObject = {
		'successful': false,
		'monitorName': 'missing-name-1',
	};

	let noRunMonitorObject = {
		'successful': false,
		'monitorName': 'no-run-monitor',
	};

	let monitorArray = [
		trueMonitorObject,
		falseMonitorObject,
		naughtyMonitorObject,
		stringMonitorObject,
		asyncTrueMonitorObject,
		asyncRejectMonitorObject,
		noNameMonitorObject,
		noRunMonitorObject,
	];

	expect(await ss.runMonitors()).toEqual({
		'successful': false,
		'monitors': monitorArray,
	});

	expect(trueNameFunc).toHaveBeenCalledTimes(2);
	expect(trueRunFunc).toHaveBeenCalledTimes(1);
	expect(falseNameFunc).toHaveBeenCalledTimes(2);
	expect(falseRunFunc).toHaveBeenCalledTimes(1);
	expect(naughtyNameFunc).toHaveBeenCalledTimes(2);
	expect(naughtyRunFunc).toHaveBeenCalledTimes(1);
	expect(stringNameFunc).toHaveBeenCalledTimes(2);
	expect(stringRunFunc).toHaveBeenCalledTimes(1);
	expect(asyncTrueNameFunc).toHaveBeenCalledTimes(2);
	expect(asyncTrueRunFunc).toHaveBeenCalledTimes(1);
	expect(asyncRejectNameFunc).toHaveBeenCalledTimes(2);
	expect(asyncRejectRunFunc).toHaveBeenCalledTimes(1);

	expect(noRunNameFunc).toHaveBeenCalledTimes(2);

	// Functions are replaced and so don't get called the same amount of times.
	expect(noNameDefaultNameFunc).toHaveBeenCalledTimes(1);
	expect(noNameRunFunc).toHaveBeenCalledTimes(0);

	expect(await ss.runMonitor('true-monitor')).toEqual(trueMonitorObject);
	expect(await ss.runMonitor('false-monitor')).toEqual(falseMonitorObject);
	expect(await ss.runMonitor('naughty-monitor')).toEqual(naughtyMonitorObject);
	expect(await ss.runMonitor('string-monitor')).toEqual(stringMonitorObject);
	expect(await ss.runMonitor('async-true-monitor')).toEqual(asyncTrueMonitorObject);
	expect(await ss.runMonitor('async-reject-monitor')).toEqual(asyncRejectMonitorObject);
	expect(await ss.runMonitor('missing-name-1')).toEqual(noNameMonitorObject);
	expect(await ss.runMonitor('no-run-monitor')).toEqual(noRunMonitorObject);
	expect(await ss.runMonitor('foo')).toBe(null);
	expect(await ss.runMonitor('')).toBe(null);
	expect(await ss.runMonitor(undefined)).toBe(null);


	expect(trueNameFunc).toHaveBeenCalledTimes(3);
	expect(trueRunFunc).toHaveBeenCalledTimes(2);
	expect(falseNameFunc).toHaveBeenCalledTimes(3);
	expect(falseRunFunc).toHaveBeenCalledTimes(2);
	expect(naughtyNameFunc).toHaveBeenCalledTimes(3);
	expect(naughtyRunFunc).toHaveBeenCalledTimes(2);
	expect(stringNameFunc).toHaveBeenCalledTimes(3);
	expect(stringRunFunc).toHaveBeenCalledTimes(2);
	expect(asyncTrueNameFunc).toHaveBeenCalledTimes(3);
	expect(asyncTrueRunFunc).toHaveBeenCalledTimes(2);
	expect(asyncRejectNameFunc).toHaveBeenCalledTimes(3);
	expect(asyncRejectRunFunc).toHaveBeenCalledTimes(2);
	expect(noRunNameFunc).toHaveBeenCalledTimes(3);

	// Functions are replaced and so don't get called.
	expect(noNameDefaultNameFunc).toHaveBeenCalledTimes(1);
	expect(noNameRunFunc).toHaveBeenCalledTimes(0);
});
