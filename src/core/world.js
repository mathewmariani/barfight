'use strict';

var Camera = require('./camera.js');

/**
 * World constructor
 * container for all game objects.
 * @param {Game} game reference to game object
 */
var World = function(game) {

	// inherit from PIXI.Container
	PIXI.Container.call(this);

	/**
	 * @type {Game}
	 */
	this.game = game;

	/**
	 * @type {Camera}
	 */
	this.camera = null;

	// self initialize
	this.initialize();
};

// inherit PIXI.Container prototype
World.prototype = Object.create(PIXI.Container.prototype);
World.prototype.constructor = World;

/**
 * initialize world object
 */
World.prototype.initialize = function() {

	// create the camera object
	this.camera = new Camera(this.game);

	// attach this to the root scene
	this.game.container.addChild(this);
};

World.prototype.update = function() {
	this.camera.update();

	// update the coordinate of the world object relative to
	// the local coordinates of the parent container (this.container).
	this.position = new PIXI.Point(
		this.camera.position.x,
		this.camera.position.y
	);
}

module.exports = World;
