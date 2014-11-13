game.addKeyListeners = function() {
	var verticalArrowKeyDirectionsHeldDown = [],
		horizontalArrowKeyDirectionsHeldDown = [];

	$(document).keydown(arrowKeyDownListener);
	$(document).keyup(arrowKeyUpListener);

	$(document).keydown(chargeShotInitializerListener);
	$(document).keyup(chargeShotReleaseListener);

	$(document).keydown(weaponSwitchListener);

	function arrowKeyDownListener(event) {
		switch (event.which) {
			case game.keyCodes.UP:
				if (verticalArrowKeyDirectionsHeldDown.indexOf(game.directions.UP) === -1) {
					verticalArrowKeyDirectionsHeldDown.push(game.directions.UP);
					game.player.movingDirectionY = game.directions.UP;
				}
				break;
			case game.keyCodes.DOWN:
				if (verticalArrowKeyDirectionsHeldDown.indexOf(game.directions.DOWN) === -1) {
					verticalArrowKeyDirectionsHeldDown.push(game.directions.DOWN);
					game.player.movingDirectionY = game.directions.DOWN;
				}
				break;
			case game.keyCodes.LEFT:
				if (horizontalArrowKeyDirectionsHeldDown.indexOf(game.directions.LEFT) === -1) {
					horizontalArrowKeyDirectionsHeldDown.push(game.directions.LEFT);
					game.player.movingDirectionX = game.directions.LEFT;
				}

				break;
			case game.keyCodes.RIGHT:
				if (horizontalArrowKeyDirectionsHeldDown.indexOf(game.directions.RIGHT) === -1) {
					horizontalArrowKeyDirectionsHeldDown.push(game.directions.RIGHT);
					game.player.movingDirectionX = game.directions.RIGHT;
				}
				break;
		}
	}

	function arrowKeyUpListener(event) {
		if (getKeyReleasedIsAVerticalArrowKey(event.which)) {
			if (event.which === game.keyCodes.UP) {
				removeHeldDownVerticalKey(game.directions.UP);
			} else if (event.which === game.keyCodes.DOWN) {
				removeHeldDownVerticalKey(game.directions.DOWN);
			}

			if (verticalArrowKeyDirectionsHeldDown.length === 0) {
				game.player.movingDirectionY = undefined;
			} else {
				game.player.movingDirectionY = verticalArrowKeyDirectionsHeldDown[0];
			}
		} else if (getKeyReleasedIsAHorizontalArrowKey(event.which)) {
			if (event.which === game.keyCodes.LEFT) {
				removeHeldDownHorizontalKey(game.directions.LEFT);
			} else if (event.which === game.keyCodes.RIGHT) {
				removeHeldDownHorizontalKey(game.directions.RIGHT);
			}

			if (horizontalArrowKeyDirectionsHeldDown.length === 0) {
				game.player.movingDirectionX = undefined;
			} else {
				game.player.movingDirectionX = horizontalArrowKeyDirectionsHeldDown[0];
			}
		}

		function getKeyReleasedIsAVerticalArrowKey(keyCode) {
			return keyCode === game.keyCodes.UP ||
				keyCode === game.keyCodes.DOWN;
		}

		function getKeyReleasedIsAHorizontalArrowKey(keyCode) {
			return keyCode === game.keyCodes.LEFT ||
				keyCode === game.keyCodes.RIGHT;
		}

		function removeHeldDownVerticalKey(verticalDirection) {
			verticalArrowKeyDirectionsHeldDown.splice(verticalArrowKeyDirectionsHeldDown.indexOf(verticalDirection), 1);
		}

		function removeHeldDownHorizontalKey(horizontalDirection) {
			horizontalArrowKeyDirectionsHeldDown.splice(horizontalArrowKeyDirectionsHeldDown.indexOf(horizontalDirection), 1);
		}
	}

	function chargeShotInitializerListener(event) {
		if (event.which === game.keyCodes.SPACE &&
			game.player.selectedWeapon.isChargable) {
			game.player.initiateChargeBeam();
		}
	}

	function chargeShotReleaseListener(event) {
		switch (event.which) {
			case game.keyCodes.SPACE:
				game.player.shootBullet();
				break;
		}
	}
 
	function weaponSwitchListener(event) {
		if (game.player.weapons.length > 1) {
			if (event.which === game.keyCodes.Q || 
				event.which === game.keyCodes.E) {
				if (game.player.isCharging) {
					game.player.isCharging = false;
				}

				if (event.which === game.keyCodes.Q) {
					game.player.switchWeapon("backwards");
				} else if (event.which === game.keyCodes.E) {
					game.player.switchWeapon("forward");
				}
			}
		}
	}
};