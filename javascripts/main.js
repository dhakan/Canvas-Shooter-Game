$(function() {
	(function initalizeGame() {
		game.setUpEnemyBarricade();
		game.player.selectedWeapon = game.player.weaponArsenal[game.weaponArsenalPositions.FIRST_WEAPON];
		game.addKeyListeners();
		setInterval(game.runGameLoop, 16);
		setInterval(game.addEnemyBlock, 2000);
	}());
});