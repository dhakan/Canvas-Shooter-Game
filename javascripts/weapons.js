game.weapons = {
		normal: {
			name: "normal_bullet",
			type: game.bulletType.rectangle,
			// radius: 15,
			x: 0,
			y: 0,
			width: 15,
			height: 30,
			damage: 10,
			movingSpeed: 8,
			isChargable: true,
			image: game.images.normalBullet.image
		},
		bomb: {
			name: "bomb_bullet",
			type: game.bulletType.rectangle,
			// radius: 50,
			x: 0,
			y: 0,
			width: 50,
			height: 100,
			damage: 200,
			movingSpeed: 6,
			isChargable: false,
			image: game.images.bombBullet.image
		}
	};