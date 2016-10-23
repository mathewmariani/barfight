(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
	game.world.addChild(this.sprite);
};

Entity.prototype = {

};

module.exports = Entity;

},{}],2:[function(require,module,exports){
'use strict';

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
	this.game.container.addChild(this);
};

module.exports = World;

},{}],3:[function(require,module,exports){
'use strict';

var Game = require('./game/game.js');

var initialize = function initGame() {
	var game = new Game();
};

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

},{"./game/game.js":4}],4:[function(require,module,exports){
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

},{"../core/entity.js":1,"../core/world.js":2,"../gui/gui.js":6,"../tilemap/map.js":8}],5:[function(require,module,exports){
'use strict';

/**
 * Graph constructor
 */
var Graph = function() {

	this.stats = null;

	// self initialize
	this.initialize();
};

Graph.prototype = {
	initialize: function() {
		// initialize stats object
		this.stats = new Stats();
		this.stats.showPanel(0);

		// append stats object to dom
		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.bottom = '0px';
		this.stats.domElement.style.right = '0px';
		document.body.appendChild(this.stats.domElement);
	},

	begin: function() {
		this.stats.begin();
	},

	end: function() {
		this.stats.end();
	}
};

module.exports = Graph;

},{}],6:[function(require,module,exports){
'use strict';

var Graph = require('../gui/graph.js');
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

	var id = new Identification();
	id.initialize();
	this.addChild(id);

	this.game.container.addChild(this);
};

module.exports = GUI;

},{"../gui/graph.js":5,"../gui/id.js":7}],7:[function(require,module,exports){
'use strict';

/**
 * Identification constructor
 */
var Identification = function() {
	// inherit from PIXI.Container
	PIXI.Container.call(this);
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
			text.position.y = 490;

			this.addChild(text);
};

module.exports = Identification;

},{}],8:[function(require,module,exports){
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
	// TODO: sprites from spritesheets
	var texture = PIXI.Texture.fromImage('assets/image.png');

	for(var y = 0; y < this.h; ++y) {
		this.tiles[y] = [];
		for(var x = 0; x < this.w; ++x) {

			// TODO: sprites from spritesheets
			var tile = new PIXI.Sprite(texture);

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

},{}]},{},[3])