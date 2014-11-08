function renderBackground(context, canvas) {
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function renderPlayerMovingRestrictionBarrier(movingRestrictionBarrier, context, canvas) {
	context.fillStyle = "gray";
	context.fillRect(movingRestrictionBarrier.x, movingRestrictionBarrier.y,
		movingRestrictionBarrier.width, movingRestrictionBarrier.height);
}

function renderPlayer(player, isCharging, context) {
	if (isCharging) {
		animateCharge();
	} else {
		player.color = "white";
	}

	context.fillStyle = player.color;

	context.beginPath();
	context.moveTo(player.cornerPositions.top.x, player.cornerPositions.top.y);
	context.lineTo(player.cornerPositions.bottomRight.x, player.cornerPositions.bottomRight.y);
	context.lineTo(player.cornerPositions.bottomLeft.x, player.cornerPositions.bottomLeft.y);
	context.fill();

	function animateCharge() {
		if (player.selectedWeapon.radius >= 10 && player.selectedWeapon.radius < 20) {
			player.color = "yellow";
		} else if (player.selectedWeapon.radius >= 20 && player.selectedWeapon.radius < 30) {
			player.color = "orange";
		} else if (player.selectedWeapon.radius >= 30) {
			player.color = "red";
		}
	}
}

function renderBullets(player, bullets, context) {
	for (var i = 0; i < bullets.length; i++) {
		context.beginPath();
		context.fillStyle = bullets[i].color;
		context.arc(bullets[i].x, bullets[i].y, bullets[i].radius, 0, Math.PI * 2, false);
		context.fill();
	}
}

function renderEnemyBlocks(enemyBlocks, context) {
	for (var enemyBlockId in enemyBlocks) {

		var enemyBlock = enemyBlocks[enemyBlockId];

		context.beginPath();
		context.fillStyle = enemyBlock.color;
		context.lineWidth = 2;
		context.strokeStyle = "white";
		context.fillRect(enemyBlock.x, enemyBlock.y, enemyBlock.width, enemyBlock.height);
		context.strokeRect(enemyBlock.x, enemyBlock.y, enemyBlock.width, enemyBlock.height);

		context.fillStyle = "black";
		var fontSize = 10;
		context.font = fontSize + "px Helvetica";
		var HPText = Math.ceil(enemyBlock.hp);
		var HPTextWidth = context.measureText(HPText).width;
		context.fillText(HPText, enemyBlock.x + (enemyBlock.width / 2) - (HPTextWidth / 2), enemyBlock.y + (enemyBlock.height / 2) + (fontSize / 2));
	}
}