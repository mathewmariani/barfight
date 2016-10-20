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
