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
