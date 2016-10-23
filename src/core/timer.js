'use strict';

/**
 * Timer constructor
 * NOTE: this might be useless...
 */
var Timer = function() {
	this.elapsedTime = 0;
	this.startTime = Date.now();
};

Timer.prototype = {
	update: function() {
		this.elapsedTime = (Date.now() - this.startTime) / 1000;
	}
};

module.exports = Timer;
