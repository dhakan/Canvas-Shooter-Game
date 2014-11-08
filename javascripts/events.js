function addKeyListeners(keyCodes, player, directions) {
	$(document).keydown(arrowKeyPressListener);
	$(document).keyup(arrowKeyReleaseListener);

	$(document).keydown(chargeShotInitializerListener);
	$(document).keyup(chargeShotReleaseListener);

	$(document).keydown(weaponSwitchListener);

	function arrowKeyPressListener(event) {
		switch (event.which) {
			case keyCodes.up : player.movingDirectionY = directions.up; break;
			case keyCodes.down : player.movingDirectionY = directions.down; break;
			case keyCodes.left : player.movingDirectionX = directions.left; break;
			case keyCodes.right : player.movingDirectionX = directions.right; break;
		}
	}

	function arrowKeyReleaseListener(event) {
		switch (event.which) {
			case keyCodes.up : player.movingDirectionY = undefined; break;
			case keyCodes.down : player.movingDirectionY = undefined; break;
			case keyCodes.left : player.movingDirectionX = undefined; break;
			case keyCodes.right : player.movingDirectionX = undefined; break;
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
			case keyCodes.space : player.releaseBullet(); break;
		}
	}

	function weaponSwitchListener(event) {
		switch (event.which) {
			case keyCodes.q : player.switchWeapon("backwards"); break;
			case keyCodes.e : player.switchWeapon("forward"); break;
		}
	}
}