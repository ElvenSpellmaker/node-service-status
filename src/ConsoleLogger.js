'use strict';

const Logger = require('./Logger');

/**
 * Console logger will throw Errors as `Error` in all environments but
 * production. In Production errors witll be `console.error()`ed and the code
 * should continue.
 */
module.exports = class ConsoleLogger extends Logger
{
	/**
	 * Handles the error message, by logging an error in production and throwing
	 * an `Error` in other environments.
	 *
	 * @param {string} error The error string to handle.
	 */
	handleError(error)
	{
		let env = process.env.NODE_ENV;

		if (env === 'production')
		{
			console.error(error);
			return;
		}

		throw new Error(error);
	}
};
