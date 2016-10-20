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

	this.GUI = null;

	// self initialize
	this.initialize();
};

Game.prototype = {
	initialize: function() {
		this.GUI = new GUI();

		// bootstrap the update
		this.update();
	},

	update: function() {
		this.GUI.stats.ms.begin();
		this.GUI.stats.mb.begin();
		this.GUI.stats.fps.begin();
		requestAnimationFrame(this.update.bind(this));
		this.GUI.stats.fps.end();
		this.GUI.stats.mb.end();
		this.GUI.stats.ms.end();
	}
};

module.exports = Game;

},{"../gui/gui.js":3}],3:[function(require,module,exports){
'use strict';

/**
 * GUI constructor
 */
var GUI = function() {

	this.stats = {
		fps: null,
		ms: null,
		mb: null
	};

	// self initialize
	this.initialize();
};

GUI.prototype = {
	initialize: function() {
		this.initializeStats();
	},

	initializeStats: function() {
		this.stats.fps = new Stats();
		this.stats.fps.showPanel(0);

		this.stats.fps.domElement.style.position = 'relative';
		this.stats.fps.domElement.style.bottom = '0px';
		this.stats.fps.domElement.style.right = '0px';

		this.stats.ms = new Stats();
		this.stats.ms.showPanel(1);

		this.stats.ms.domElement.style.position = 'relative';
		this.stats.ms.domElement.style.bottom = '0px';
		this.stats.ms.domElement.style.right = '0px';

		this.stats.mb = new Stats();
		this.stats.mb.showPanel(2);

		this.stats.mb.domElement.style.position = 'relative';
		this.stats.mb.domElement.style.top = '0px';
		this.stats.mb.domElement.style.right = '0px';

		document.body.appendChild(this.stats.fps.domElement);
		document.body.appendChild(this.stats.ms.domElement);
		document.body.appendChild(this.stats.mb.domElement);
	}
};

module.exports = GUI;

},{}]},{},[1])