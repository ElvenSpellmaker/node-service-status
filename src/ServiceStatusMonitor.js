'use strict';

/**
 * All Service Status Montiors should extend this class and override the two
 * "interface" methods provided to be valid.
 */
module.exports = class ServiceStatusMonitor
{
	/* eslint-disable jsdoc/require-returns-check */
	/**
	 * Returns the name of the monitor. Note the name should be assumed to be
	 * URL friendly.
	 *
	 * @returns {string} The string. eslint-disable-line jsdoc/require-returns-check
	 */
	name()
	{
		throw new Error('Extending Classes need to implement this method ' + this.name.name + '()!');
	}
	/* eslint-enable jsdoc/require-returns-check */

	/* eslint-disable jsdoc/require-returns-check */
	/**
	 * Runs the monitor, may be async and should return `true` if the monitor
	 * succeeded and any other value for false.
	 *
	 * @returns {string} The string. eslint-disable-line jsdoc/require-returns-check
	 */
	run()
	{
		throw new Error('Extending Classes need to implement this method ' + this.run.name + '()!');
	}
	/* eslint-enable jsdoc/require-returns-check */
};
