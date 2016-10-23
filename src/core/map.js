'use strict';

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
	PIXI.particles.ParticleContainer.call(this);

	/**
	 * @type {Game}
	 */
	this.game = game;

	this.x = 0;
	this.y = 0;
	this.w = w || 0;
	this.h = h || 0;

	this.tiles = [];
};

// inherit PIXI.particles.ParticleContainer
Map.prototype = Object.create(PIXI.particles.ParticleContainer.prototype);
Map.prototype.constructor = Map;

Map.prototype.initialize = function() {
	// TODO: sprites from spritesheets
	var texture = PIXI.Texture.fromImage('assets/image.png');

	for(var y = 0; y < this.h; ++y) {
		this.tiles[y] = [];
		for(var x = 0; x < this.w; ++x) {

			// TODO: sprites from spritesheets
			var tile = new PIXI.Sprite(texture);

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
