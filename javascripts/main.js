$(function() {
	(function initalizeGame() {
		// game.setUpEnemyBarricade();
		game.player.selectedWeapon = game.getCopyOfWeaponAtCurrentWeaponPosition();
		game.player.setStartPosition(game.canvas.width / 2 - game.player.width / 2, game.canvas.height - 80);
		game.addKeyListeners();
		setInterval(game.runGameLogicLoop, 1000 / 60);
		setInterval(game.spawnNormalEnemies, 2000);
		game.spawnNormalEnemies();
		game.render.startRendering();
		setInterval(game.render.changeAnimationFrames, 10);
	}());
});