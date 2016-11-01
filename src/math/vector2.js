'use strict';

/**
 * Vector2 constructor
 * @param {Number} x the x-coordinate of this Vector2
 * @param {Number} y the y-coordiante of this Vector2
 */
var Vector2 = function(x, y) {
	this.x = x || 0;
	this.y = y || 0;
};

Vector2.prototype = {
	copy: function() {
		return(new Vector2(this.x, this.y));
	},

	add: function(other) {
		this.x += other.x
		this.y += other.y
	},

	subtract: function(other) {
		this.x -= other.x
		this.y -= other.y
	},

	multiply: function(c) {
		this.x *= c
		this.y *= c
	},

	divide: function(c) {
		this.x /= c
		this.y /= c
	}.

	scale: function(other) {
		this.x *= other.x
		this.y *= other.y
	},

	distance: function(other) {
		dx = Math.abs(this.x - other.x)
		dy = Math.abs(this.y - other.y)

		return Math.sqrt(dx*dx + dy*dy)
	},

	toString: function() {
		return("(" + this.x + ", " + this.y + ")");
	}
};

module.exports = Vector2;
