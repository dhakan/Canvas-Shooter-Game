var game = (function() {
	var canvas = document.querySelector("#backgroundCanvas"),
		context = canvas.getContext("2d");

	var directions = {
		UP: "up",
		DOWN: "down",
		LEFT: "left",
		RIGHT: "right"
	};

	var keyCodes = {
		UP: 38,
		DOWN: 40,
		LEFT: 37,
		RIGHT: 39,
		SPACE: 32,
		Q: 81,
		E: 69
	};

	var geometryType = {
		CIRCLE: "circle",
		RECTANGLE: "rectangle"
	};

	var bullets = [];

	var enemies = {},
		enemyIdCounter = 0;

	var collision = {};

	var render = {};

	return {
		canvas: canvas,
		canvasContext: context,
		directions: directions,
		keyCodes: keyCodes,
		bullets: bullets,
		geometryType: geometryType,
		enemies: enemies,
		collision: collision,
		render: render,
		getNewEnemyId: function() {
			return enemyIdCounter++;
		}
	};
}());