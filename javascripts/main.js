$(function() {
	(function initalizeGame() {
		game.setUpEnemyBarricade();
		game.player.selectedWeapon = game.getCopyOfWeaponAtCurrentWeaponPosition();
		game.player.setStartPosition(game.canvas.width / 2 - game.player.width / 2, game.canvas.height - 80);
		game.addKeyListeners();
		setInterval(game.runGameLoop, 16);
		// setInterval(game.addEnemyBlock, 2000);
	}());
});