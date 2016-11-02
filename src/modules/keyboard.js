'use strict';

/**
 * Keyboard constructor
 */
var Keyboard = function() {

  /**
   * @type {Object}
   */
  this.keys = {};

  this.initialize();

};

Keyboard.prototype = {
  initialize: function() {
    var self = this;

    /**
    * keyup events
    */
    window.addEventListener("keydown", function(event) {
      event.preventDefault();

      var callbacks = self.keys[event.which];
      if (callbacks) {
        callbacks.forEach(function (callback) {
          callback(data);
        });
      }
    });

    /**
    * keyup events
    */
    window.addEventListener("keyup", function(event) {
      event.preventDefault();
    });
  },

  getKey: function(keycode, callback) {
    if (!this.keys[keycode]) {
      this.keys[keycode] = [];
    }
    this.keys[keycode].push(callback);
  },

};

module.exports = Keyboard;
