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
