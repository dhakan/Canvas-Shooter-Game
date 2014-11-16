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

var normal = game.createWeapon("normal_bullet", game.geometryType.RECTANGLE, 10, 6, true, game.images.normalBullet);
normal.width = 25;
normal.height = 50;
normal.updateAnimation = function() {
	console.log(this.currentImageFrameIndex);
	if (this.currentImageFrameIndex < this.image.numberOfFrames - 1) {
		this.currentImageFrameIndex++;
	} else {
		this.currentImageFrameIndex--;
	}
};

var bomb = game.createWeapon("bomb_bullet", game.geometryType.RECTANGLE, 300, 6, false, game.images.bombBullet);
bomb.width = 50;
bomb.height = 100;
bomb.updateAnimation = function() {
	if (this.currentImageFrameIndex < this.image.numberOfFrames - 1) {
		this.currentImageFrameIndex++;
	}
};

var other = game.createWeapon("other_bullet", game.geometryType.CIRCLE, 200, 10, false, game.images.otherBullet);
other.radius = 50;
other.updateAnimation = function() {
	if (this.hp <= 0) {

	}
	if (this.currentImageFrameIndex < this.image.numberOfFrames - 1) {
		this.currentImageFrameIndex++;
	} else {
		this.currentImageFrameIndex--;
	}
};


game.weapons = {
	normal: normal,
	bomb: bomb,
	other: other
};