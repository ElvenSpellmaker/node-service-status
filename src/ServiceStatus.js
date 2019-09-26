'use strict';

const ConsoleLogger = require('./ConsoleLogger');
const Logger = require('./Logger');
const NameGenerator = require('./NameGenerator');
const ServiceStatusMonitor = require('./ServiceStatusMonitor');

/**
 * ServiceStatus is the class that ingests monitors and may run one or all
 * monitors to get a status object back.
 */
module.exports = class ServiceStatus
{
	/**
	 * Constructor.
	 *
	 * @param {ServiceStatusMonitor[]} monitors The monitor list to check. All
	 * monitors should inherit the `ServiceStatusMonitor` class.
	 * @param {Logger} logger The logger to use, defaults to a `ConsoleLogger`.
	 * If the logger isn't in instance of `Logger` a warning will be written and
	 * a `ConsoleLogger` used instead.
	 */
	constructor(monitors = [], logger = null)
	{
		this._monitors = {};
		this._monitorsArray = [];

		this.nameGenerator = new NameGenerator;

		this._setLogger(logger);
		this._setupMonitors(monitors);
	}

	/**
	 * Runs all the monitors and returns the status object.
	 *
	 * @returns {object} Returns the status object for running all monitors.
	 */
	async runMonitors()
	{
		let statuses = {
			successful: true,
			monitors: [],
		};

		let monitorResults = [];

		try
		{
			monitorResults = await Promise.all(this._monitorsArray.map(async monitor =>
			{
				let status = false;

				try
				{
					status = await monitor.run() === true;
				}
				catch (error)
				{
					this.logger.handleError(error);
				}

				if (status === false)
				{
					statuses.successful = false;
				}

				return {
					monitorName: monitor.name(),
					successful: status,
				};
			}));
		}
		catch (error)
		{
			statuses.successful = false;
			this.logger.handleError(error);
		}

		statuses.monitors = monitorResults;

		return statuses;
	}

	/**
	 * Runs a single monitor by its name and returns its status object singly.
	 *
	 * @param {string} name The name of the monitor to run.
	 *
	 * @returns {object} The single status object for name or `null` if the
	 * monitor doesn't exist.
	 */
	async runMonitor(name)
	{
		let status = null;

		try
		{
			let monitor = this._monitors[name];

			status = {
				monitorName: monitor.name(),
				successful: false,
			};

			let monitorStatus =  await monitor.run() === true;

			status.successful = monitorStatus;
		}
		catch(error)
		{
			this.logger.handleError(error);
		}

		return status;
	}

	/**
	 * Sets up a logger to use.
	 *
	 * @param {Logger} logger The logger to use.
	 */
	_setLogger(logger)
	{
		if (logger === null)
		{
			logger = new ConsoleLogger;
		}

		if (! (logger instanceof Logger))
		{
			console.warn('The logger passed isn\'t of type `Logger`, creating a default `ConsoleLogger` instead');
			logger = new ConsoleLogger;
		}

		this.logger = logger;
	}

	/**
	 * Sets up the monitors hash and list, generating names if need-be.
	 *
	 * @param {ServiceStatusMonitor[]} monitors The monitors to use.
	 */
	_setupMonitors(monitors)
	{
		monitors.forEach((monitor) =>
		{
			if (! (monitor instanceof ServiceStatusMonitor))
			{
				this.logger.handleError('Monitor passed is not an instance of ServiceStatusMonitor!');
			}

			let name = '';

			try
			{
				name = monitor.name();
			}
			catch (error)
			{
				this.logger.handleError('Monitor of class `' + monitor.constructor.name + '` is missing a name! Generating name and failing monitor!');
				name = this.nameGenerator.getNextName();
				monitor.name = () => name;
				monitor.run = () => false;
			}

			this._monitors[name] = monitor;
			this._monitorsArray.push(monitor);
		});
	}
};
