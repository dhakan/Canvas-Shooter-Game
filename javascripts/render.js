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
	var sourceImageFrameXPosition = game.player.currentImageFrameIndex * 92;

	game.canvasContext.drawImage(game.player.image, 
		sourceImageFrameXPosition, 0, 92, 108, 
		game.player.position.x, game.player.position.y, game.player.width, game.player.height);
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

game.render.changePlayerImageFrameAccordingToMovingDirection = function(direction) {
	if (direction === game.directions.left) {
		game.player.currentImageFrameIndex = 0;
	} else if (direction === game.directions.right) {
		game.player.currentImageFrameIndex = 2;
	} else {
		game.player.currentImageFrameIndex = 1;
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
};

/* PAUL IRISH ANIMATION OPTIMIZATION */
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();