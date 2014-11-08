// 	var directions = {
// 			up: "up",
// 			down: "down",
// 			left: "left",
// 			right: "right"
// 		}, 
// 		enemyBlocks = [{
// 			hp: 10,
// 			color: "red",
// 			width: 100,
// 			height: 100,
// 			x: 50,
// 			y: 50
// 		}],
// 		bullets = [],
// 		player = {
// 			color: "white",
// 			cornerPositions: {
// 				top: {
// 					x: canvas.width / 2,
// 					y: canvas.height - 50
// 				},
// 				bottomRight: {
// 					x: canvas.width / 2 + 15,
// 					y: canvas.height - 25
// 				},
// 				bottomLeft: {
// 					x: canvas.width / 2 - 15,
// 					y: canvas.height - 25
// 				}
// 			},
// 			positionX: 0,
// 			positionY: 0,
// 			movingDirectionX: undefined,
// 			movingDirectionY: undefined,
// 			movingSpeed: 5,
// 			bulletToBeFired: {
// 				radius: 3
// 			},
// 			isCharging: false,
// 			initiateChargeBeam: function() {
// 				player.isCharging = true;
// 			},
// 			releaseBullet: function() {
// 				player.isCharging = false;

// 				player.bulletToBeFired.x = player.cornerPositions.top.x;
// 				player.bulletToBeFired.y = player.cornerPositions.top.y - player.bulletToBeFired.radius;
// 				player.bulletToBeFired.movingSpeed = 12;
// 				player.bulletToBeFired.color = player.color;

// 				player.bulletToBeFired.damage = player.bulletToBeFired.radius / 2;

// 				console.log(player.bulletToBeFired.damage);

// 				bullets.push(player.bulletToBeFired);

// 				player.bulletToBeFired = {
// 					radius: 3
// 				};
// 			}
// 		}, keyCodes = {
// 			up: 38,
// 			down: 40,
// 			left: 37,
// 			right: 39,
// 			space: 32
// 		};	

// //var canvas = document.querySelector("canvas"),
// //		context = canvas.getContext("2d");


// var gameObject = (function()  {

// 	return {
// 		lol: function() {
// 			console.log("says lol");
// 		},
// 		canvas: document.querySelector("canvas"),
// 		context: anvas.getContext("2d")
// 	};
// })();




