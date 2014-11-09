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
		game.canvasContext.beginPath();
		game.canvasContext.fillStyle = game.bullets[i].color;
		game.canvasContext.arc(game.bullets[i].x, game.bullets[i].y, game.bullets[i].radius, 0, Math.PI * 2, false);
		game.canvasContext.fill();
	}
};

game.render.renderEnemyBlocks = function() {
	var enemyBlocksIds = Object.keys(game.enemyBlocks);

	for (var i = 0; i < enemyBlocksIds.length; i++) {
		var enemyBlock = game.enemyBlocks[enemyBlocksIds[i]];

		game.canvasContext.beginPath();
		game.canvasContext.fillStyle = enemyBlock.color;
		game.canvasContext.lineWidth = 2;
		game.canvasContext.strokeStyle = "white";
		game.canvasContext.fillRect(enemyBlock.x, enemyBlock.y, enemyBlock.width, enemyBlock.height);
		game.canvasContext.strokeRect(enemyBlock.x, enemyBlock.y, enemyBlock.width, enemyBlock.height);

		game.canvasContext.fillStyle = "black";
		var fontSize = 10;
		game.canvasContext.font = fontSize + "px Helvetica";
		var HPText = Math.ceil(enemyBlock.hp);
		var HPTextWidth = game.canvasContext.measureText(HPText).width;
		game.canvasContext.fillText(HPText, enemyBlock.x + (enemyBlock.width / 2) - (HPTextWidth / 2), enemyBlock.y + (enemyBlock.height / 2) + (fontSize / 2));
	}
};