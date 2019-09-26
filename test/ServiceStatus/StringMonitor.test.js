'use strict';

const SingleMonitorHelper = require('../helper/SingleMonitorHelper');
const { StringMonitor, stringNameFunc, stringRunFunc } = require('../mocks/StringMonitor');

test('Test String Service Status Monitor', async () =>
{
	await SingleMonitorHelper(new StringMonitor, 'string-monitor', false, stringNameFunc, stringRunFunc);
});
