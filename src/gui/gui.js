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
