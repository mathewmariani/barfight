'use strict';

/**
 * GUI constructor
 */
var GUI = function() {

	this.stats = {
		fps: null,
		ms: null,
		mb: null
	};

	// self initialize
	this.initialize();
};

GUI.prototype = {
	initialize: function() {
		this.initializeStats();
	},

	initializeStats: function() {
		this.stats.fps = new Stats();
		this.stats.fps.showPanel(0);

		this.stats.fps.domElement.style.position = 'relative';
		this.stats.fps.domElement.style.bottom = '0px';
		this.stats.fps.domElement.style.right = '0px';

		this.stats.ms = new Stats();
		this.stats.ms.showPanel(1);

		this.stats.ms.domElement.style.position = 'relative';
		this.stats.ms.domElement.style.bottom = '0px';
		this.stats.ms.domElement.style.right = '0px';

		this.stats.mb = new Stats();
		this.stats.mb.showPanel(2);

		this.stats.mb.domElement.style.position = 'relative';
		this.stats.mb.domElement.style.top = '0px';
		this.stats.mb.domElement.style.right = '0px';

		document.body.appendChild(this.stats.fps.domElement);
		document.body.appendChild(this.stats.ms.domElement);
		document.body.appendChild(this.stats.mb.domElement);
	}
};

module.exports = GUI;
