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
			case game.keyCodes.up:
				if (verticalArrowKeyDirectionsHeldDown.indexOf(game.directions.up) === -1) {
					verticalArrowKeyDirectionsHeldDown.push(game.directions.up);
					game.player.movingDirectionY = game.directions.up;
				}
				break;
			case game.keyCodes.down:
				if (verticalArrowKeyDirectionsHeldDown.indexOf(game.directions.down) === -1) {
					verticalArrowKeyDirectionsHeldDown.push(game.directions.down);
					game.player.movingDirectionY = game.directions.down;
				}
				break;
			case game.keyCodes.left:
				if (horizontalArrowKeyDirectionsHeldDown.indexOf(game.directions.left) === -1) {
					horizontalArrowKeyDirectionsHeldDown.push(game.directions.left);
					game.player.movingDirectionX = game.directions.left;
				}

				break;
			case game.keyCodes.right:
				if (horizontalArrowKeyDirectionsHeldDown.indexOf(game.directions.right) === -1) {
					horizontalArrowKeyDirectionsHeldDown.push(game.directions.right);
					game.player.movingDirectionX = game.directions.right;
				}
				break;
		}
	}

	function arrowKeyUpListener(event) {
		if (getKeyReleasedIsAVerticalArrowKey(event.which)) {
			if (event.which === game.keyCodes.up) {
				removeHeldDownVerticalKey(game.directions.up);
			} else if (event.which === game.keyCodes.down) {
				removeHeldDownVerticalKey(game.directions.down);
			}

			if (verticalArrowKeyDirectionsHeldDown.length === 0) {
				game.player.movingDirectionY = undefined;
			} else {
				game.player.movingDirectionY = verticalArrowKeyDirectionsHeldDown[0];
			}
		} else if (getKeyReleasedIsAHorizontalArrowKey(event.which)) {
			if (event.which === game.keyCodes.left) {
				removeHeldDownHorizontalKey(game.directions.left);
			} else if (event.which === game.keyCodes.right) {
				removeHeldDownHorizontalKey(game.directions.right);
			}

			if (horizontalArrowKeyDirectionsHeldDown.length === 0) {
				game.player.movingDirectionX = undefined;
			} else {
				game.player.movingDirectionX = horizontalArrowKeyDirectionsHeldDown[0];
			}
		}

		function getKeyReleasedIsAVerticalArrowKey(keyCode) {
			return keyCode === game.keyCodes.up ||
				keyCode === game.keyCodes.down;
		}

		function getKeyReleasedIsAHorizontalArrowKey(keyCode) {
			return keyCode === game.keyCodes.left ||
				keyCode === game.keyCodes.right;
		}

		function removeHeldDownVerticalKey(verticalDirection) {
			verticalArrowKeyDirectionsHeldDown.splice(verticalArrowKeyDirectionsHeldDown.indexOf(verticalDirection), 1);
		}

		function removeHeldDownHorizontalKey(horizontalDirection) {
			horizontalArrowKeyDirectionsHeldDown.splice(horizontalArrowKeyDirectionsHeldDown.indexOf(horizontalDirection), 1);
		}
	}

	function chargeShotInitializerListener(event) {
		if (event.which === game.keyCodes.space &&
			game.player.selectedWeapon.isChargable) {
			game.player.initiateChargeBeam();
		}
	}

	function chargeShotReleaseListener(event) {
		switch (event.which) {
			case game.keyCodes.space:
				game.player.shootBullet();
				break;
		}
	}

	function weaponSwitchListener(event) {
		if (game.player.isCharging === false) {
			switch (event.which) {
				case game.keyCodes.q:
					game.player.switchWeapon("backwards");
					break;
				case game.keyCodes.e:
					game.player.switchWeapon("forward");
					break;
			}
		}
	}
};