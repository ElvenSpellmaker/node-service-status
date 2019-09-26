const elvenspellmakerServiceStatus = require('./index.js');

class Foo extends elvenspellmakerServiceStatus.ServiceStatusMonitor
{
	run()
	{
		return 'dicks';
	}

	name()
	{
		return 'foo';
	}
}

class Bar extends elvenspellmakerServiceStatus.ServiceStatusMonitor
{
	run()
	{
		return true;
	}

	name()
	{
		return 'bar';
	}
}

const serviceStatus = new elvenspellmakerServiceStatus.ServiceStatus([
	new Foo,
	new Bar,
]);

(async () => {
	let output = await serviceStatus.runMonitors();

	console.log(JSON.stringify(output));
})();
