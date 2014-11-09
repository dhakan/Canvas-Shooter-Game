game.collision.playerIsAboveCanvasBottomBorder = function() {
	return game.player.positions.y + game.player.height < game.canvas.height;
};

game.collision.playerIsBelowCanvasTopBorder = function() {
	return game.player.positions.y > 0;
};

/* DO WE NEED THIS? */
game.collision.playerIsBelowMovingRestrictionBarrier = function() {
	return game.player.positions.y > game.movingRestrictionBarrier.y + game.movingRestrictionBarrier.height;
};

game.collision.playerIsToTheLeftOfCanvasRightBorder = function() {
	return game.player.positions.x + game.player.width - 5 < game.canvas.width;
};

game.collision.playerIsToTheRightOfCanvasLeftBorder = function() {
	return game.player.positions.x + 5 > 0;
};

/*
	TODO: Implement better collision detection.
*/
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
		return (bullet.y - bullet.radius) <= block.y + block.height &&
			(bullet.x + bullet.radius) >= block.x &&
			(bullet.x - bullet.radius) <= block.x + block.width;
	}
};