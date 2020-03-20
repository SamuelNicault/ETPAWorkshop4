var config = {
	type: Phaser.AUTO,
	width: 1024,
	height: 720,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 300},
			debug: false

		}
	},

	scene: [ Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8, Scenecredits]

};

var game = new Phaser.Game(config);
