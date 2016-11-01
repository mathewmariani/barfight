'use strict';

/**
 * Tooltip constructor
 * @param {Game} game reference to game object
 */
var Tooltip = function(game) {

	// inherit from PIXI.Container
	PIXI.Container.call(this);

	/**
	 * @type {Game}
	 */
	this.game = game;

  /**
   * @type {PIXI.Text}
   */
	this.text = null;

};

// inherit PIXI.Container prototype
Tooltip.prototype = Object.create(PIXI.Container.prototype);
Tooltip.prototype.constructor = Tooltip;

/**
 * initialize Identification object
 */
Tooltip.prototype.initialize = function() {
	this.text = new PIXI.Text(
		"Tooltip : ?",
		{
			fontFamily: "Courier New",
			fontSize: 12,
			fill: 0xffffff,
			align: "left"
		}
	);

	this.text.position.x = 15
	this.text.position.y = this.game.height-72;

	this.addChild(this.text);
};

Tooltip.prototype.update = function(value) {
	this.text.text = ("Tooltip : there are "+value+" entities here.");
};

module.exports = Tooltip;
