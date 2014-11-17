var normal = game.weapon.createWeapon("normal_bullet", game.geometryType.RECTANGLE, 10, 6, true, game.images.normalBullet);
normal.width = 25;
normal.height = 50;
normal.updateAnimation = function() {
	if (this.currentImageFrameIndex < this.image.numberOfFrames - 1) {
		this.currentImageFrameIndex++;
	} else {
		this.currentImageFrameIndex--;
	}
};

var bomb = game.weapon.createWeapon("bomb_bullet", game.geometryType.RECTANGLE, 300, 6, false, game.images.bombBullet);
bomb.width = 50;
bomb.height = 100;
bomb.updateAnimation = function() {
	if (this.currentImageFrameIndex < this.image.numberOfFrames - 1) {
		this.currentImageFrameIndex++;
	}
};

var other = game.weapon.createWeapon("other_bullet", game.geometryType.CIRCLE, 200, 10, false, game.images.otherBullet);
other.radius = 50;
other.updateAnimation = function() {
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