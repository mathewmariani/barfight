'use strict';

/**
 * Batch constructor
 */
var Batch = function() {

	// inherit from PIXI.Container
	PIXI.Container.call(this);

};

// inherit PIXI.Container prototype
Batch.prototype = Object.create(PIXI.Container.prototype);
Batch.prototype.constructor = Batch;

module.exports = Batch;
