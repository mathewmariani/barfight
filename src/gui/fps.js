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
