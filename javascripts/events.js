function addKeyListeners(keyCodes, player, directions) {
	var verticalArrowKeyDirectionsHeldDown = [],
		horizontalArrowKeyDirectionsHeldDown = [];

	$(document).keydown(arrowKeyDownListener);
	$(document).keyup(arrowKeyUpListener);

	$(document).keydown(chargeShotInitializerListener);
	$(document).keyup(chargeShotReleaseListener);

	$(document).keydown(weaponSwitchListener);

	function arrowKeyDownListener(event) {
		switch (event.which) {
			case keyCodes.up:
				if (verticalArrowKeyDirectionsHeldDown.indexOf(directions.up) === -1) {
					verticalArrowKeyDirectionsHeldDown.push(directions.up);
					player.movingDirectionY = directions.up;
				}
				break;
			case keyCodes.down:
				if (verticalArrowKeyDirectionsHeldDown.indexOf(directions.down) === -1) {
					verticalArrowKeyDirectionsHeldDown.push(directions.down);
					player.movingDirectionY = directions.down;
				}
				break;
			case keyCodes.left:
				if (horizontalArrowKeyDirectionsHeldDown.indexOf(directions.left) === -1) {
					horizontalArrowKeyDirectionsHeldDown.push(directions.left);
					player.movingDirectionX = directions.left;
				}

				break;
			case keyCodes.right:
				if (horizontalArrowKeyDirectionsHeldDown.indexOf(directions.right) === -1) {
					horizontalArrowKeyDirectionsHeldDown.push(directions.right);
					player.movingDirectionX = directions.right;
				}
				break;
		}
	}

	function arrowKeyUpListener(event) {
		if (getKeyReleasedIsAVerticalArrowKey(event.which)) {
			if (event.which === keyCodes.up) {
				removeHeldDownVerticalKey(directions.up);
			} else if (event.which === keyCodes.down) {
				removeHeldDownVerticalKey(directions.down);
			}

			if (verticalArrowKeyDirectionsHeldDown.length === 0) {
				player.movingDirectionY = undefined;
			} else {
				player.movingDirectionY = verticalArrowKeyDirectionsHeldDown[0];
			}
		} else if (getKeyReleasedIsAHorizontalArrowKey(event.which)) {
			if (event.which === keyCodes.left) {
				removeHeldDownHorizontalKey(directions.left);
			} else if (event.which === keyCodes.right) {
				removeHeldDownHorizontalKey(directions.right);
			}

			if (horizontalArrowKeyDirectionsHeldDown.length === 0) {
				player.movingDirectionX = undefined;
			} else {
				player.movingDirectionX = horizontalArrowKeyDirectionsHeldDown[0];
			}
		}

		function getKeyReleasedIsAVerticalArrowKey(keyCode) {
			return keyCode === keyCodes.up ||
				keyCode === keyCodes.down;
		}

		function getKeyReleasedIsAHorizontalArrowKey(keyCode) {
			return keyCode === keyCodes.left ||
				keyCode === keyCodes.right;
		}

		function removeHeldDownVerticalKey(verticalDirection) {
			verticalArrowKeyDirectionsHeldDown.splice(verticalArrowKeyDirectionsHeldDown.indexOf(verticalDirection), 1);
		}

		function removeHeldDownHorizontalKey(horizontalDirection) {
			horizontalArrowKeyDirectionsHeldDown.splice(horizontalArrowKeyDirectionsHeldDown.indexOf(horizontalDirection), 1);
		}
	}

	function chargeShotInitializerListener(event) {
		if (event.which === keyCodes.space &&
			player.selectedWeapon.isChargable) {
			player.initiateChargeBeam();
		}
	}

	function chargeShotReleaseListener(event) {
		switch (event.which) {
			case keyCodes.space:
				player.shootBullet();
				break;
		}
	}

	function weaponSwitchListener(event) {
		if (player.isCharging === false) {
			switch (event.which) {
				case keyCodes.q:
					player.switchWeapon("backwards");
					break;
				case keyCodes.e:
					player.switchWeapon("forward");
					break;
			}
		}
	}
}