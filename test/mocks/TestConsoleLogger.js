'use strict';

const Logger = require('../../src/Logger');

/**
 * Test console logger does nothing.
 */
module.exports = class TestConsoleLogger extends Logger
{
	/* eslint-disable no-unused-vars */
	/**
	 * @inheritdoc
	 */
	handleError(error)
	{
	}
	/* eslint-enable no-unused-vars */
};
