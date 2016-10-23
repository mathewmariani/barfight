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
