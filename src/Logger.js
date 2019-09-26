'use strict';

/**
 * Logger is the base class for handling errors inside ServiceStatus.
 */
module.exports = class Logger
{
	/**
	 * Handles the error string passed to it.
	 *
	 * @param {string} error The error string to handle.
	 */
	handleError(error) // eslint-disable-line no-unused-vars
	{
		throw new Error('Extending Classes need to implement this method ' + this.handleError.name + '()!');
	}
};
