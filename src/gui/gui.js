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
