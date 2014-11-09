$(function() {
	(function initalizeGame() {
		game.setUpEnemyBarricade();
		game.player.selectedWeapon = game.getCopyOfWeaponAtCurrentWeaponArsenalPosition();
		game.player.positions.x = game.canvas.width / 2 - game.player.width / 2;
		game.player.positions.y = game.canvas.height - 80;
		game.addKeyListeners();
		setInterval(game.runGameLoop, 16);
		setInterval(game.addEnemyBlock, 2000);
	}());
});