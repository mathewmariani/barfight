'use strict';

/**
 * Camera constructor
 * @param {Game} game reference to game object
 */
var Camera = function(game) {
	/**
	 * @type {Game}
	 */
	this.game = game;

	// FIXME: use vectors
	this.position = {
		x: 0, y: 0
	};

	// FIXME: use rectangles
	this.viewport = {
		x: 0, y: 0, w: 32, h: 32
	};

	// TODO: right now the camera is a single point (this.position)
	// it needs to have a viewport so we can use its center
	// NOTE: right now the camera's top-left is where the position is set
};

Camera.prototype = {
	update: function() {
		var angle = 1 * this.game.timer.elapsedTime;
		this.position.x = Math.cos(angle)*32;
		this.position.y = Math.sin(angle)*32;
	}
};

module.exports = Camera;
