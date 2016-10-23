(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Camera constructor
 * @param {Game} game reference to game object
 */
var Camera = function(game) {
	/**
	 * @type {Game}
	 */
	this.game = game;

	// FIXME: use vectors
	this.position = {
		x: 0, y: 0
	};

	// TODO: right now the camera is a single point (this.position)
	// it needs to have a viewport so we can use its center
	// NOTE: right now the camera's top-left is where the position is set
	// TODO: add zoom or "scale"

	// FIXME: use rectangles
	this.viewport = {
		x: 0, y: 0,
		w: game.width,
		h: game.height
	};

};

Camera.prototype = {
	update: function() {
		// NOTE: for now just circle around the origin (0,0)
		var angle = 1 * this.game.timer.elapsedTime;

		this.position.x = (this.viewport.w / 2)  - Math.cos(angle)*32;
		this.position.y = (this.viewport.h / 2) - Math.sin(angle)*32;
	}
};

module.exports = Camera;

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
'use strict';

/**
 * Map constructor
 * @param {Game} game reference to game object
 * @param {Number} x the x position of the map (default 0)
 * @param {Number} y the y position of the map (default 0)
 * @param {Number} w the width of this map (default 0)
 * @param {Number} h the height of this map (default 0)
 */
var Map = function(game, x, y, w, h) {

	// inherit from PIXI.particles.ParticleContainer
	PIXI.particles.ParticleContainer.call(this);

	/**
	 * @type {Game}
	 */
	this.game = game;

	this.x = 0;
	this.y = 0;
	this.w = w || 0;
	this.h = h || 0;

	this.tiles = [];
};

// inherit PIXI.particles.ParticleContainer
Map.prototype = Object.create(PIXI.particles.ParticleContainer.prototype);
Map.prototype.constructor = Map;

Map.prototype.initialize = function() {
	for(var y = 0; y < this.h; ++y) {
		this.tiles[y] = [];
		for(var x = 0; x < this.w; ++x) {
			var tile = null;
			var id = this.game.loader.resources["assets/image.json"].textures;
			if(y === 0 || y === this.h - 1 || x === 0 || x === this.w - 1) {
				tile = new PIXI.Sprite(id["blue.png"]);
			} else {
				tile = new PIXI.Sprite(id["pink.png"]);
			}


			// FIXME: these values shouldn't be "magic" numbers
			// acutally, they could be; soo we'll see?
			tile.position.x = x * 32;
			tile.position.y = y * 32;
			this.addChild(tile);

			this.tiles[y][x] = tile;

		}
	}

	this.game.world.addChild(this);
};

module.exports = Map;

},{}],4:[function(require,module,exports){
'use strict';

/**
 * Timer constructor
 * NOTE: this might be useless...
 */
var Timer = function() {
	this.elapsedTime = 0;
	this.startTime = Date.now();
};

Timer.prototype = {
	update: function() {
		this.elapsedTime = (Date.now() - this.startTime) / 1000;
	}
};

module.exports = Timer;

},{}],5:[function(require,module,exports){
'use strict';

var Camera = require('./camera.js');

/**
 * World constructor
 * container for all game objects.
 * @param {Game} game reference to game object
 */
var World = function(game) {

	// inherit from PIXI.Container
	PIXI.Container.call(this);

	/**
	 * @type {Game}
	 */
	this.game = game;

	/**
	 * @type {Camera}
	 */
	this.camera = null;

	// self initialize
	this.initialize();
};

// inherit PIXI.Container prototype
World.prototype = Object.create(PIXI.Container.prototype);
World.prototype.constructor = World;

/**
 * initialize world object
 */
World.prototype.initialize = function() {

	// create the camera object
	this.camera = new Camera(this.game);

	// attach this to the root scene
	this.game.container.addChild(this);
};

World.prototype.update = function() {
	this.camera.update();

	// update the coordinate of the world object relative to
	// the local coordinates of the parent container (this.container).
	this.position = new PIXI.Point(
		this.camera.position.x,
		this.camera.position.y
	);
}

module.exports = World;

},{"./camera.js":1}],6:[function(require,module,exports){
'use strict';

var Game = require('./game/game.js');

var initialize = function initGame() {
	var game = new Game();
};

// ill just roll my own
// var ticker = new PIXI.ticker.Ticker();
// ticker.autoStart = true;
// ticker.speed = 4;
//
// ticker.add(function() {
// 	console.log ("tick");
// });

// FIXME: apparently this can be replaced by PIXI.ticker.Ticker
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

window.addEventListener("load", initialize);

module.exports = initialize;

},{"./game/game.js":7}],7:[function(require,module,exports){
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

},{"../core/entity.js":2,"../core/map.js":3,"../core/timer.js":4,"../core/world.js":5,"../gui/gui.js":8}],8:[function(require,module,exports){
'use strict';

var Identification = require('../gui/id.js');

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

	// track mousemove
	this.game.container.mousemove = this.mouseMove.bind(this);

	// attach this to the root scene
	this.game.container.addChild(this);
};

// FIXME: mousemove won't work
GUI.prototype.mouseMove = function(mousedata) {
	console.log (
		"mouse position (" + mousedata.global.x + ", " + mousedata.global.y + ")"
	);
};

module.exports = GUI;

},{"../gui/id.js":9}],9:[function(require,module,exports){
'use strict';

/**
 * Identification constructor
 * @param {Game} game reference to game object
 */
var Identification = function(game) {

	// inherit from PIXI.Container
	PIXI.Container.call(this);

	/**
	 * @type {Game}
	 */
	this.game = game;

};

// inherit PIXI.Container prototype
Identification.prototype = Object.create(PIXI.Container.prototype);
Identification.prototype.constructor = Identification;

/**
 * initialize Identification object
 */
Identification.prototype.initialize = function() {
			var text = new PIXI.Text(
				"v0.0.0 pre-development",
				{
					fontFamily: "Courier New",
					fontSize: 12,
					fill: 0xffffff,
					align: "left"
				}
			);

			text.position.x = 15
			text.position.y = this.game.height-24;

			this.addChild(text);
};

module.exports = Identification;

},{}]},{},[6])