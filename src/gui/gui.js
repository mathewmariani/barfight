'use strict';

var Identification = require("../gui/id.js");
var MousePos = require("../gui/mousepos.js");
var Tooltip = require("../gui/tooltip.js");

/**
 * GUI constructor
 * @param {Game} game reference to game object
 */
var GUI = function(game) {

	// inherit from PIXI.Container
	PIXI.Container.call(this);

	/**
	 * @type {Game}
	 */
	this.game = game;

	/**
	 * @type {Stats}
	 */
	this.stats = null;

	/**
	 * @type {PIXI.Container}
	 */
	this.mousepos = null;

	/**
	 * @type {PIXI.Container}
	 */
	this.tooltip = null;


	// self initialize
	this.initialize();
};

// inherit PIXI.Container prototype
GUI.prototype = Object.create(PIXI.Container.prototype);
GUI.prototype.constructor = GUI;

/**
 * initialize GUI object
 */
GUI.prototype.initialize = function() {
	// initialize stats object
	this.stats = new Stats();
	this.stats.showPanel(0);

	// append stats object to dom
	this.stats.domElement.style.position = 'absolute';
	this.stats.domElement.style.top = '0px';
	this.stats.domElement.style.left = '0px';
	document.body.appendChild(this.stats.domElement);

	var id = new Identification(this.game);
	id.initialize();
	this.addChild(id);

	this.mousepos = new MousePos(this.game);
	this.mousepos.initialize();
	this.addChild(this.mousepos);

	this.tooltip = new Tooltip(this.game);
	this.tooltip.initialize();
	this.addChild(this.tooltip);

	this.game.renderer.plugins.interaction.on(
		"mousemove", this.mouseMove.bind(this)
	);

	// attach this to the root scene
	this.game.container.addChild(this);
};

GUI.prototype.mouseMove = function(mouse) {
	var worldPos = {
		x: mouse.data.global.x - this.game.world.camera.position.x,
		y: mouse.data.global.y - this.game.world.camera.position.y
	};

	this.mouse = {
		x: Math.floor((worldPos.x) / (this.game.settings.tilesize * this.game.settings.scale)),
		y: Math.floor((worldPos.y) / (this.game.settings.tilesize * this.game.settings.scale))
	};

	this.mousepos.update(this.mouse);

	// FIXME: this is terrible - this code has over stayed its welcome.
	if (this.game.map.rectangle.contains(worldPos.x, worldPos.y)) {
		if (this.game.map.nodes[this.mouse.y][this.mouse.x].entities.length === 0) {
			this.tooltip.update("(?)");
			return;
		}

		this.tooltip.update(
			this.game.map.nodes[this.mouse.y][this.mouse.x].entities[0].name
		);
	} else {
		this.tooltip.update("(?)");
	}
},

module.exports = GUI;
