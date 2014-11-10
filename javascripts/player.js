game.player = {
		positions: {
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
			type: "circle",
			radius: 5,
			x: 0,
			y: 0,
			damage: 10,
			movingSpeed: 12,
			isChargable: false,
			image: game.images.normalBullet.image
		}, {
			name: "bomb_bullet",
			type: "rectangle",
			radius: 50,
			x: 0,
			y: 0,
			width: 20,
			height: 50,
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