function playerIsAboveCanvasBottomBorder(player, canvas) {
	return player.cornerPositions.bottomRight.y < canvas.height;
}

function playerIsBelowCanvasTopBorder(player, canvas) {
	return player.cornerPositions.top.y > 0;
}

function playerIsBelowMovingRestrictionBarrier(player, movingRestrictionBarrier) {
	return player.cornerPositions.top.y > movingRestrictionBarrier.y + movingRestrictionBarrier.height;
}

function playerIsToTheLeftOfCanvasRightBorder(player, canvas) {
	return player.cornerPositions.bottomRight.x < canvas.width;
}

function playerIsToTheRightOfCanvasLeftBorder(player, canvas) {
	return player.cornerPositions.bottomLeft.x > 0;
}

/*
	TODO: Implement better collision detection.
*/
function getCollidingEnemyBlocksIds(bullet, enemyBlocks) {
	var collidingEnemyBlocksIds = [];

	for (var enemyBlockId in enemyBlocks) {
		var enemyBlock = enemyBlocks[enemyBlockId];

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
}