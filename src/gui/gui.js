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
