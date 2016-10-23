'use strict';

var GUI = require('../gui/gui.js');
var World = require('../core/world.js');
var Map = require('../core/map.js');
var Entity = require('../core/entity.js');
var Camera = require('../core/camera.js');
var Timer = require('../core/timer.js');
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

	this.camera = null;

	/**
	 * @type {PIXI.Renderer}
	 */
	this.renderer = null;

	this.timer = new Timer();

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
		this.renderer = PIXI.autoDetectRenderer(512, 512,{backgroundColor : 0x6495ED});
		document.body.appendChild(this.renderer.view);

		// create root of scene graph
		this.container = new PIXI.Container();

		// create the world container
		this.world = new World(this);

		// create the camera object
		this.camera = new Camera(this);

		// create the map container
		this.map = new Map(this, 0,0,5,5);
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
		this.camera.update();

		// update the coordinate of the world object relative to
		// the local coordinates of the parent container (this.container).
		this.world.position = new PIXI.Point(
			this.camera.position.x, this.camera.position.y
		);

		// render container
		this.renderer.render(this.container);

		this.gui.stats.end();
	}
};

module.exports = Game;
