'use strict';

/**
 * MS constructor
 */
var MS = function() {

	this.stats = null;

	// self initialize
	this.initialize();
};

MS.prototype = {
	initialize: function() {
		this.stats = new Stats();

		this.stats.showPanel(1);

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

module.exports = MS;
