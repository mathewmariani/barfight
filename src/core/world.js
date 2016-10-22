'use strict';

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
	this.game.container.addChild(this);
};

module.exports = World;
