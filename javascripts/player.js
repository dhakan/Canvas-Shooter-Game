game.player = (function() {
	var canvas = document.querySelector("#playerCanvas"),
		context = canvas.getContext("2d");

	return {
		canvas: canvas,
		canvasContext: context,
		position: {
			x: 0,
			y: 0
		},
		width: 40,
		height: 60,
		movingDirectionX: undefined,
		movingDirectionY: undefined,
		movingSpeed: 5,
		weapons: [game.weapons.normal, game.weapons.bomb, game.weapons.other],
		selectedWeaponIndex: 0,
		isCharging: false,
		image: game.images.ship,
		currentImageFrameIndex: 1
	};
}());

game.player.weaponPosition = {
	FIRST_WEAPON: 0,
	LAST_WEAPON: game.player.weapons.length - 1
};