'use strict';

const { AsyncRejectMonitor, asyncRejectNameFunc, asyncRejectRunFunc } = require('../mocks/AsyncRejectMonitor');
const SingleMonitorHelper = require('../helper/SingleMonitorHelper');

test('Test Async-Reject Service Status Monitor', async () =>
{
	await SingleMonitorHelper(new AsyncRejectMonitor, 'async-reject-monitor', false, asyncRejectNameFunc, asyncRejectRunFunc);
});
