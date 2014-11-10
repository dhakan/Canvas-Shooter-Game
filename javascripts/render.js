game.render.renderBackground = function() {
	game.canvasContext.drawImage(game.images.background.image, game.images.background.x, game.images.background.y, game.canvas.width, game.canvas.height);
	game.canvasContext.drawImage(game.images.background.image, game.images.background.x, game.images.background.y - game.canvas.height, game.canvas.width, game.canvas.height);

	if (game.images.background.y >= game.canvas.height) {
		game.images.background.y = 0;
	}
	game.images.background.y += game.images.background.movingSpeed;
};

game.render.renderPlayer = function() {
	game.canvasContext.drawImage(game.images.ship.image, game.player.position.x, game.player.position.y, game.player.width, game.player.height);
};

game.render.renderBullets = function() {
	for (var i = 0; i < game.bullets.length; i++) {
		var bullet = game.bullets[i];

		if (bullet.type === game.bulletType.circle) {
			game.canvasContext.drawImage(bullet.image, bullet.x - bullet.radius, bullet.y - bullet.radius, bullet.radius * 2, bullet.radius * 2);
		} else if (bullet.type === game.bulletType.rectangle) {
			game.canvasContext.drawImage(bullet.image, bullet.x, bullet.y, bullet.width, bullet.height);
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