game.render.renderBackground = function() {
	game.canvasContext.drawImage(game.images.background.image, game.images.background.x, game.images.background.y, game.canvas.width, game.canvas.height);
	game.canvasContext.drawImage(game.images.background.image, game.images.background.x, game.images.background.y - game.canvas.height, game.canvas.width, game.canvas.height);

	if (game.images.background.y >= game.canvas.height) {
		game.images.background.y = 0;
	}
	game.images.background.y += game.images.background.movingSpeed;
};

game.render.renderPlayerMovingRestrictionBarrier = function() {
	game.canvasContext.fillStyle = "gray";
	game.canvasContext.fillRect(game.movingRestrictionBarrier.x, game.movingRestrictionBarrier.y,
		game.movingRestrictionBarrier.width, game.movingRestrictionBarrier.height);
};

game.render.renderPlayer = function() {
	game.canvasContext.drawImage(game.images.ship.image, game.player.positions.x, game.player.positions.y, game.player.width, game.player.height);
};

game.render.renderBullets = function() {
	for (var i = 0; i < game.bullets.length; i++) {
		var bullet = game.bullets[i];

		if (bullet.type === "circle") {
			game.canvasContext.drawImage(bullet.image, bullet.x, bullet.y, bullet.radius * 2, bullet.radius * 2);
		} else if (bullet.type === "rectangle") {
			game.canvasContext.drawImage(bullet.image, bullet.x - bullet.width / 2, bullet.y - bullet.radius, bullet.radius * 2, bullet.radius * 2);
		}
	}
};

game.render.renderEnemyBlocks = function() {
	var enemyBlocksIds = Object.keys(game.enemyBlocks);

	for (var i = 0; i < enemyBlocksIds.length; i++) {
		var enemyBlock = game.enemyBlocks[enemyBlocksIds[i]];
		game.canvasContext.drawImage(enemyBlock.image, enemyBlock.x, enemyBlock.y, enemyBlock.width, enemyBlock.height);
	}
};