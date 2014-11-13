game.weapons = {
		superType: {
			name: undefined,
			type: undefined,
			x: undefined,
			y: undefined,
			damage: undefined,
			movingSpeed: undefined,
			isChargable: undefined,
			image: undefined
		}
	};

game.weapons.normal = {
			name: "normal_bullet",
			type: game.bulletType.rectangle,
			x: 0,
			y: 0,
			width: 15,
			height: 30,
			damage: 10,
			movingSpeed: 12,
			isChargable: true,
			image: game.images.normalBullet.image
		};

game.weapons.bomb = {
			name: "bomb_bullet",
			type: game.bulletType.rectangle,
			x: 0,
			y: 0,
			width: 50,
			height: 100,
			damage: 300,
			movingSpeed: 6,
			isChargable: false,
			image: game.images.bombBullet.image
		};

game.weapons.other = {
			name: "other_bullet",
			type: game.bulletType.circle,
			radius: 50,
			x: 0,
			y: 0,
			damage: 200,
			movingSpeed: 10,
			isChargable: false,
			image: game.images.otherBullet.image
		};




