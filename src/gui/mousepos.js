'use strict';

/**
 * MousePos constructor
 * @param {Game} game reference to game object
 */
var MousePos = function(game) {

	// inherit from PIXI.Container
	PIXI.Container.call(this);

	/**
	 * @type {Game}
	 */
	this.game = game;

	this.text = null;

};

// inherit PIXI.Container prototype
MousePos.prototype = Object.create(PIXI.Container.prototype);
MousePos.prototype.constructor = MousePos;

/**
 * initialize Identification object
 */
MousePos.prototype.initialize = function() {
	this.text = new PIXI.Text(
		"Mouse Position : (?, ?)",
		{
			fontFamily: "Courier New",
			fontSize: 12,
			fill: 0xffffff,
			align: "left"
		}
	);

	this.text.position.x = 15
	this.text.position.y = this.game.height-48;

	this.addChild(this.text);
};

MousePos.prototype.update = function(position) {
	this.text.text = ("Mouse Position : ("+position.x+", "+position.y+")");
};

module.exports = MousePos;
