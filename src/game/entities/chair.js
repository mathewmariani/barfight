'use strict';

var Entity = require("../../core/entity.js");
var Position = require("../components/position.js");
var Tooltip = require("../components/tooltip.js");

var Chair = {
	create: function(game, x, y) {

		var entity = new Entity(game, "chair");
    var position = entity.addComponent(new Position());
		var tooltip = entity.addComponent(new Tooltip());

		position.x = x;
		position.y = y;

		tooltip.title = "Chair";
		tooltip.desc = "Ever notice when someone throws a chair a brawl starts off?";

		//Return the entity
		return entity;
	}
};

module.exports = Chair;
