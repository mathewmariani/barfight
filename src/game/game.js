'use strict';

var GUI = require('../gui/gui.js');
var World = require('../core/world.js');
var Map = require('../tilemap/map.js');
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
	 * @type {PIXI.Container}
	 */
	this.container = null;

	/**
	 * @type {PIXI.Container}
	 */
	this.world = null;

	/**
	 * @type {PIXI.particles.ParticleContainer}
	 */
	this.map = null;

	/**
	 * @type {PIXI.Container}
	 */
	this.gui = null;

	/**
	 * @type {PIXI.Renderer}
	 */
	this.renderer = null;

	// self load
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
		this.container = new PIXI.Container();

		// create the world container
		this.world = new World(this);

		this.map = new Map(this, 0,0,5,5);
		this.map.initialize();

		this.gui = new GUI(this);

		// bootstrap the update
		this.update();
	},

	update: function() {
		this.gui.stats.begin();

		// request an animation frame
		requestAnimationFrame(this.update.bind(this));

		// render container
		this.renderer.render(this.container);

		this.gui.stats.end();
	}
};

module.exports = Game;
