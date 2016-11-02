'use strict';

/**
 * Identification constructor
 * @param {Game} game reference to game object
 */
var Identification = function(game) {

	// inherit from PIXI.Container
	PIXI.Container.call(this);

	/**
	 * @type {Game}
	 */
	this.game = game;

};

// inherit PIXI.Container prototype
Identification.prototype = Object.create(PIXI.Container.prototype);
Identification.prototype.constructor = Identification;

/**
 * initialize Identification object
 */
Identification.prototype.initialize = function() {
			var text = new PIXI.Text(
				"Barfight Roguelike v0.0.0 pre-development",
				{
					fontFamily: "Courier New",
					fontSize: 12,
					fill: 0xffffff,
					align: "left"
				}
			);

			text.position.x = 15
			text.position.y = this.game.height-24;

			this.addChild(text);
};

module.exports = Identification;
