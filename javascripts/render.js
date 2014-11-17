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

	game.player.canvasContext.clearRect(0, 0, game.enemy.canvas.width, game.enemy.canvas.height);

	game.player.canvasContext.drawImage(game.player.image.image,
		sourceImageFrameXPosition, 0, game.player.image.frameWidth, game.player.image.frameHeight,
		game.player.position.x, game.player.position.y, game.player.width, game.player.height);
};

game.render.renderBullets = function() {
	for (var i = 0; i < game.bullets.length; i++) {
		var bullet = game.bullets[i],
			sourceImageFrameXPosition = bullet.currentImageFrameIndex * bullet.image.frameWidth;

		game.weapon.canvasContext.clearRect(0, 0, game.enemy.canvas.width, game.enemy.canvas.height);

		if (bullet.geometryType === game.geometryType.RECTANGLE) {

			game.canvasContext.drawImage(bullet.image.image,
				sourceImageFrameXPosition, 0, bullet.image.frameWidth, bullet.image.frameHeight,
				bullet.position.x, bullet.position.y, bullet.width, bullet.height);

		} else if (bullet.geometryType === game.geometryType.CIRCLE) {
			game.canvasContext.drawImage(bullet.image.image, bullet.position.x - bullet.radius, bullet.position.y - bullet.radius, bullet.radius * 2, bullet.radius * 2);
		}
	}
};

game.render.renderEnemies = function() {
	var enemiesIds = Object.keys(game.enemies);

	game.enemy.canvasContext.clearRect(0, 0, game.enemy.canvas.width, game.enemy.canvas.height);

	for (var i = 0; i < enemiesIds.length; i++) {
		var enemy = game.enemies[enemiesIds[i]];
		game.enemy.canvasContext.drawImage(enemy.image.image, enemy.position.x, enemy.position.y, enemy.width, enemy.height);
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
		game.bullets[i].updateAnimation();
	}
};

/* HAS TO BE GLOBAL IN ORDER FOR ANIMATION
	OPTIMIZATION TO WORK */
function renderEverything() {
	requestAnimFrame(renderEverything);
	game.render.renderBackground();
	game.render.renderPlayer();
	game.render.renderBullets();
	game.render.renderEnemies();
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