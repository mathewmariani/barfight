'use strict';

var Entity = require("../../core/entity.js");
var Position = require("../components/position.js");
var Tooltip = require("../components/tooltip.js");
var Movement = require("../components/movement.js");

var Character = {
	create: function(game, x, y) {

		var entity = new Entity(game, "character", "orange");
    var position = entity.addComponent(new Position());
    var movement = entity.addComponent(new Movement());
		var tooltip = entity.addComponent(new Tooltip());

		position.x = x;
		position.y = y;

    movement.points = 3;

		tooltip.title = "Character";
		tooltip.desc = "It's either you or you're fighting it.";

		//Return the entity
		return entity;
	}
};

module.exports = Character;
