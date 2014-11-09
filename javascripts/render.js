game.render.renderBackground = function() {
	game.canvasContext.fillStyle = "black";
	game.canvasContext.fillRect(0, 0, game.canvas.width, game.canvas.height);
};

game.render.renderPlayerMovingRestrictionBarrier = function() {
	game.canvasContext.fillStyle = "gray";
	game.canvasContext.fillRect(game.movingRestrictionBarrier.x, game.movingRestrictionBarrier.y,
		game.movingRestrictionBarrier.width, game.movingRestrictionBarrier.height);
};

game.render.renderPlayer = function() {
	if (game.player.isCharging) {
		setPlayerColorAccordingToChargingStage();
	} else {
		game.player.color = "white";
	}

	game.canvasContext.fillStyle = game.player.color;

	game.canvasContext.beginPath();
	game.canvasContext.moveTo(game.player.cornerPositions.top.x, game.player.cornerPositions.top.y);
	game.canvasContext.lineTo(game.player.cornerPositions.bottomRight.x, game.player.cornerPositions.bottomRight.y);
	game.canvasContext.lineTo(game.player.cornerPositions.bottomLeft.x, game.player.cornerPositions.bottomLeft.y);
	game.canvasContext.fill();

	function setPlayerColorAccordingToChargingStage() {
		if (game.player.selectedWeapon.radius >= 10 && game.player.selectedWeapon.radius < 20) {
			game.player.color = "yellow";
		} else if (game.player.selectedWeapon.radius >= 20 && game.player.selectedWeapon.radius < 30) {
			game.player.color = "orange";
		} else if (game.player.selectedWeapon.radius >= 30) {
			game.player.color = "red";
		}
	}
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