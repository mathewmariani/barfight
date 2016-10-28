'use strict';

/**
 * Entity constructor
 * @param {Game} game   reference to game object
 */
var Entity = function(game, sprite) {

	this.game = game;

	var texture = this.game.loader.resources["assets/image.json"].textures;

	/**
	 * @type {PIXI.Sprite}
	 */
	this.sprite = new PIXI.Sprite(texture["yellow.png"]);

	// set the position
	this.sprite.position.x = 0;
	this.sprite.position.y = 0;

};

Entity.prototype = {

};

module.exports = Entity;
