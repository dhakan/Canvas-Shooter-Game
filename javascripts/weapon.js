game.weapon = (function() {
	var canvas = document.querySelector("#bulletCanvas"),
		context = canvas.getContext("2d");

	return {
		canvas: canvas,
		canvasContext: context,
		createWeapon: function(name, geometryType, damage, movingSpeed, isChargable, image) {
			var that = {
				name: name,
				geometryType: geometryType,
				position: {
					x: 0,
					y: 0
				},
				damage: damage,
				movingSpeed: movingSpeed,
				isChargable: isChargable,
				image: image,
				currentImageFrameIndex: 0
			};
			return that;
		}
	};
}());