'use strict';

var GUI = require('../gui/gui.js');
var Entity = require('../core/entity.js');
/**
 * Game constructor
 */
var Game = function() {
	console.log("game has been constructed.");

	/**
	 * @type {PIXI.Loader}
	 */
	this.loader = null;

	/**
	 * @type {PIXI.Stage}
	 */
	this.GUI = null;

	/**
	 * @type {PIXI.CanvasRenderer}
	 */
	this.renderer = null;

	/**
	 * @type {PIXI.Stage}
	 */
	this.stage = null;

	// bootstrap the loading
	this.load();
};

Game.prototype = {

	load: function() {
		this.loader = new PIXI.loaders.Loader();

		var assets = ["assets/image.json"];
		this.loader.add(assets).load(this.initialize());
	},

	initialize: function() {
		// autodetect renderer and append to body
		this.renderer = PIXI.autoDetectRenderer(512, 512,{backgroundColor : 0x1099bb});
		document.body.appendChild(this.renderer.view);

		// create root of scene graph
		this.stage = new PIXI.Container();

		// just a simple test entity
		var entity = new Entity(this, "blob.png");

		this.GUI = new GUI();

		// bootstrap the update
		this.update();
	},

	update: function() {
		this.GUI.Graph.begin();

		// request an animation frame
		requestAnimationFrame(this.update.bind(this));

		// render container
		this.renderer.render(this.stage);

		this.GUI.Graph.end();
	}
};

module.exports = Game;
