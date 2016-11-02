'use strict';

var Entity = require("../../core/entity.js");
var Position = require("../components/position.js");

var Chair = {
	create: function(game) {

		var entity = new Entity(game, "chair");
    entity.addComponent(new Position());

		//Return the entity
		return entity;
	}
};

module.exports = Chair;
