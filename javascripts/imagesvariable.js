game.images = (function() {
	var backgroundImage = new Image();
	backgroundImage.src = "sprites/background.jpg";
	var background = {
		image: backgroundImage,
		x: 0,
		y: 0,
		movingSpeed: 2
	};

	var shipImage = new Image();
	shipImage.src = "sprites/ship.png";
	var ship = {
		image: shipImage
	};

	var normalBulletImage = new Image();
	normalBulletImage.src = "sprites/bullet_normal.gif";
	var normalBullet = {
		image: normalBulletImage
	};

	var bombBulletImage = new Image();
	bombBulletImage.src = "sprites/bullet_bomb.gif";
	var bombBullet = {
		image: bombBulletImage
	};

	var normalEnemyImage = new Image();
	normalEnemyImage.src = "sprites/enemy1.png";
	var normalEnemy = {
		image: normalEnemyImage
	};

	return {
		background: background,
		ship: ship,
		normalBullet: normalBullet,
		bombBullet: bombBullet,
		normalEnemy: normalEnemy
	};
}());