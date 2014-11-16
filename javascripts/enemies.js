game.createEnemy = function(name, geometryType, x, y, hp, movingSpeed, image) {
	var that = {
		id: game.getNewEnemyId(),
		name: name,
		geometryType: geometryType,
		position: {
			x: x,
			y: y
		},
		hp: hp,
		movingSpeed: movingSpeed,
		image: image,
		currentImageFrameIndex: 0
	};
	return that;
};