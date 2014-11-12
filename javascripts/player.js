game.player = {
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
	image: game.images.ship.image,
	currentImageFrameIndex: 1
};

game.weaponPosition = {
	FIRST_WEAPON: 0,
	LAST_WEAPON: game.player.weapons.length - 1
};