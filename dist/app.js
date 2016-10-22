(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

var Game = require('./game/game.js');

var initialize = function initializeCanvas() {
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

},{"./game/game.js":3}],3:[function(require,module,exports){
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

},{"../core/entity.js":1,"../gui/gui.js":5}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
'use strict';

var Graph = require('../gui/graph.js');

/**
 * GUI constructor
 */
var GUI = function() {

	this.Graph = null;

	// self initialize
	this.initialize();
};

GUI.prototype = {
	initialize: function() {
		this.Graph = new Graph();
	},
};

module.exports = GUI;

},{"../gui/graph.js":4}]},{},[2])