game.render.startRendering = function() {
	renderEverything();
};

game.render.renderBackground = function() {
	game.canvasContext.drawImage(game.images.background.image, game.images.background.x, game.images.background.y, game.canvas.width, game.canvas.height);
	game.canvasContext.drawImage(game.images.background.image, game.images.background.x, game.images.background.y - game.canvas.height, game.canvas.width, game.canvas.height);

	if (game.images.background.y >= game.canvas.height) {
		game.images.background.y = 0;
	}
	game.images.background.y += game.images.background.movingSpeed;
};

game.render.renderPlayer = function() {
	var sourceImageFrameXPosition = game.player.currentImageFrameIndex * game.player.image.frameWidth;

	game.canvasContext.drawImage(game.player.image.image,
		sourceImageFrameXPosition, 0, game.player.image.frameWidth, game.player.image.frameHeight,
		game.player.position.x, game.player.position.y, game.player.width, game.player.height);
};

game.render.renderBullets = function() {
	for (var i = 0; i < game.bullets.length; i++) {
		var bullet = game.bullets[i],
			sourceImageFrameXPosition = bullet.currentImageFrameIndex * bullet.image.frameWidth;

		if (bullet.geometryType === game.geometryType.RECTANGLE) {

			game.canvasContext.drawImage(bullet.image.image,
				sourceImageFrameXPosition, 0, bullet.image.frameWidth, bullet.image.frameHeight,
				bullet.position.x, bullet.position.y, bullet.width, bullet.height);

		} else if (bullet.geometryType === game.geometryType.CIRCLE) {
			game.canvasContext.drawImage(bullet.image.image, bullet.position.x - bullet.radius, bullet.position.y - bullet.radius, bullet.radius * 2, bullet.radius * 2);
		}
	}
};

game.render.renderEnemyBlocks = function() {
	var enemyBlocksIds = Object.keys(game.enemyBlocks);

	for (var i = 0; i < enemyBlocksIds.length; i++) {
		var enemyBlock = game.enemyBlocks[enemyBlocksIds[i]];
		game.canvasContext.drawImage(enemyBlock.image, enemyBlock.position.x, enemyBlock.position.y, enemyBlock.width, enemyBlock.height);
	}
};

game.render.changePlayerImageFrameAccordingToMovingDirection = function(direction) {
	if (direction === game.directions.LEFT) {
		game.player.currentImageFrameIndex = 0;
	} else if (direction === game.directions.RIGHT) {
		game.player.currentImageFrameIndex = 2;
	} else {
		game.player.currentImageFrameIndex = 1;
	}
};

game.render.changeAnimationFrames = function() {
	for (var i = 0; i < game.bullets.length; i++) {
		var bullet = game.bullets[i];
		if (bullet.currentImageFrameIndex < bullet.image.numberOfFrames - 1) {
			bullet.currentImageFrameIndex++;
		} else {
			bullet.currentImageFrameIndex--;
		}
	}
};

/* HAS TO BE GLOBAL IN ORDER FOR ANIMATION
	OPTIMIZATION TO WORK */
function renderEverything() {
	requestAnimFrame(renderEverything);
	game.render.renderBackground();
	game.render.renderPlayer();
	game.render.renderBullets();
	game.render.renderEnemyBlocks();
}

/* PAUL IRISH ANIMATION OPTIMIZATION */
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();