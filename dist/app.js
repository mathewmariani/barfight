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

//Initialize when fully loaded
window.addEventListener("load", initialize);

//Export the Browserify module
module.exports = initialize;

},{"./game/game.js":2}],2:[function(require,module,exports){
'use strict';

/**
 * Game constructor
 */
var Game = function() {
	console.log("game has been constructed.");

	this.stats = new Stats();
	this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild(this.stats.dom );


	this.update();


};

Game.prototype = {
	update: function() {
		this.stats.begin();
		console.log("update");
		requestAnimationFrame(this.update.bind(this));
		this.stats.end();
	}
};

module.exports = Game;

},{}]},{},[1])