'use strict';

/**
 * Identification constructor
 */
var Identification = function() {
	// inherit from PIXI.Container
	PIXI.Container.call(this);
};

// inherit PIXI.Container prototype
Identification.prototype = Object.create(PIXI.Container.prototype);
Identification.prototype.constructor = Identification;

/**
 * initialize Identification object
 */
Identification.prototype.initialize = function() {
			var text = new PIXI.Text(
				"v0.0.0 pre-development",
				{
					fontFamily: "Courier New",
					fontSize: 12,
					fill: 0xffffff,
					align: "left"
				}
			);

			text.position.x = 15
			text.position.y = 490;

			this.addChild(text);
};

module.exports = Identification;
