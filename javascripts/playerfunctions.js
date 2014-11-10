game.player.setStartPosition = function(x, y) {
	game.player.position.x = x;
	game.player.position.y = y;
};

game.player.switchWeapon = function(direction) {
	if (direction === "backwards") {
		if (game.player.selectedWeaponIndex > game.weaponArsenalPositions.FIRST_WEAPON) {
			game.player.selectedWeaponIndex--;
		} else {
			game.player.selectedWeaponIndex = game.weaponArsenalPositions.LAST_WEAPON;
		}
	} else if (direction === "forward") {
		if (game.player.selectedWeaponIndex < game.weaponArsenalPositions.LAST_WEAPON) {
			game.player.selectedWeaponIndex++;
		} else {
			game.player.selectedWeaponIndex = game.weaponArsenalPositions.FIRST_WEAPON;
		}
	}
	game.player.selectedWeapon = game.getCopyOfWeaponAtCurrentWeaponArsenalPosition();
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

	game.player.selectedWeapon = game.getCopyOfWeaponAtCurrentWeaponArsenalPosition();

	function setSelectedWeaponXAndYPositionsAlignedWithPlayer() {
		if (game.player.selectedWeapon.type === game.bulletType.circle) {
			game.player.selectedWeapon.x = game.player.position.x + game.player.width / 2;
			game.player.selectedWeapon.y = game.player.position.y - game.player.selectedWeapon.radius;
		} else if (game.player.selectedWeapon.type === game.bulletType.rectangle) {
			game.player.selectedWeapon.x = game.player.position.x + game.player.width / 2 - game.player.selectedWeapon.width / 2;
			game.player.selectedWeapon.y = game.player.position.y - game.player.selectedWeapon.height;
		}
	}
};

game.player.move = function() {
	if (game.player.movingDirectionY === game.directions.up &&
		game.collision.playerIsBelowCanvasTopBorder())  {
		game.player.position.y -= game.player.movingSpeed;
	} else if (game.player.movingDirectionY === game.directions.down &&
		game.collision.playerIsAboveCanvasBottomBorder()) {
		game.player.position.y += game.player.movingSpeed;
	}

	if (game.player.movingDirectionX === game.directions.left &&
		game.collision.playerIsToTheRightOfCanvasLeftBorder()) {
		game.player.position.x -= game.player.movingSpeed;
	} else if (game.player.movingDirectionX === game.directions.right &&
		game.collision.playerIsToTheLeftOfCanvasRightBorder()) {
		game.player.position.x += game.player.movingSpeed;
	}
};