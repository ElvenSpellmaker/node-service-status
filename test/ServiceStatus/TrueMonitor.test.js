'use strict';

const SingleMonitorHelper = require('../helper/SingleMonitorHelper');
const { TrueMonitor, trueNameFunc, trueRunFunc } = require('../mocks/TrueMonitor');

test('Test True Service Status Monitor', async () =>
{
	await SingleMonitorHelper(new TrueMonitor, 'true-monitor', true, trueNameFunc, trueRunFunc);
});
