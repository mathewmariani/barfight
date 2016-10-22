(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./game/game.js":2}],2:[function(require,module,exports){
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

},{"../gui/gui.js":4}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
'use strict';

var Graph = require('../gui/graph.js');

/**
 * GUI constructor
 */
var GUI = function() {

	this.graph = null;

	// self initialize
	this.initialize();
};

GUI.prototype = {
	initialize: function() {
		this.graph = new Graph();
	},
};

module.exports = GUI;

},{"../gui/graph.js":3}]},{},[1])