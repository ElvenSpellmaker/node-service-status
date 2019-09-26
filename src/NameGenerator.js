'use strict';

/**
 * Used to generate names for Monitors that are missing a name.
 */
module.exports = class NameGenerator
{
	/**
	 * Creates a new NameGenerator object, setting up the prefix and suffix.
	 *
	 * @param {string} prefix The prefix to use.
	 */
	constructor(prefix = 'missing-name-')
	{
		this.prefix = prefix;
		this.suffix = 1;
	}

	/**
	 * Gets the next name, incrementing the suffix by one.
	 *
	 * @returns {string} Returns the generated name.
	 */
	getNextName()
	{
		return this.prefix + this.suffix++;
	}
};
