(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Batch constructor
 */
var Batch = function() {

	// inherit from PIXI.Container
	PIXI.Container.call(this);

};

// inherit PIXI.Container prototype
Batch.prototype = Object.create(PIXI.Container.prototype);
Batch.prototype.constructor = Batch;

module.exports = Batch;

},{}],2:[function(require,module,exports){
'use strict';

var Rectangle = require("../math/rectangle.js");
var Vector2 = require("../math/vector2.js");

/**
 * Camera constructor
 * @param {Game} game reference to game object
 */
var Camera = function(game) {
	
	/**
	 * @type {Game}
	 */
	this.game = game;

	/**
	 * @type {Vector2}
	 */
	this.position = new Vector2(0,0);

	/**
	 * @type {Rectangle}
	 */
	this.viewport = new Rectangle(
		this.position.x * (this.game.settings.tilesize * this.game.settings.scale),
		this.position.y * (this.game.settings.tilesize * this.game.settings.scale),
		game.width,
		game.height
	);

};

Camera.prototype = {
	update: function() {
		// NOTE: for now just circle around the origin (0,0)
		var angle = 1 * this.game.timer.elapsedTime;
		this.position.x = (this.viewport.w / 2) - Math.cos(angle)*32;
		this.position.y = (this.viewport.h / 2) - Math.sin(angle)*32;
	}
};

module.exports = Camera;

},{"../math/rectangle.js":14,"../math/vector2.js":15}],3:[function(require,module,exports){
'use strict';

/**
 * Entity constructor
 * @param {Game} game   reference to game object
 */
var Entity = function(game, sprite) {

	this.game = game;

	var texture = this.game.loader.resources["assets/image.json"].textures;

	/**
	 * @type {PIXI.Sprite}
	 */
	this.sprite = new PIXI.Sprite(texture["yellow.png"]);

	// set the position
	this.sprite.position.x = 0;
	this.sprite.position.y = 0;

};

Entity.prototype = {

};

module.exports = Entity;

},{}],4:[function(require,module,exports){
'use strict';

var Batch = require("./batch.js");
var Tile = require("./tile.js");
var Rectangle = require("../math/rectangle.js");

/**
 * Map constructor
 * @param {Game} game reference to game object
 * @param {Number} x the x position of the map (default 0)
 * @param {Number} y the y position of the map (default 0)
 * @param {Number} w the width of this map (default 0)
 * @param {Number} h the height of this map (default 0)
 */
var Map = function(game, x, y, w, h) {

	// inherit from PIXI.particles.ParticleContainer
	//PIXI.particles.ParticleContainer.call(this);
	PIXI.Container.call(this);

	this.x = x || 0;
	this.y = y || 0;
	this.w = w || 0;
	this.h = h || 0;

	/**
	 * @type {Game}
	 */
	this.game = game;

	this.rectangle = new Rectangle(
		this.x, this.y,
		this.w * (game.settings.tilesize * this.game.settings.scale),
		this.w * (game.settings.tilesize * this.game.settings.scale)
	);

	/**
	 * @type {Array}
	 */
	this.nodes = [];

	this.entities = new Batch();
};

// inherit PIXI.particles.ParticleContainer
// Map.prototype = Object.create(PIXI.particles.ParticleContainer.prototype);
// Map.prototype.constructor = Map;
Map.prototype = Object.create(PIXI.Container.prototype);
Map.prototype.constructor = Map;

Map.prototype.initialize = function() {
	for(var y = 0; y < this.h; ++y) {
		this.nodes[y] = [];
		for(var x = 0; x < this.w; ++x) {
			var tile = new Tile();
			var id = this.game.loader.resources["assets/image.json"].textures;
			if(y === 0 || y === this.h - 1 || x === 0 || x === this.w - 1) {
				tile.sprite = new PIXI.Sprite(id["blue.png"]);
			} else {
				tile.sprite = new PIXI.Sprite(id["pink.png"]);
			}

			// FIXME: these values shouldn't be "magic" numbers
			// acutally, they could be; soo we'll see?
			tile.sprite.position.x = x * this.game.settings.tilesize;
			tile.sprite.position.y = y * this.game.settings.tilesize;
			this.addChild(tile.sprite);

			this.nodes[y][x] = tile;
		}
	}

	this.game.world.addChild(this);
};

Map.prototype.addEntity = function(x, y, entity) {
	entity.sprite.position.x = x * 32;
	entity.sprite.position.y = y * 32;

	this.nodes[y][x].addEntity(entity);
	this.entities.addChild(entity.sprite);
};

Map.prototype.removeEntity = function(x, y, entity) {
	this.entities.removeChild(entity.sprite);
};

module.exports = Map;

},{"../math/rectangle.js":14,"./batch.js":1,"./tile.js":5}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
'use strict';

/**
 * Timer constructor
 * NOTE: this might be useless...
 */
var Timer = function() {
	this.elapsedTime = 0;
	this.startTime = Date.now();
};

Timer.prototype = {
	update: function() {
		this.elapsedTime = (Date.now() - this.startTime) / 1000;
	}
};

module.exports = Timer;

},{}],7:[function(require,module,exports){
'use strict';

var Camera = require('./camera.js');

/**
 * World constructor
 * container for all game objects.
 * @param {Game} game reference to game object
 */
var World = function(game) {

	// inherit from PIXI.Container
	PIXI.Container.call(this);

	/**
	 * @type {Game}
	 */
	this.game = game;

	/**
	 * @type {Camera}
	 */
	this.camera = null;

	// self initialize
	this.initialize();
};

// inherit PIXI.Container prototype
World.prototype = Object.create(PIXI.Container.prototype);
World.prototype.constructor = World;

/**
 * initialize world object
 */
World.prototype.initialize = function() {

	// create the camera object
	this.camera = new Camera(this.game);

	// The scale factor of the world, and all its children.
	this.scale = new PIXI.Point(this.game.settings.scale, this.game.settings.scale);

	// attach this to the root scene
	this.game.container.addChild(this);
};

World.prototype.update = function() {
	this.camera.update();

	// update the coordinate of the world object relative to
	// the local coordinates of the parent container (this.container).
	this.position = new PIXI.Point(
		this.camera.position.x,
		this.camera.position.y
	);
}

module.exports = World;

},{"./camera.js":2}],8:[function(require,module,exports){
'use strict';

var Game = require('./game/game.js');

var initialize = function initGame() {
	var game = new Game();
};

// ill just roll my own
// var ticker = new PIXI.ticker.Ticker();
// ticker.autoStart = true;
// ticker.speed = 4;
//
// ticker.add(function() {
// 	console.log ("tick");
// });

// FIXME: apparently this can be replaced by PIXI.ticker.Ticker
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

window.addEventListener("load", initialize);

module.exports = initialize;

},{"./game/game.js":9}],9:[function(require,module,exports){
'use strict';

var GUI = require('../gui/gui.js');
var World = require('../core/world.js');
var Map = require('../core/map.js');
var Entity = require('../core/entity.js');
var Timer = require('../core/timer.js');
/**
 * Game constructor
 */
var Game = function() {
	console.log("game has been constructed.");

	/**
	 * @type {Number}
	 */
	this.width = null;

	/**
	 * @type {Number}
	 */
	this.height = null;

	/**
	 * @type {PIXI.Loader}
	 */
	this.loader = null;

	/**
	 * @type {PIXI.Container}
	 */
	this.container = null;

	/**
	 * @type {PIXI.Container}
	 */
	this.world = null;

	/**
	 * @type {PIXI.particles.ParticleContainer}
	 */
	this.map = null;

	/**
	 * @type {PIXI.Container}
	 */
	this.gui = null;

	/**
	 * @type {Timer}
	 */
	this.timer = new Timer();

	/**
	 * @type {PIXI.Renderer}
	 */
	this.renderer = null;

	/**
	 * @type {PIXI.Point}
	 */
	this.mouse = null;

	this.settings = {
		tilesize: 32,
		scale: 1.5
	};

	// self load
	this.load();
};

Game.prototype = {

	load: function() {
		PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
		this.loader = new PIXI.loaders.Loader();

		var assets = ["assets/image.json"];
		this.loader.add(assets).load(this.initialize.bind(this))
	},

	initialize: function() {

		// just make us fullscreen
		// NOTE: resize events?
		this.width = window.innerWidth;
		this.height = window.innerHeight;

		// create root of scene graph
		this.container = new PIXI.Container();

		// autodetect renderer and append to dom
		this.renderer = PIXI.autoDetectRenderer(
			this.width, this.height, {backgroundColor : 0x6495ED}
		);
		document.body.appendChild(this.renderer.view);

		// track mousemove
		this.mouse = new PIXI.Point(0, 0);
		this.renderer.plugins.interaction.on(
			"mousemove", this.mouseMove.bind(this)
		);

		// create the world container
		this.world = new World(this);

		this.createMap();

		// create the gui container
		this.gui = new GUI(this);

		// bootstrap the update
		this.update();
	},

	createMap: function() {
		// create the map container
		this.map = new Map(this, 0,0,15,9);
		this.map.initialize();

		var entity = new Entity(this);
		this.map.addEntity(2, 2, entity);

		this.world.addChild(this.map.entities);
	},

	mouseMove: function(mouse) {
		var worldPos = {
			x: mouse.data.global.x - this.world.camera.position.x,
			y: mouse.data.global.y - this.world.camera.position.y
		};

		this.mouse = {
			x: Math.floor((worldPos.x) / 32),
			y: Math.floor((worldPos.y) / 32)
		};
	},

	update: function() {
		this.gui.stats.begin();

		// request an animation frame
		requestAnimationFrame(this.update.bind(this));

		this.timer.update();
		this.world.update();

		// render container
		this.renderer.render(this.container);

		this.gui.stats.end();
	}
};

module.exports = Game;

},{"../core/entity.js":3,"../core/map.js":4,"../core/timer.js":6,"../core/world.js":7,"../gui/gui.js":10}],10:[function(require,module,exports){
'use strict';

var Identification = require("../gui/id.js");
var MousePos = require("../gui/mousepos.js");
var Tooltip = require("../gui/tooltip.js");

/**
 * GUI constructor
 * @param {Game} game reference to game object
 */
var GUI = function(game) {

	// inherit from PIXI.Container
	PIXI.Container.call(this);

	/**
	 * @type {Game}
	 */
	this.game = game;

	/**
	 * @type {Stats}
	 */
	this.stats = null;

	/**
	 * @type {PIXI.Container}
	 */
	this.mousepos = null;

	/**
	 * @type {PIXI.Container}
	 */
	this.tooltip = null;


	// self initialize
	this.initialize();
};

// inherit PIXI.Container prototype
GUI.prototype = Object.create(PIXI.Container.prototype);
GUI.prototype.constructor = GUI;

/**
 * initialize GUI object
 */
GUI.prototype.initialize = function() {
	// initialize stats object
	this.stats = new Stats();
	this.stats.showPanel(0);

	// append stats object to dom
	this.stats.domElement.style.position = 'absolute';
	this.stats.domElement.style.top = '0px';
	this.stats.domElement.style.left = '0px';
	document.body.appendChild(this.stats.domElement);

	var id = new Identification(this.game);
	id.initialize();
	this.addChild(id);

	this.mousepos = new MousePos(this.game);
	this.mousepos.initialize();
	this.addChild(this.mousepos);

	this.tooltip = new Tooltip(this.game);
	this.tooltip.initialize();
	this.addChild(this.tooltip);

	this.game.renderer.plugins.interaction.on(
		"mousemove", this.mouseMove.bind(this)
	);

	// attach this to the root scene
	this.game.container.addChild(this);
};

GUI.prototype.mouseMove = function(mouse) {
	var worldPos = {
		x: mouse.data.global.x - this.game.world.camera.position.x,
		y: mouse.data.global.y - this.game.world.camera.position.y
	};

	this.mouse = {
		x: Math.floor((worldPos.x) / (this.game.settings.tilesize * this.game.settings.scale)),
		y: Math.floor((worldPos.y) / (this.game.settings.tilesize * this.game.settings.scale))
	};

	this.mousepos.update(this.mouse);

	if (this.game.map.rectangle.contains(worldPos.x, worldPos.y)) {
		this.tooltip.update(
			this.game.map.nodes[this.mouse.y][this.mouse.x].entities.length
		);
	} else {
		this.tooltip.update("?");
	}
},

module.exports = GUI;

},{"../gui/id.js":11,"../gui/mousepos.js":12,"../gui/tooltip.js":13}],11:[function(require,module,exports){
'use strict';

/**
 * Identification constructor
 * @param {Game} game reference to game object
 */
var Identification = function(game) {

	// inherit from PIXI.Container
	PIXI.Container.call(this);

	/**
	 * @type {Game}
	 */
	this.game = game;

};

// inherit PIXI.Container prototype
Identification.prototype = Object.create(PIXI.Container.prototype);
Identification.prototype.constructor = Identification;

/**
 * initialize Identification object
 */
Identification.prototype.initialize = function() {
			var text = new PIXI.Text(
				"v0.0.0 pre-development",
				{
					fontFamily: "Courier New",
					fontSize: 12,
					fill: 0xffffff,
					align: "left"
				}
			);

			text.position.x = 15
			text.position.y = this.game.height-24;

			this.addChild(text);
};

module.exports = Identification;

},{}],12:[function(require,module,exports){
'use strict';

/**
 * MousePos constructor
 * @param {Game} game reference to game object
 */
var MousePos = function(game) {

	// inherit from PIXI.Container
	PIXI.Container.call(this);

	/**
	 * @type {Game}
	 */
	this.game = game;

	this.text = null;

};

// inherit PIXI.Container prototype
MousePos.prototype = Object.create(PIXI.Container.prototype);
MousePos.prototype.constructor = MousePos;

/**
 * initialize Identification object
 */
MousePos.prototype.initialize = function() {
	this.text = new PIXI.Text(
		"Mouse Position : (?, ?)",
		{
			fontFamily: "Courier New",
			fontSize: 12,
			fill: 0xffffff,
			align: "left"
		}
	);

	this.text.position.x = 15
	this.text.position.y = this.game.height-48;

	this.addChild(this.text);
};

MousePos.prototype.update = function(position) {
	this.text.text = ("Mouse Position : ("+position.x+", "+position.y+")");
};

module.exports = MousePos;

},{}],13:[function(require,module,exports){
'use strict';

/**
 * Tooltip constructor
 * @param {Game} game reference to game object
 */
var Tooltip = function(game) {

	// inherit from PIXI.Container
	PIXI.Container.call(this);

	/**
	 * @type {Game}
	 */
	this.game = game;

  /**
   * @type {PIXI.Text}
   */
	this.text = null;

};

// inherit PIXI.Container prototype
Tooltip.prototype = Object.create(PIXI.Container.prototype);
Tooltip.prototype.constructor = Tooltip;

/**
 * initialize Identification object
 */
Tooltip.prototype.initialize = function() {
	this.text = new PIXI.Text(
		"Tooltip : ?",
		{
			fontFamily: "Courier New",
			fontSize: 12,
			fill: 0xffffff,
			align: "left"
		}
	);

	this.text.position.x = 15
	this.text.position.y = this.game.height-72;

	this.addChild(this.text);
};

Tooltip.prototype.update = function(value) {
	this.text.text = ("Tooltip : there are "+value+" entities here.");
};

module.exports = Tooltip;

},{}],14:[function(require,module,exports){
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
		return(
			(this.x < x && x < this.right) &&
			(this.y > y && y > this.bottom)
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

},{}],15:[function(require,module,exports){
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
		this.x += other.x;
		this.y += other.y;
	},

	subtract: function(other) {
		this.x -= other.x;
		this.y -= other.y;
	},

	multiply: function(c) {
		this.x *= c;
		this.y *= c;
	},

	divide: function(c) {
		this.x /= c;
		this.y /= c;
	},

	scale: function(other) {
		this.x *= other.x;
		this.y *= other.y;
	},

	distance: function(other) {
		dx = Math.abs(this.x - other.x);
		dy = Math.abs(this.y - other.y);

		return Math.sqrt(dx*dx + dy*dy);
	},

	toString: function() {
		return("(" + this.x + ", " + this.y + ")");
	}
};

module.exports = Vector2;

},{}]},{},[8])