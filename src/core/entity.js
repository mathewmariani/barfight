'use strict';

/**
 * Entity constructor
 * @param {Game} game   reference to game object
 */
var Entity = function(game, name) {

	/**
	 * @type {Game}
	 */
	this.game = game;

	/**
	 * @type {String}
	 */
	this.name = name;

	var texture = this.game.loader.resources["assets/image.json"].textures;

	/**
	 * @type {PIXI.Sprite}
	 */
	this.sprite = new PIXI.Sprite(texture["yellow.png"]);

	// NOTE: this is a quick an easy entity system.
	// I would prefer using a data-oriented version.
	this.components = {};

	// set the position
	this.sprite.position.x = 0;
	this.sprite.position.y = 0;

};

Entity.prototype = {
	addComponent: function(component) {
		this.components[component.name] = component;
		return this.components[component.name];
	},

	removeComponent: function(component) {
		delete this.components[component.name];
	},

	getComponent: function(name) {
		return this.components[name];
	},

	hasComponent: function(name) {
		return (this.components[name] !== undefined);
	}
};

module.exports = Entity;
