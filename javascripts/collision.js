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

game.collision.getCollidingEnemyBlocksIds = function(bullet) {
	var collidingEnemyBlocksIds = [];

	var enemyBlocksIds = Object.keys(game.enemyBlocks);

	for (var i = 0; i < enemyBlocksIds.length; i++) {
		var enemyBlock = game.enemyBlocks[enemyBlocksIds[i]];

		if (getBulletIsCollidingWithEnemyBlock(bullet, enemyBlock)) {
			collidingEnemyBlocksIds.push(enemyBlock.id);
		}
	}

	return collidingEnemyBlocksIds;

	function getBulletIsCollidingWithEnemyBlock(bullet, block) {
		if (bullet.type === game.bulletType.circle) {
			return getCircleIsCollidingWithRectangle(bullet, block);
		} else if (bullet.type === game.bulletType.rectangle) {
			return getRectangleIsCollidingWithRectangle(bullet, block);
		}
	}

	function getCircleIsCollidingWithRectangle(circle, rectangle) {
		var rectangleMiddleX = rectangle.x + rectangle.width / 2,
			rectangleMiddleY = rectangle.y + rectangle.height / 2;

		var distanceFromMiddleOfCircleToMiddleOfRectangle = {
			x: Math.abs(circle.x - rectangleMiddleX),
			y: Math.abs(circle.y - rectangleMiddleY)
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
		return rectangle1.x < rectangle2.x + rectangle2.width &&
			rectangle1.x + rectangle1.width > rectangle2.x &&
			rectangle1.y < rectangle2.y + rectangle2.height &&
			rectangle1.height + rectangle1.y > rectangle2.y;
	}
};