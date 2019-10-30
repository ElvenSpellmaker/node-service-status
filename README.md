Node Service Status [![Build Status](https://travis-ci.com/ElvenSpellmaker/node-service-status.svg?branch=master)](https://travis-ci.com/ElvenSpellmaker/node-service-status) [![npm version](https://badge.fury.io/js/%40elvenspellmaker%2Fnode-service-status.svg)](https://badge.fury.io/js/%40elvenspellmaker%2Fnode-service-status)
===================

This library provides a mechanism to generate an object from a list of service
status monitors and provdies the ability to either run all monitors or just one.

Requirements
------------

A modern Node that understands classes and async/await.

Usage
-----

`npm install --save @elvenspellmaker/node-service-status`

Then define a monitor, create a class extending the `ServiceStatusMonitor`
class, making sure to override both the `name()` and `run()` methods.
Note: `run()` may be an async method returning a Promise, however `name()`
should ***NOT*** be.
```js
"use strict";

const ServiceStatusMonitor = require('@elvenspellmaker/node-service-status').ServiceStatusMonitor;

class DbCanConnectMonitor extends ServiceStatusMonitor
{
	// Some constructor taking in a db

	name()
	{
		return 'db-can-connect';
	}

	async run()
	{
		return await this.db.auth();
	}
}
```

Monitors should return Boolean `true` if successful and any other value if
unsuccessful. Promises will be resolved and unpacked to see if the value is
Boolean `true`.

In order to consume service status monitors, create an instance of
`ServiceStatus` and pass in an array of monitors.
```js
const ServiceStatus = require('@elvenspellmaker/node-service-status').ServiceStatus;
const DbCanConnectMonitor = require('../monitor/DbCanConnectMonitor');

const ss = new ServiceStatus([
	new DbCanConnectMonitor(db),
]);
```

Then by calling `runMonitors()` or `runMonitor(monitorName)` you may run all
monitors or a single monitor. The returned object will either be a single status
object or an object containing all the statuses and the overall status.
Both object types have a top-level parameter `successful` which gives the
overall success of the monitors.
For example as JSON:
```json
{
	"successful": false,
	"monitors": [
		{
			"successful": true,
			"monitorName": "true-monitor"
		},
		{
			"successful": false,
			"monitorName": "false-monitor"
		}
	]
}
```
or
```json
{
	"successful": false,
	"monitorName": "false-monitor"
}
```

If calling the `runMonitors()` method, all monitors will be run and will resolve
eventually and so the method must be `await`ed if the value is wanted, such as
to output from a route:
```js
const ssResult = await ss.runMonitors();
```

If calling the `runMonitor()` method and the passed monitor name is not found,
`null` will be returned which indicates that the monitor does not exist.
It is suggested this would be treated as a `404` by your application.

If calling either method and the top-level `successful` key is `false`
this means one or more of the monitors has failed and it is suggested this is
treated as a `503` by your application as the service is broken in some way.

If calling either method and the top-level `successful` key is `true` all
monitors passed and it is suggested that this would be treated as a `200` by
your application.

## Notes

1. Name should ***NOT*** be async, and should return a string. If the name
   method is is missing then a name will be generated in the form of
   `missing-name-<<number>>` where missing number is incremented for each
   monitor with a missing name, and this monitor will always return `false`
   to indicate failure.
2. With the default logger, when `NODE_ENV` environment variable is set, any
   Errors will be console logged and the service status will continue as
   gracefully as possible. In all other environments any Errors will be thrown
   as Errors for easier debugging.
