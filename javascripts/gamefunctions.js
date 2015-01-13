game.setUpPlayer = function() {
	setStartPosition.call(game.player, game.canvas.width / 2 - game.player.width / 2, game.canvas.height - 80);

	game.player.selectedWeapon = game.player.weapons[game.player.selectedWeaponIndex];

	function setStartPosition(x, y) {
		game.player.position.x = x;
		game.player.position.y = y;
	}
};

game.runGameLogicLoop = function() {
	game.player.move();
	game.moveBullets();
	game.enemy.moveEnemies();

	if (game.player.isCharging) {
		game.player.selectedWeapon.width += 0.50;
		game.player.selectedWeapon.height += 1;
	}
};

/* TODO Refactor so that ID's are not handled here, but the actual objects */
game.moveBullets = function() {
	for (var bulletIndex = 0; bulletIndex < game.bullets.length; bulletIndex++) {
		var bullet = game.bullets[bulletIndex];

		var collidingEnemiesIds = game.collision.getCollidingEnemiesIds(bullet);

		if (collidingEnemiesIds.length > 0) {
			updateHPOfObjectsInCollision(bulletIndex, collidingEnemiesIds);
		} else if (getBulletIsOutsideOfCanvasBorder(bullet)) {
			killBullet(bulletIndex);
		} else {
			bullet.move();
		}
	}

	function updateHPOfObjectsInCollision(bulletIndex, collidingEnemiesIds) {
		var bullet = game.bullets[bulletIndex],
			accumulatedDamageDoneToBulletInAllBlockCollisions = 0;

		for (var i = 0; i < collidingEnemiesIds.length; i++) {
			reduceEnemyBlockHP(bullet, collidingEnemiesIds[i]);
		}

		bullet.damage -= accumulatedDamageDoneToBulletInAllBlockCollisions;

		if (bullet.damage <= 0) {
			killBullet(bulletIndex);
		}

		function reduceEnemyBlockHP(bullet, enemyId) {
			var enemy = game.enemies[enemyId],
				damageDoneToBulletInBlockCollision = enemy.hp;

			enemy.hp -= bullet.damage;

			accumulatedDamageDoneToBulletInAllBlockCollisions += damageDoneToBulletInBlockCollision;

			if (enemy.hp <= 0) {
				delete game.enemies[enemyId];
			}
		}
	}

	function killBullet(bulletIndex) {
		game.bullets.splice(bulletIndex, 1);
	}

	function getBulletIsOutsideOfCanvasBorder(bullet) {
		if (bullet.geometryType === game.geometryType.CIRCLE) {
			return bullet.position.y + bullet.radius < 0;
		} else if (bullet.geometryType === game.geometryType.RECTANGLE) {
			return bullet.position.y + bullet.height < 0;
		}
	}
};

/* TODO Implement generalized solution for all kinds of weapon combinations, also move this function to player object */
game.getNewWeaponInstanceByIndex = function(index) {
	var position = {
		x: 0,
		y: 0
	};

	var newWeapon = game.weapons.player.weaponFactory[index]();

	newWeapon.position = position;
	return newWeapon;
};