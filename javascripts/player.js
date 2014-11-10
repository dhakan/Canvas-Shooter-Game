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
	weaponArsenal: [{
		name: "normal_bullet",
		type: "rectangle",
		radius: 15,
		x: 0,
		y: 0,
		width: 15,
		height: 30,
		damage: 10,
		movingSpeed: 8,
		isChargable: true,
		image: game.images.normalBullet.image
	}, {
		name: "bomb_bullet",
		type: "rectangle",
		radius: 50,
		x: 0,
		y: 0,
		width: 50,
		height: 100,
		damage: 200,
		movingSpeed: 6,
		isChargable: false,
		image: game.images.bombBullet.image
	}],
	selectedWeaponIndex: 0,
	isCharging: false,
};

game.weaponArsenalPositions = {
	FIRST_WEAPON: 0,
	LAST_WEAPON: game.player.weaponArsenal.length - 1
};