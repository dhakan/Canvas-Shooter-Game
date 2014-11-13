game.createWeapon = function(name, geometryType, damage, movingSpeed, isChargable, image) {
	var that = {
		name: name,
		geometryType: geometryType,
		position: {
			x: 0,
			y: 0	
		},
		damage: damage,
		movingSpeed: movingSpeed,
		isChargable: isChargable,
		image: image,
		currentImageFrameIndex: 0
	};
	return that;
};

var normal = game.createWeapon("normal_bullet", game.geometryType.RECTANGLE, 10, 12, false, game.images.normalBullet);
normal.width = 30;
normal.height = 60;

var bomb = game.createWeapon("bomb_bullet", game.geometryType.RECTANGLE, 300, 6, false, game.images.bombBullet);
bomb.width = 50;
bomb.height = 100;

var other = game.createWeapon("other_bullet", game.geometryType.CIRCLE, 200, 10, false, game.images.otherBullet);
other.radius = 50;

game.weapons = {
	normal: normal,
	bomb: bomb,
	other: other
};




