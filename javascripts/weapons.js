function moveBulletVerticallyUpwards() {
	this.position.y -= this.movingSpeed;
}

function moveBulletVerticallyDownwards() {
	this.position.y += this.movingSpeed;
}

function createNormalWeapon() {
	var normalWeapon = game.weapon.createWeapon("normal_bullet", game.geometryType.RECTANGLE, 10, 6, true, game.images.normalBullet);
	normalWeapon.width = 25;
	normalWeapon.height = 50;
	normalWeapon.updateAnimation = function() {
		if (this.currentImageFrameIndex < this.image.numberOfFrames - 1) {
			this.currentImageFrameIndex++;
		} else {
			this.currentImageFrameIndex--;
		}
	};
	normalWeapon.move = moveBulletVerticallyUpwards;

	return normalWeapon;
};

function createBombWeapon() {
	var bombWeapon = game.weapon.createWeapon("bomb_bullet", game.geometryType.RECTANGLE, 300, 6, false, game.images.bombBullet);
	bombWeapon.width = 50;
	bombWeapon.height = 100;
	bombWeapon.updateAnimation = function() {
		if (this.currentImageFrameIndex < this.image.numberOfFrames - 1) {
			this.currentImageFrameIndex++;
		}
	};
	bombWeapon.move = moveBulletVerticallyUpwards;

	return bombWeapon;
}

function createOtherWeapon() {
	var otherWeapon = game.weapon.createWeapon("other_bullet", game.geometryType.CIRCLE, 200, 10, false, game.images.otherBullet);
	otherWeapon.radius = 50;
	otherWeapon.updateAnimation = function() {
		if (this.currentImageFrameIndex < this.image.numberOfFrames - 1) {
			this.currentImageFrameIndex++;
		} else {
			this.currentImageFrameIndex--;
		}
	};
	otherWeapon.move = moveBulletVerticallyUpwards;

	return otherWeapon;
}

function createNormalEnemyWeapon() {
	var normalEnemyWeapon = game.weapon.createWeapon("normal_bullet", game.geometryType.RECTANGLE, 10, 3, true, game.images.normalBullet);
	normalEnemyWeapon.width = 25;
	normalEnemyWeapon.height = 50;
	normalEnemyWeapon.updateAnimation = function() {
		if (this.currentImageFrameIndex < this.image.numberOfFrames - 1) {
			this.currentImageFrameIndex++;
		} else {
			this.currentImageFrameIndex--;
		}
	};
	normalEnemyWeapon.move = moveBulletVerticallyDownwards;

	return normalEnemyWeapon;
}

game.weapons = {
	player: {
		weaponFactory: [
			createNormalWeapon,
			createBombWeapon,
			createOtherWeapon
		]
	},
	enemy: {
		createNormalEnemyWeapon: createNormalEnemyWeapon
	}
};