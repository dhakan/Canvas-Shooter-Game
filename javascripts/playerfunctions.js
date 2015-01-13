game.player.switchWeapon = function(direction) {
	if (direction === "backwards") {
		if (this.selectedWeaponIndex > this.weaponPosition.FIRST_WEAPON) {
			this.selectedWeaponIndex--;
		} else {
			this.selectedWeaponIndex = this.weaponPosition.LAST_WEAPON;
		}
	} else if (direction === "forward") {
		if (this.selectedWeaponIndex < this.weaponPosition.LAST_WEAPON) {
			this.selectedWeaponIndex++;
		} else {
			this.selectedWeaponIndex = this.weaponPosition.FIRST_WEAPON;
		}
	}
	this.selectedWeapon = game.getNewWeaponInstanceByIndex(this.selectedWeaponIndex);
};

game.player.initiateChargeBeam = function() {
	this.isCharging = true;
};

game.player.shootBullet = function() {
	if (this.isCharging) {
		this.isCharging = false;
	}

	setSelectedWeaponXAndYPositionsAlignedWithPlayer.call(this);

	game.bullets.push(this.selectedWeapon);

	this.selectedWeapon = game.getNewWeaponInstanceByIndex(this.selectedWeaponIndex);

	function setSelectedWeaponXAndYPositionsAlignedWithPlayer() {
		if (this.selectedWeapon.geometryType === game.geometryType.CIRCLE) {
			this.selectedWeapon.position.x = this.position.x + this.width / 2;
			this.selectedWeapon.position.y = this.position.y - this.selectedWeapon.radius;
		} else if (this.selectedWeapon.geometryType === game.geometryType.RECTANGLE) {
			this.selectedWeapon.position.x = this.position.x + this.width / 2 - this.selectedWeapon.width / 2;
			this.selectedWeapon.position.y = this.position.y - this.selectedWeapon.height;
		}
	}
};

game.player.move = function() {
	if (this.movingDirectionY === game.directions.UP &&
		game.collision.playerIsBelowCanvasTopBorder())  {
		this.position.y -= this.movingSpeed;
	} else if (this.movingDirectionY === game.directions.DOWN &&
		game.collision.playerIsAboveCanvasBottomBorder()) {
		this.position.y += this.movingSpeed;
	}

	if (this.movingDirectionX === undefined) {
		game.render.changePlayerImageFrameAccordingToMovingDirection(this.movingDirectionX);
	} else if (this.movingDirectionX === game.directions.LEFT &&
		game.collision.playerIsToTheRightOfCanvasLeftBorder()) {
		this.position.x -= this.movingSpeed;
		game.render.changePlayerImageFrameAccordingToMovingDirection(this.movingDirectionX);
	} else if (this.movingDirectionX === game.directions.RIGHT &&
		game.collision.playerIsToTheLeftOfCanvasRightBorder()) {
		this.position.x += this.movingSpeed;
		game.render.changePlayerImageFrameAccordingToMovingDirection(this.movingDirectionX);
	}
};