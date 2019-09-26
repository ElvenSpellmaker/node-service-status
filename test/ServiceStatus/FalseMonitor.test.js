'use strict';

const { FalseMonitor, falseNameFunc, falseRunFunc } = require('../mocks/FalseMonitor');
const SingleMonitorHelper = require('../helper/SingleMonitorHelper');

test('Test False Service Status Monitor', async () =>
{
	await SingleMonitorHelper(new FalseMonitor, 'false-monitor', false, falseNameFunc, falseRunFunc);
});
