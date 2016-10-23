'use strict';

/**
 * Entity constructor
 * @param {Game} game   reference to game object
 * @param {String} sprite [description]
 */
var Entity = function(game, sprite) {

	// TODO: sprites from spritesheets
	var texture = PIXI.Texture.fromImage('assets/image.png');

	/**
	 * @type {PIXI.Sprite}
	 */
	this.sprite = new PIXI.Sprite(texture);

	// move the ancho to the center
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;

	// move the sprite to the center of the screen
	this.sprite.position.x = 250;
	this.sprite.position.y = 250;


	// add the sprite to the world... where it belongs
	// NOTE: I belong to the map that created me, but were not there yet
	game.world.addChild(this.sprite);
};

Entity.prototype = {

};

module.exports = Entity;
