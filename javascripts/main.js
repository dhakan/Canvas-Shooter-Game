$(function() {
	(function initalizeGame() {
		game.setUpPlayer();
		game.addKeyListeners();
		setInterval(game.runGameLogicLoop, 1000 / 60);
		setInterval(game.enemy.spawnNormalEnemies, 1000);
		setInterval(game.enemy.normalEnemyShoot, 500)
		game.render.startRendering();
		setInterval(game.render.changeAnimationFrames, 10);
	}());
});