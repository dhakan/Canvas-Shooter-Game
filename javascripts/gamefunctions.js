game.runGameLogicLoop = function() {
	game.player.move();
	game.moveBullets();
	game.moveEnemies();

	if (game.player.isCharging) {
		game.player.selectedWeapon.width += 0.50;
		game.player.selectedWeapon.height += 1;
	}
};

game.spawnNormalEnemies = function() {
	var enemyXPosition = Math.floor(Math.random() * (game.canvas.width - 50)),
		enemyYPosition = 0;

	for (var i = 0; i < 5; i++) {
		// TODO Add weapon to enemies

		var enemy = game.enemy.createEnemy("normal_enemy", game.geometryType.RECTANGLE,
			enemyXPosition, enemyYPosition, 50, 2, game.images.normalEnemy);

		enemy.width = 50;
		enemy.height = 50;

		game.enemies[enemy.id] = enemy;

		enemyYPosition -= enemy.height;
	}
};

game.moveBullets = function() {
	for (var bulletIndex = 0; bulletIndex < game.bullets.length; bulletIndex++) {
		var bullet = game.bullets[bulletIndex];

		var collidingEnemiesIds = game.collision.getCollidingEnemiesIds(bullet);

		if (collidingEnemiesIds.length > 0) {
			updateHPOfObjectsInCollision(bulletIndex, collidingEnemiesIds);
		} else if (getBulletIsOutsideOfCanvasBorder(bullet)) {
			killBullet(bulletIndex);
		} else {
			bullet.position.y -= bullet.movingSpeed;
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

game.moveEnemies = function() {
	var enemiesIds = Object.keys(game.enemies);

	for (var i = 0; i < enemiesIds.length; i++) {
		var enemy = game.enemies[enemiesIds[i]];
		enemy.position.y += enemy.movingSpeed;

		if (getEnemyIsOutsideOfCanvasBorder(enemy)) {
			killEnemy(enemy.id);
		}
	}

	function killEnemy(enemyId) {
		delete game.enemies[enemyId];
	}

	function getEnemyIsOutsideOfCanvasBorder(enemy) {
		return enemy.position.y > game.canvas.height;
	}
};

/* TODO Implement generalized solution for all kinds of weapon combinations */
game.getCopyOfWeaponAtCurrentWeaponPosition = function() {
	var clonedPosition = _.clone(game.weapons.normal.position);
	var clonedWeapon = _.clone(game.player.weapons[game.player.selectedWeaponIndex]);
	clonedWeapon.position = clonedPosition;
	return clonedWeapon;
};