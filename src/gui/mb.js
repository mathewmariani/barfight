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
