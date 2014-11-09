$(function() {
	(function initalizeGame() {
		game.setUpEnemyBarricade();
		game.player.selectedWeapon = game.getCopyOfWeaponAtCurrentWeaponArsenalPosition();
		game.addKeyListeners();
		setInterval(game.runGameLoop, 16);
		setInterval(game.addEnemyBlock, 2000);
	}());
});