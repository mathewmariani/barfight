'use strict';

var GUI = require('../gui/gui.js');

/**
 * Game constructor
 */
var Game = function() {
	console.log("game has been constructed.");

	/**
	 * GUI object
	 * @type {PIXI.Stage}
	 */
	this.GUI = null;

	/**
	 * The PIXI.Renderer object
	 * @type {PIXI.CanvasRenderer}
	 */
	this.renderer = null;
	this.stage = null;

	// bootstrap the loading
	this.load();
};

Game.prototype = {

	load: function() {
		// use a premade instance.
		var loader = PIXI.loader;

		loader.add('image',"assets/image.json");
		loader.once('complete', this.initialize());

		// load assets
		loader.load();
	},

	initialize: function() {

		// autodetect renderer and append to body
		this.renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});
		document.body.appendChild(this.renderer.view);

		// create root of scene graph
		this.stage = new PIXI.Container();

		this.GUI = new GUI();

		// bootstrap the update
		this.update();
	},

	update: function() {
		this.GUI.Stats.begin();
		requestAnimationFrame(this.update.bind(this));

		// render container
		this.renderer.render(this.stage);

		this.GUI.Stats.end();
	}
};

module.exports = Game;
