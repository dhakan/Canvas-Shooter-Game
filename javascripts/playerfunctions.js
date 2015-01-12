game.player.setStartPosition = function(x, y) {
	game.player.position.x = x;
	game.player.position.y = y;
};

game.player.switchWeapon = function(direction) {
	if (direction === "backwards") {
		if (game.player.selectedWeaponIndex > game.player.weaponPosition.FIRST_WEAPON) {
			game.player.selectedWeaponIndex--;
		} else {
			game.player.selectedWeaponIndex = game.player.weaponPosition.LAST_WEAPON;
		}
	} else if (direction === "forward") {
		if (game.player.selectedWeaponIndex < game.player.weaponPosition.LAST_WEAPON) {
			game.player.selectedWeaponIndex++;
		} else {
			game.player.selectedWeaponIndex = game.player.weaponPosition.FIRST_WEAPON;
		}
	}
	game.player.selectedWeapon = game.getCopyOfWeaponAtCurrentWeaponPosition();
};

game.player.initiateChargeBeam = function() {
	game.player.isCharging = true;
};

game.player.shootBullet = function() {
	if (game.player.isCharging) {
		game.player.isCharging = false;
	}

	setSelectedWeaponXAndYPositionsAlignedWithPlayer();

	game.bullets.push(game.player.selectedWeapon);

	game.player.selectedWeapon = game.getCopyOfWeaponAtCurrentWeaponPosition();

	function setSelectedWeaponXAndYPositionsAlignedWithPlayer() {
		if (game.player.selectedWeapon.geometryType === game.geometryType.CIRCLE) {
			game.player.selectedWeapon.position.x = game.player.position.x + game.player.width / 2;
			game.player.selectedWeapon.position.y = game.player.position.y - game.player.selectedWeapon.radius;
		} else if (game.player.selectedWeapon.geometryType === game.geometryType.RECTANGLE) {
			game.player.selectedWeapon.position.x = game.player.position.x + game.player.width / 2 - game.player.selectedWeapon.width / 2;
			game.player.selectedWeapon.position.y = game.player.position.y - game.player.selectedWeapon.height;
		}
	}
};

game.player.move = function() {
	if (game.player.movingDirectionY === game.directions.UP &&
		game.collision.playerIsBelowCanvasTopBorder())  {
		game.player.position.y -= game.player.movingSpeed;
	} else if (game.player.movingDirectionY === game.directions.DOWN &&
		game.collision.playerIsAboveCanvasBottomBorder()) {
		game.player.position.y += game.player.movingSpeed;
	}

	if (game.player.movingDirectionX === undefined) {
		game.render.changePlayerImageFrameAccordingToMovingDirection(game.player.movingDirectionX);
	} else if (game.player.movingDirectionX === game.directions.LEFT &&
		game.collision.playerIsToTheRightOfCanvasLeftBorder()) {
		game.player.position.x -= game.player.movingSpeed;
		game.render.changePlayerImageFrameAccordingToMovingDirection(game.player.movingDirectionX);
	} else if (game.player.movingDirectionX === game.directions.RIGHT &&
		game.collision.playerIsToTheLeftOfCanvasRightBorder()) {
		game.player.position.x += game.player.movingSpeed;
		game.render.changePlayerImageFrameAccordingToMovingDirection(game.player.movingDirectionX);
	}
};