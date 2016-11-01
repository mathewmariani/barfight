'use strict';

/**
 * Tile constructor
 */
var Tile = function() {

  /**
   * @type {PIXI.Sprite}
   */
  this.sprite = null;

  /**
   * @type {Array}
   */
  this.entities = [];

};

Tile.prototype = {
  addEntity: function(entity) {
    this.entities.push(entity);
  },

  removeEntity: function(entity) {
    var index = this.entities.indexOf(entity);

    if (index !== -1) {
      this.entities.splice(index, 1);
      return true;
    }

    return false;
  }
};

module.exports = Tile;
