$(function() {
	var canvas = document.querySelector("canvas"),
		context = canvas.getContext("2d");

	var enemyBlocks = {},
		enemyIdCounter = 0;


	function getNewEnemyId() {
		return enemyIdCounter++;
	}

	function setUpEnemyBarricade() {
		var currentRowEnemyBlockYPosition = 50;

		for (var row = 0; row < 3; row++) {
			var currentRowEnemyBlockXPosition = 50,
				newBlockFitsOnRow = true,
				currentRowEnemyHP = Math.ceil(Math.random() * 20) + 15;

			while (newBlockFitsOnRow) {
				var enemyBlock = {
					id: getNewEnemyId(),
					hp: currentRowEnemyHP,
					color: getRandomColor(),
					width: currentRowEnemyHP,
					height: currentRowEnemyHP,
					x: currentRowEnemyBlockXPosition,
					y: currentRowEnemyBlockYPosition
				};

				if (getBlockFitsOnCurrentRow(enemyBlock.width)) {
					enemyBlocks[enemyBlock.id] = enemyBlock;
					currentRowEnemyBlockXPosition += enemyBlock.width;
				} else {
					newBlockFitsOnRow = false;
					currentRowEnemyBlockYPosition = currentRowEnemyBlockYPosition + enemyBlock.height;
				}
			}
		}

		function getBlockFitsOnCurrentRow(enemyBlockWidth) {
			return canvas.width - (currentRowEnemyBlockXPosition + enemyBlockWidth) >= 50;
		}
	}

	function getRandomColor() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	var movingRestrictionBarrier = {
		color: "gray",
		x: 0,
		y: 450,
		width: canvas.width,
		height: 1
	};

	var bullets = [];

	var player = {
		color: "white",
		cornerPositions: {
			top: {
				x: canvas.width / 2,
				y: canvas.height - 50
			},
			bottomRight: {
				x: canvas.width / 2 + 15,
				y: canvas.height - 25
			},
			bottomLeft: {
				x: canvas.width / 2 - 15,
				y: canvas.height - 25
			}
		},
		positionX: 0,
		positionY: 0,
		movingDirectionX: undefined,
		movingDirectionY: undefined,
		movingSpeed: 5,
		weaponArsenal: [{
			type: "normal",
			color: "white",
			radius: 2,
			movingSpeed: 12,
			isChargable: true
		}, {
			type: "bomb",
			color: "red",
			radius: 100,
			damage: 200,
			movingSpeed: 6,
			isChargable: false
		}],
		selectedWeaponIndex: 0,
		isCharging: false,
	};

	var weaponArsenalPositions = {
		FIRST_WEAPON: 0,
		LAST_WEAPON: player.weaponArsenal.length - 1
	};

	player.switchWeapon = function(direction) {
		if (direction === "backwards") {
			if (player.selectedWeaponIndex > weaponArsenalPositions.FIRST_WEAPON) {
				player.selectedWeaponIndex--;
			} else {
				player.selectedWeaponIndex = weaponArsenalPositions.LAST_WEAPON;
			}
		} else if (direction === "forward") {
			if (player.selectedWeaponIndex < weaponArsenalPositions.LAST_WEAPON) {
				player.selectedWeaponIndex++;
			} else {
				player.selectedWeaponIndex = weaponArsenalPositions.FIRST_WEAPON;
			}
		}
		player.selectedWeapon = JSON.parse(JSON.stringify(player.weaponArsenal[player.selectedWeaponIndex]));

		console.log("Switched weapon to: " + player.selectedWeapon.type);
	};

	player.initiateChargeBeam = function() {
		player.isCharging = true;
	};

	player.shootBullet = function() {
		if (player.isCharging) {
			player.isCharging = false;
			player.selectedWeapon.damage = player.selectedWeapon.radius / 2;
		}

		player.selectedWeapon.x = player.cornerPositions.top.x;
		player.selectedWeapon.y = player.cornerPositions.top.y - player.selectedWeapon.radius;
		player.selectedWeapon.color = player.color;

		console.log(player.selectedWeapon.damage);

		bullets.push(player.selectedWeapon);

		player.selectedWeapon = JSON.parse(JSON.stringify(player.weaponArsenal[player.selectedWeaponIndex]));
	};

	player.move = function() {
		if (player.movingDirectionY === directions.up &&
			playerIsBelowCanvasTopBorder(player, canvas) &&
			playerIsBelowMovingRestrictionBarrier(player, movingRestrictionBarrier))  {

			player.cornerPositions.top.y -= player.movingSpeed;
			player.cornerPositions.bottomRight.y -= player.movingSpeed;
			player.cornerPositions.bottomLeft.y -= player.movingSpeed;
		}

		if (player.movingDirectionY === directions.down && playerIsAboveCanvasBottomBorder(player, canvas)) {
			player.cornerPositions.top.y += player.movingSpeed;
			player.cornerPositions.bottomRight.y += player.movingSpeed;
			player.cornerPositions.bottomLeft.y += player.movingSpeed;
		}

		if (player.movingDirectionX === directions.left && playerIsToTheRightOfCanvasLeftBorder(player, canvas)) {
			player.cornerPositions.top.x -= player.movingSpeed;
			player.cornerPositions.bottomRight.x -= player.movingSpeed;
			player.cornerPositions.bottomLeft.x -= player.movingSpeed;
		}

		if (player.movingDirectionX === directions.right && playerIsToTheLeftOfCanvasRightBorder(player, canvas)) {
			player.cornerPositions.top.x += player.movingSpeed;
			player.cornerPositions.bottomRight.x += player.movingSpeed;
			player.cornerPositions.bottomLeft.x += player.movingSpeed;
		}
	};

	var keyCodes = {
		up: 38,
		down: 40,
		left: 37,
		right: 39,
		space: 32,
		q: 81,
		e: 69
	};

	var directions = {
		up: "up",
		down: "down",
		left: "left",
		right: "right"
	};

	function moveBullets() {
		for (var bulletIndex = 0; bulletIndex < bullets.length; bulletIndex++) {

			var collidingEnemyBlocksIds = getCollidingEnemyBlocksIds(bullets[bulletIndex], enemyBlocks);

			if (collidingEnemyBlocksIds.length > 0) {
				updateObjectsInCollision(bulletIndex, collidingEnemyBlocksIds);
			} else if (getBulletIsOutsideOfCanvasBorder(bullets[bulletIndex])) {
				killBullet(bulletIndex);
			} else {
				bullets[bulletIndex].y -= bullets[bulletIndex].movingSpeed;
			}
		}

		function updateObjectsInCollision(bulletIndex, collidingEnemyBlocksIds) {
			var bullet = bullets[bulletIndex],
				accumulatedDamageDoneToBulletInAllBlockCollisions = 0;

			for (var i = 0; i < collidingEnemyBlocksIds.length; i++) {
				reduceEnemyBlockHP(bullet, collidingEnemyBlocksIds[i]);
			}

			bullet.damage -= accumulatedDamageDoneToBulletInAllBlockCollisions;

			if (bullet.damage <= 0) {
				killBullet(bulletIndex);
			}

			function reduceEnemyBlockHP(bullet, enemyBlockId) {
				var enemyBlock = enemyBlocks[enemyBlockId],
					damageDoneToBulletInBlockCollision = enemyBlock.hp;

				enemyBlock.hp -= bullet.damage;

				accumulatedDamageDoneToBulletInAllBlockCollisions += damageDoneToBulletInBlockCollision;

				if (enemyBlock.hp <= 0) {
					delete enemyBlocks[enemyBlockId];
				}
			}
		}

		function killBullet(bulletIndex) {
			bullets.splice(bulletIndex, 1);
		}

		function getBulletIsOutsideOfCanvasBorder(bullet) {
			return bullet.y + bullet.radius < 0;
		}
	}

	function runGameLoop() {
		renderBackground(context, canvas);
		renderPlayerMovingRestrictionBarrier(movingRestrictionBarrier, context, canvas);

		player.move();
		moveBullets();

		if (player.isCharging) {
			player.selectedWeapon.radius += 0.30;
		}

		renderPlayer(player, player.isCharging, context);
		renderBullets(player, bullets, context);
		renderEnemyBlocks(enemyBlocks, context);
	}

	function addEnemyBlock() {
		var lastEnemyBlock = getLastEnemyBlock(),
			enemyHP = Math.ceil(Math.random() * 50) + 20;

		var enemyBlock = {
			id: getNewEnemyId(),
			hp: enemyHP,
			color: getRandomColor(),
			width: enemyHP,
			height: enemyHP,
			x: lastEnemyBlock.x,
			y: lastEnemyBlock.y + lastEnemyBlock.height
		};
		enemyBlocks[enemyBlock.id] = enemyBlock;
	}

	function getLastEnemyBlock() {

		var lastEnemyBlock = {},
			lastEnemyBlockXPosition = 0,
			lastEnemyBlockYPosition = 0;

		for (var enemyBlockId in enemyBlocks) {
			var enemyBlock = enemyBlocks[enemyBlockId];

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

	(function initalizeGame() {
		setUpEnemyBarricade();
		player.selectedWeapon = player.weaponArsenal[weaponArsenalPositions.FIRST_WEAPON];
		addKeyListeners(keyCodes, player, directions);
		setInterval(runGameLoop, 16);
		setInterval(addEnemyBlock, 2000);
	}());
});