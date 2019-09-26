'use strict';

const { NaughtyMonitor, naughtyNameFunc, naughtyRunFunc } = require('../mocks/NaughtyMonitor');
const SingleMonitorHelper = require('../helper/SingleMonitorHelper');

test('Test Naughty Service Status Monitor', async () =>
{
	await SingleMonitorHelper(new NaughtyMonitor, 'naughty-monitor', false, naughtyNameFunc, naughtyRunFunc);
});
