/* TODO Move player related functions to player object */
game.collision.playerIsAboveCanvasBottomBorder = function() {
	return game.player.position.y + game.player.height < game.canvas.height;
};

game.collision.playerIsBelowCanvasTopBorder = function() {
	return game.player.position.y > 0;
};

game.collision.playerIsToTheLeftOfCanvasRightBorder = function() {
	return game.player.position.x + game.player.width < game.canvas.width;
};

game.collision.playerIsToTheRightOfCanvasLeftBorder = function() {
	return game.player.position.x > 0;
};

game.collision.getCollidingEnemiesIds = function(bullet) {
	var collidingEnemiesIds = [];

	var enemiesIds = Object.keys(game.enemies);

	for (var i = 0; i < enemiesIds.length; i++) {
		var enemy = game.enemies[enemiesIds[i]];

		if (getBulletIsCollidingWithEnemy(bullet, enemy)) {
			collidingEnemiesIds.push(enemy.id);
		}
	}

	return collidingEnemiesIds;

	function getBulletIsCollidingWithEnemy(bullet, block) {
		if (bullet.geometryType === game.geometryType.CIRCLE) {
			return getCircleIsCollidingWithRectangle(bullet, block);
		} else if (bullet.geometryType === game.geometryType.RECTANGLE) {
			return getRectangleIsCollidingWithRectangle(bullet, block);
		}
	}

	function getCircleIsCollidingWithRectangle(circle, rectangle) {
		var rectangleMiddleX = rectangle.position.x + rectangle.width / 2,
			rectangleMiddleY = rectangle.position.y + rectangle.height / 2;

		var distanceFromMiddleOfCircleToMiddleOfRectangle = {
			x: Math.abs(circle.position.x - rectangleMiddleX),
			y: Math.abs(circle.position.y - rectangleMiddleY)
		};

		if (distanceFromMiddleOfCircleToMiddleOfRectangle.x > (rectangle.width / 2 + circle.radius)) {
			return false;
		}

		if (distanceFromMiddleOfCircleToMiddleOfRectangle.y > (rectangle.height / 2 + circle.radius)) {
			return false;
		}

		if (distanceFromMiddleOfCircleToMiddleOfRectangle.x <= (rectangle.width / 2)) {
			return true;
		}

		if (distanceFromMiddleOfCircleToMiddleOfRectangle.y <= (rectangle.height / 2)) {
			return true;
		}

		var cornerDistanceSquared = Math.pow(distanceFromMiddleOfCircleToMiddleOfRectangle.x - rectangle.width / 2, 2) + Math.pow(distanceFromMiddleOfCircleToMiddleOfRectangle.y - rectangle.height / 2, 2);

		return Math.sqrt(cornerDistanceSquared) <= circle.radius;
	}

	function getRectangleIsCollidingWithRectangle(rectangle1, rectangle2) {

		return rectangle1.position.x < rectangle2.position.x + rectangle2.width &&
			rectangle1.position.x + rectangle1.width > rectangle2.position.x &&
			rectangle1.position.y < rectangle2.position.y + rectangle2.height &&
			rectangle1.height + rectangle1.position.y > rectangle2.position.y;
	}
};