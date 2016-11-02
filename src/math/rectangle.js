'use strict';

/**
 * Rectangle constructor
 * @param {Number} x the x position of this Rectangle
 * @param {Number} y the y position of this Rectangle
 * @param {Number} w the width of this Rectangle
 * @param {Number} h the height of this Rectangle
 */
var Rectangle = function(x, y, w, h) {
	this.x = x || 0;
	this.y = y || 0;
	this.w = w || 0;
	this.h = h || 0;

	this.right = (this.x + this.w);
	this.bottom = (this.y + this.h);
};

Rectangle.prototype = {

	/**
	 * Returns true if x and y coordinates is a point inside this rectangle
	 * @param  {Number} x x-coordinate
	 * @param  {Number} y y-coordinate
	 * @return {Boolean}   returns true if the position is inside the rectangle
	 */
	contains: function(x, y) {
		// return(
		// 	(this.x < x && x < this.right) &&
		// 	(this.y > y && y > this.bottom)
		// );
		//
		return (
			(this.x < x && x < this.right) &&
			(this.y < y && y < this.bottom)
		);
	},

	/**
	 * Does another rectangle intersect with this rectangle?
	 * @param  {Rectangle} other The rectangle to check against
	 * @return {Boolean}       Returns true if the rectangles are overlapping, returns false otherwise.
	 */
	intersects: function(other) {
		return(
			(this.x < other.right && other.x < this.right) &&
			(this.y < other.bottom &&	other.y < this.bottom)
		);
	}
};

module.exports = Rectangle;
