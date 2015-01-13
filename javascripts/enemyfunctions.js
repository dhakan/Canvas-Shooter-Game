game.enemy.spawnNormalEnemies = function() {
	var enemyXPosition = Math.floor(Math.random() * (game.canvas.width - 50)),
		enemyYPosition = 0;

	function shoot() {
		setWeaponXAndYPositionsAlignedWithEnemy.call(this);

		game.bullets.push(this.weapon);

		enemy.weapon = game.weapons.enemy.createNormalEnemyWeapon();

		function setWeaponXAndYPositionsAlignedWithEnemy() {
			this.weapon.position.x = this.position.x + this.width / 2 - this.weapon.width / 2;
			this.weapon.position.y = this.position.y + this.height;
		}
	};

	for (var i = 0; i < 5; i++) {
		var weapon = game.weapons.enemy.createNormalEnemyWeapon();

		var enemy = game.enemy.createEnemy("normal_enemy", game.geometryType.RECTANGLE,
			enemyXPosition, enemyYPosition, 50, 2, game.images.normalEnemy, weapon);

		enemy.width = 50;
		enemy.height = 50;

		enemy.shoot = shoot;

		game.enemies[enemy.id] = enemy;

		enemyYPosition -= enemy.height;
	}
};

game.enemy.normalEnemyShoot = function() {
	var enemiesIds = Object.keys(game.enemies);

	for (var i = 0; i < enemiesIds.length; i++) {
		var enemy = game.enemies[enemiesIds[i]];
		enemy.shoot();
	}
};

game.enemy.moveEnemies = function() {
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