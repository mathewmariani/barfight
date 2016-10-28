'use strict';

var Batch = require("./batch.js");

/**
 * Map constructor
 * @param {Game} game reference to game object
 * @param {Number} x the x position of the map (default 0)
 * @param {Number} y the y position of the map (default 0)
 * @param {Number} w the width of this map (default 0)
 * @param {Number} h the height of this map (default 0)
 */
var Map = function(game, x, y, w, h) {

	// inherit from PIXI.particles.ParticleContainer
	//PIXI.particles.ParticleContainer.call(this);
	PIXI.Container.call(this);

	this.x = 0;
	this.y = 0;
	this.w = w || 0;
	this.h = h || 0;

	/**
	 * @type {Game}
	 */
	this.game = game;

	this.tiles = [];

	this.entities = new Batch();
};

// inherit PIXI.particles.ParticleContainer
// Map.prototype = Object.create(PIXI.particles.ParticleContainer.prototype);
// Map.prototype.constructor = Map;
Map.prototype = Object.create(PIXI.Container.prototype);
Map.prototype.constructor = Map;

Map.prototype.initialize = function() {
	for(var y = 0; y < this.h; ++y) {
		this.tiles[y] = [];
		for(var x = 0; x < this.w; ++x) {
			var tile = null;
			var id = this.game.loader.resources["assets/image.json"].textures;
			if(y === 0 || y === this.h - 1 || x === 0 || x === this.w - 1) {
				tile = new PIXI.Sprite(id["blue.png"]);
			} else {
				tile = new PIXI.Sprite(id["pink.png"]);
			}

			// FIXME: these values shouldn't be "magic" numbers
			// acutally, they could be; soo we'll see?
			tile.position.x = x * 32;
			tile.position.y = y * 32;
			this.addChild(tile);

			this.tiles[y][x] = tile;

		}
	}

	this.game.world.addChild(this);
};

module.exports = Map;
