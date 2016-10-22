'use strict';

/**
 * Entity constructor
 */
var Entity = function(game, sprite) {

	// TODO: sprites from spritesheets
	var texture = PIXI.Texture.fromImage('assets/image.png');
	this.sprite = new PIXI.Sprite(texture);

	// move the ancho to the center
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;

	// move the sprite to the center of the screen
	this.sprite.position.x = 250;
	this.sprite.position.y = 250;

	// add the sprite to the current stage
	game.stage.addChild(this.sprite);
};

Entity.prototype = {

};

module.exports = Entity;
