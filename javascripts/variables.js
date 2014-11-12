var game = (function () {
	var canvas = document.querySelector("canvas"),
		context = canvas.getContext("2d");

	var directions = {
		up: "up",
		down: "down",
		left: "left",
		right: "right"
	};

	var keyCodes = {
		up: 38,
		down: 40,
		left: 37,
		right: 39,
		space: 32,
		q: 81,
		e: 69
	};

	var bullets = [],
		bulletType = {
			circle: "circle",
			rectangle: "rectangle"
		};

	var enemyBlocks = {},
		enemyIdCounter = 0;

	var collision = {};

	var render = {};

	return {
		canvas: canvas,
		canvasContext: context,
		directions: directions,
		keyCodes: keyCodes,
		bullets: bullets,
		bulletType: bulletType,
		enemyBlocks: enemyBlocks,
		collision: collision,
		render: render,
		getNewEnemyId: function() {
			return enemyIdCounter++;
		}
	};
}());