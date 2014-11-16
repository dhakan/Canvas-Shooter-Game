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
	shipImage.src = "sprites/ship_frames.png";
	var ship = {
		image: shipImage,
		frameWidth: 92,
		frameHeight: 108,
		numberOfFrames: 3
	};

	var normalBulletImage = new Image();
	normalBulletImage.src = "sprites/bullet_normal_frames.gif";
	var normalBullet = {
		image: normalBulletImage,
		frameWidth: 45 / 3,
		frameHeight: 27,
		numberOfFrames: 3
	};

	var bombBulletImage = new Image();
	bombBulletImage.src = "sprites/bullet_bomb.gif";
	var bombBullet = {
		image: bombBulletImage,
		frameWidth: 190 / 7,
		frameHeight: 63,
		numberOfFrames: 1
	};

	var otherBulletImage = new Image();
	otherBulletImage.src = "sprites/bullet_other.gif";
	var otherBullet = {
		image: otherBulletImage
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
		otherBullet: otherBullet,
		normalEnemy: normalEnemy
	};
}());