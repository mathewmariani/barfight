'use strict';

var Batch = require("./batch.js");
var Tile = require("./tile.js");

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

	// TODO: we can combine tiles and other_tiles into a single array.
	// it would contain data for movement and ect..

	/**
	 * @type {Array}
	 */
	this.tiles = [];

	/**
	 * @type {Array}
	 */
	this.other_tiles = [];

	/**
	 * @type {Array}
	 */
	this.nodes = [];

	this.entities = new Batch();
};

// inherit PIXI.particles.ParticleContainer
// Map.prototype = Object.create(PIXI.particles.ParticleContainer.prototype);
// Map.prototype.constructor = Map;
Map.prototype = Object.create(PIXI.Container.prototype);
Map.prototype.constructor = Map;

Map.prototype.initialize = function() {
	for(var y = 0; y < this.h; ++y) {
		this.nodes[y] = [];
		for(var x = 0; x < this.w; ++x) {
			var tile = new Tile();
			var id = this.game.loader.resources["assets/image.json"].textures;
			if(y === 0 || y === this.h - 1 || x === 0 || x === this.w - 1) {
				tile.sprite = new PIXI.Sprite(id["blue.png"]);
			} else {
				tile.sprite = new PIXI.Sprite(id["pink.png"]);
			}

			// FIXME: these values shouldn't be "magic" numbers
			// acutally, they could be; soo we'll see?
			tile.sprite.position.x = x * 32;
			tile.sprite.position.y = y * 32;
			this.addChild(tile.sprite);

			this.nodes[y][x] = tile;
		}
	}

	this.game.world.addChild(this);
};

Map.prototype.addEntity = function(x, y, entity) {
	entity.sprite.position.x = x * 32;
	entity.sprite.position.y = y * 32;

	this.nodes[y][x].addEntity(entity);
	this.entities.addChild(entity.sprite);
};

Map.prototype.removeEntity = function(x, y, entity) {
	this.entities.removeChild(entity.sprite);
};

module.exports = Map;
