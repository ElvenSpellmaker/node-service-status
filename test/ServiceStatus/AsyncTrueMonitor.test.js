'use strict';

const SingleMonitorHelper = require('../helper/SingleMonitorHelper');
const { AsyncTrueMonitor, asyncTrueNameFunc, asyncTrueRunFunc } = require('../mocks/AsyncTrueMonitor');

test('Test Async-True Service Status Monitor', async () =>
{
	await SingleMonitorHelper(new AsyncTrueMonitor, 'async-true-monitor', true, asyncTrueNameFunc, asyncTrueRunFunc);
});
