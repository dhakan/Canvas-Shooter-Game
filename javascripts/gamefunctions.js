game.runGameLoop = function() {
	game.render.renderBackground();

	game.player.move();
	game.moveBullets();

	if (game.player.isCharging) {
		game.player.selectedWeapon.radius += 0.30;
	}

	game.render.renderPlayer();
	game.render.renderBullets();
	game.render.renderEnemyBlocks();
};

game.setUpEnemyBarricade = function() {
	var currentRowEnemyBlockYPosition = 50;

	for (var row = 0; row < 5; row++) {
		var currentRowEnemyBlockXPosition = 50,
			newBlockFitsOnRow = true,
			currentRowEnemyHP = Math.ceil(Math.random() * 20) + 15;

		while (newBlockFitsOnRow) {
			var enemyBlock = {
				id: game.getNewEnemyId(),
				hp: currentRowEnemyHP,
				color: game.getRandomColor(),
				width: currentRowEnemyHP,
				height: currentRowEnemyHP,
				x: currentRowEnemyBlockXPosition,
				y: currentRowEnemyBlockYPosition,
				image: game.images.normalEnemy.image
			};

			if (getBlockFitsOnCurrentRow(enemyBlock.width)) {
				game.enemyBlocks[enemyBlock.id] = enemyBlock;
				currentRowEnemyBlockXPosition += enemyBlock.width;
			} else {
				newBlockFitsOnRow = false;
				currentRowEnemyBlockYPosition = currentRowEnemyBlockYPosition + enemyBlock.height;
			}
		}
	}

	function getBlockFitsOnCurrentRow(enemyBlockWidth) {
		return game.canvas.width - (currentRowEnemyBlockXPosition + enemyBlockWidth) >= 50;
	}
};

game.addEnemyBlock = function() {
	var lastEnemyBlock = getLastEnemyBlock(),
		enemyHP = Math.ceil(Math.random() * 50) + 20;

	var enemyBlock = {
		id: game.getNewEnemyId(),
		hp: enemyHP,
		color: game.getRandomColor(),
		width: enemyHP,
		height: enemyHP,
		x: lastEnemyBlock.x,
		y: lastEnemyBlock.y + lastEnemyBlock.height,
		image: game.images.normalEnemy.image
	};
	game.enemyBlocks[enemyBlock.id] = enemyBlock;

	function getLastEnemyBlock() {
		var lastEnemyBlock = {},
			lastEnemyBlockXPosition = 0,
			lastEnemyBlockYPosition = 0;

		for (var enemyBlockId in game.enemyBlocks) {
			var enemyBlock = game.enemyBlocks[enemyBlockId];

			if (enemyBlock.x > lastEnemyBlockXPosition) {
				lastEnemyBlockXPosition = enemyBlock.x;
				lastEnemyBlock = enemyBlock;
			}

			if (enemyBlock.y > lastEnemyBlockYPosition) {
				lastEnemyBlockYPosition = enemyBlock.y;
				lastEnemyBlock = enemyBlock;
			}
		}
		return lastEnemyBlock;
	}
};

game.moveBullets = function() {
	for (var bulletIndex = 0; bulletIndex < game.bullets.length; bulletIndex++) {

		var collidingEnemyBlocksIds = game.collision.getCollidingEnemyBlocksIds(game.bullets[bulletIndex]);

		if (collidingEnemyBlocksIds.length > 0) {
			updateObjectsInCollision(bulletIndex, collidingEnemyBlocksIds);
		} else if (getBulletIsOutsideOfCanvasBorder(game.bullets[bulletIndex])) {
			killBullet(bulletIndex);
		} else {
			game.bullets[bulletIndex].y -= game.bullets[bulletIndex].movingSpeed;
		}
	}

	function updateObjectsInCollision(bulletIndex, collidingEnemyBlocksIds) {
		var bullet = game.bullets[bulletIndex],
			accumulatedDamageDoneToBulletInAllBlockCollisions = 0;

		for (var i = 0; i < collidingEnemyBlocksIds.length; i++) {
			reduceEnemyBlockHP(bullet, collidingEnemyBlocksIds[i]);
		}

		bullet.damage -= accumulatedDamageDoneToBulletInAllBlockCollisions;

		if (bullet.damage <= 0) {
			killBullet(bulletIndex);
		}

		function reduceEnemyBlockHP(bullet, enemyBlockId) {
			var enemyBlock = game.enemyBlocks[enemyBlockId],
				damageDoneToBulletInBlockCollision = enemyBlock.hp;

			enemyBlock.hp -= bullet.damage;

			accumulatedDamageDoneToBulletInAllBlockCollisions += damageDoneToBulletInBlockCollision;

			if (enemyBlock.hp <= 0) {
				delete game.enemyBlocks[enemyBlockId];
			}
		}
	}

	function killBullet(bulletIndex) {
		game.bullets.splice(bulletIndex, 1);
	}

	function getBulletIsOutsideOfCanvasBorder(bullet) {
		return bullet.y + bullet.radius < 0;
	}
};

game.getRandomColor = function() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

game.getCopyOfWeaponAtCurrentWeaponArsenalPosition = function() {
	var weaponAtCurrentWeaponPosition = game.player.weaponArsenal[game.player.selectedWeaponIndex];

	var copyOfCurrentWeapon = {
		type: weaponAtCurrentWeaponPosition.type,
		radius: weaponAtCurrentWeaponPosition.radius,
		damage: weaponAtCurrentWeaponPosition.damage,
		movingSpeed: weaponAtCurrentWeaponPosition.movingSpeed,
		image: weaponAtCurrentWeaponPosition.image
	}

	return copyOfCurrentWeapon;
}