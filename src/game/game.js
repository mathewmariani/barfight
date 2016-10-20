'use strict';

/**
 * Game constructor
 */
var Game = function() {
	console.log("game has been constructed.");

	this.stats = new Stats();
	this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild(this.stats.dom );


	this.update();


};

Game.prototype = {
	update: function() {
		this.stats.begin();
		console.log("update");
		requestAnimationFrame(this.update.bind(this));
		this.stats.end();
	}
};

module.exports = Game;
