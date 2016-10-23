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

	// TODO: right now the camera is a single point (this.position)
	// it needs to have a viewport so we can use its center
	// NOTE: right now the camera's top-left is where the position is set
	// TODO: add zoom or "scale"

	// FIXME: use rectangles
	this.viewport = {
		x: 0, y: 0,
		w: game.width,
		h: game.height
	};

};

Camera.prototype = {
	update: function() {
		// NOTE: for now just circle around the origin (0,0)
		var angle = 1 * this.game.timer.elapsedTime;

		this.position.x = (this.viewport.w / 2)  - Math.cos(angle)*32;
		this.position.y = (this.viewport.h / 2) - Math.sin(angle)*32;
	}
};

module.exports = Camera;
