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
		game.player.selectedWeapon.damage = game.player.selectedWeapon.radius / 2;
	}

	game.player.selectedWeapon.x = game.player.positions.x + game.player.width / 2;
	game.player.selectedWeapon.y = game.player.positions.y - game.player.selectedWeapon.radius;
	game.player.selectedWeapon.color = game.player.color;

	game.bullets.push(game.player.selectedWeapon);

	game.player.selectedWeapon = game.getCopyOfWeaponAtCurrentWeaponArsenalPosition();
};

game.player.move = function() {
	if (game.player.movingDirectionY === game.directions.up &&
		game.collision.playerIsBelowCanvasTopBorder())  {
		game.player.positions.y -= game.player.movingSpeed;

	} else if (game.player.movingDirectionY === game.directions.down &&
		game.collision.playerIsAboveCanvasBottomBorder()) {
		game.player.positions.y += game.player.movingSpeed;
	}

	if (game.player.movingDirectionX === game.directions.left &&
		game.collision.playerIsToTheRightOfCanvasLeftBorder()) {
		game.player.positions.x -= game.player.movingSpeed;

	} else if (game.player.movingDirectionX === game.directions.right &&
		game.collision.playerIsToTheLeftOfCanvasRightBorder()) {
		game.player.positions.x += game.player.movingSpeed;
	}
};