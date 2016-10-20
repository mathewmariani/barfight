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
		this.GUI.MS.begin();
		this.GUI.MS.begin();
		this.GUI.FPS.begin();
		requestAnimationFrame(this.update.bind(this));
		this.GUI.FPS.end();
		this.GUI.MS.end();
		this.GUI.MS.end();
	}
};

module.exports = Game;

},{"../gui/gui.js":4}],3:[function(require,module,exports){
'use strict';

/**
 * FPS constructor
 */
var FPS = function() {

	this.stats = null;

	// self initialize
	this.initialize();
};

FPS.prototype = {
	initialize: function() {
		this.stats = new Stats();

		this.stats.showPanel(0);

		this.stats.domElement.style.position = 'relative';
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

module.exports = FPS;

},{}],4:[function(require,module,exports){
'use strict';

var FPS = require('../gui/fps.js');
var MS = require('../gui/ms.js');
var MB = require('../gui/mb.js');

/**
 * GUI constructor
 */
var GUI = function() {

	this.FPS = null;
	this.MS = null;
	this.MB = null;

	// self initialize
	this.initialize();
};

GUI.prototype = {
	initialize: function() {
		this.FPS = new FPS();
		this.MS = new MS();
		this.MB = new MB();
	},
};

module.exports = GUI;

},{"../gui/fps.js":3,"../gui/mb.js":5,"../gui/ms.js":6}],5:[function(require,module,exports){
'use strict';

/**
 * MB constructor
 */
var MB = function() {

	this.stats = null;

	// self initialize
	this.initialize();
};

MB.prototype = {
	initialize: function() {
		this.stats = new Stats();

		this.stats.showPanel(2);

		this.stats.domElement.style.position = 'relative';
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

module.exports = MB;

},{}],6:[function(require,module,exports){
'use strict';

/**
 * FPS constructor
 */
var MS = function() {

	this.stats = null;

	// self initialize
	this.initialize();
};

MS.prototype = {
	initialize: function() {
		this.stats = new Stats();

		this.stats.showPanel(1);

		this.stats.domElement.style.position = 'relative';
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

module.exports = MS;

},{}]},{},[1])