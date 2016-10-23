'use strict';

var GUI = require('../gui/gui.js');
var World = require('../core/world.js');
var Map = require('../core/map.js');
var Entity = require('../core/entity.js');
var Timer = require('../core/timer.js');
/**
 * Game constructor
 */
var Game = function() {
	console.log("game has been constructed.");

	/**
	 * @type {Number}
	 */
	this.width = null;

	/**
	 * @type {Number}
	 */
	this.height = null;

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
	 * @type {Timer}
	 */
	this.timer = new Timer();

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
		this.loader.add(assets).load(this.initialize.bind(this))
	},

	initialize: function() {

		// just make us fullscreen
		// NOTE: resize events?
		this.width = window.innerWidth;
		this.height = window.innerHeight;

		// create root of scene graph
		this.container = new PIXI.Container();

		// autodetect renderer and append to dom
		this.renderer = PIXI.autoDetectRenderer(
			this.width, this.height, {backgroundColor : 0x6495ED}
		);
		document.body.appendChild(this.renderer.view);

		// create the world container
		this.world = new World(this);

		// create the map container
		this.map = new Map(this, 0,0,15,9);
		this.map.initialize();

		// create the gui container
		this.gui = new GUI(this);

		// bootstrap the update
		this.update();
	},

	update: function() {
		this.gui.stats.begin();

		// request an animation frame
		requestAnimationFrame(this.update.bind(this));

		this.timer.update();
		this.world.update();

		// render container
		this.renderer.render(this.container);

		this.gui.stats.end();
	}
};

module.exports = Game;
