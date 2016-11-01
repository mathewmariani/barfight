'use strict';

var Rectangle = require("../math/rectangle.js");
var Vector2 = require("../math/vector2.js");

/**
 * Camera constructor
 * @param {Game} game reference to game object
 */
var Camera = function(game) {
	
	/**
	 * @type {Game}
	 */
	this.game = game;

	/**
	 * @type {Vector2}
	 */
	this.position = new Vector2(0,0);

	/**
	 * @type {Rectangle}
	 */
	this.viewport = new Rectangle(
		this.position.x * (this.game.settings.tilesize * this.game.settings.scale),
		this.position.y * (this.game.settings.tilesize * this.game.settings.scale),
		game.width,
		game.height
	);

};

Camera.prototype = {
	update: function() {
		// NOTE: for now just circle around the origin (0,0)
		var angle = 1 * this.game.timer.elapsedTime;
		this.position.x = (this.viewport.w / 2) - Math.cos(angle)*32;
		this.position.y = (this.viewport.h / 2) - Math.sin(angle)*32;
	}
};

module.exports = Camera;
