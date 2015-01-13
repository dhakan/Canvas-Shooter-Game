game.enemy = (function() {
	var canvas = document.querySelector("#enemyCanvas"),
		context = canvas.getContext("2d");

	return {
		canvas: canvas,
		canvasContext: context,
		createEnemy: function(name, geometryType, x, y, hp, movingSpeed, image, weapon) {
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
				currentImageFrameIndex: 0,
				weapon: weapon
			};
			return that;
		}
	};
}());