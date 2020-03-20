class Scene6 extends Phaser.Scene {
    constructor() {
        super("Scene_6");
    }

	init(){
		this.platforms;
		this.sol;
		this.playerS;
		this.cursors;
		this.apples;
		this.scoreText;
		this.gameOverText;
		this.score = 0;
		this.vie = 1;
		this.sprite;
	}


	preload(){
		this.load.image('Snake_background','assets/Snoke_/Snoke_back.png');
		this.load.image('sol', 'assets/Snoke_/Snoke_sol.png');
    this.load.image('platform1', 'assets/Snoke_/Snoke_cote.png');
		this.load.image('sol', 'assets/Snoke_/Snoke_sol.png');
		this.load.image('apples', 'assets/Snoke_/Snoke_apple.png');
		this.load.spritesheet('persoS','assets/Snoke_/Snoke.png', {frameWidth: 16, frameHeight: 16});
		this.load.image('vie_1','assets/vie_1.png');
		this.load.image('door', 'assets/door.png');



	}

	create(){

		//Monde

		this.add.image(512,360,'Snake_background');

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(512,-13, 'sol').setAlpha(0);
    this.platforms.create(512,733, 'sol').setAlpha(0);

    this.platforms1 = this.physics.add.staticGroup();
    this.platforms1.create(-12,360, 'platform1').setAlpha(0);
    this.platforms1.create(1036,360, 'platform1').setAlpha(0);

	//Fonction touché par la bombe


		this.door = this.physics.add.staticGroup();
		this.door.create(900,118, 'door').setAlpha(0);




		//Vie

		this.vie_1 = this.add.image(70,35,'vie_1');



		//Player 1

		this.playerS = this.physics.add.sprite(512,360,'persoS');
		this.playerS.setBounce(0.02).setCollideWorldBounds(true).setGravityY(-300).setScale(4);
		this.physics.add.overlap(this.playerS,this.door, fadeLevel, null, this);
    this.physics.add.collider(this.playerS,this.platforms,  touche, null, this);
		this.physics.add.collider(this.playerS,this.platforms1, touche1, null, this);


		//Récupération des curseurs
		this.keys = this.input.keyboard.addKeys('A,S,ENTER,F,R,O');
		this.cursors = this.input.keyboard.createCursorKeys();

		//Animations Joueur 1




		//apples

		this.apples = this.physics.add.group({
			key: 'apples',
			repeat: 0,
			setXY: {x: 100, y: 100, stepX: 70}
		});

		this.physics.add.overlap(this.apples, this.playerS, collectapple, null, this);
    this.apples.children.iterate(function (apple) {
        apple.setGravityY(-300).setScale(2).setCollideWorldBounds(true);
    });
		//Texte

		this.scoreText = this.add.text(25,100, 'Score: 0', {fontsize: '32px', fill: '#000'});
		this.gameOverText = this.add.text(450, 250, "GAME OVER MAN", {fontsize: '128px', fill: '#000'});
		this.gameOverText.visible = false;

    this.anims.create({
      key: 'leftS',
      frames: this.anims.generateFrameNumbers('persoS', {start: 2, end: 3}),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: 'downS',
      frames: this.anims.generateFrameNumbers('persoS', {start: 0, end: 1}),
      frameRate: 3,
      repeat: -1
    });

		//Fonction récupération apples

		function collectapple(playerS, apple){
			apple.disableBody(true,true);
			this.score += 10;
			this.scoreText.setText('Score: '+ this.score);
			if (this.apples.countActive(true) === 0 && this.score<200){
				this.apples.children.iterate(function(child){
          var x = (playerS.x < 512) ?
          Phaser.Math.Between(30,994):
  				Phaser.Math.Between(30,994);
          var y = (playerS.y < 360) ?
          Phaser.Math.Between(30,690):
  				Phaser.Math.Between(30,690);

          child.enableBody(true,x,y, true, true);
				});
			};
		}


		function fadeLevel(playerS, door) {
      if(this.keys.O.isDown){
			   this.cameras.main.fade(0xff,4000);
			   this.timedEvent = this.time.delayedCall(500, changeLevel, [], this);
      }
		}

		function changeLevel () {
			console.log('change de level');
			this.scene.start('Scene_7');
		}

    function touche(playerS, plateforms){
			this.scene.start('Scene_6');
		}
    function touche1(playerS, plateforms1){
			this.scene.start('Scene_6');
		}
	}

	update() {

  if (this.score == 200){
        this.door.setAlpha(1);
  }

	if (this.vie == 0){
			this.vie_1.destroy(true);
			this.physics.pause();
			this.playerS.setTint(0xff0000);
			this.playerS.anims.play('turn');
			this.gameOverText.visible = true;
			this.gameOver = true;
			this.score = 0;
			this.vie = 3;
		}





		//Déplacement du Joueur 1


		if (this.keys.ENTER.isDown){
			this.registry.destroy(); // destroy registry
			this.events.off(); // disable all active events
			this.scene.restart(); // restart current scene
		}

		if (this.cursors.left.isDown){
      this.playerS.anims.play('leftS', true);
      this.playerS.setVelocityY(0);
			this.playerS.setVelocityX(-150);
			this.playerS.setFlipX(true);
			if(this.keys.R.isDown){
				this.playerS.setFlipX(true);
				this.playerS.setVelocityX(-200);
			}
		}
		else if (this.cursors.right.isDown){
      this.playerS.anims.play('leftS', true);
			this.playerS.setFlipX(false);
			this.playerS.setVelocityX(150);
      this.playerS.setVelocityY(0);
			if(this.keys.R.isDown){
				this.playerS.setFlipX(false);
				this.playerS.setVelocityX(200);
			}
		}

    else if (this.cursors.up.isDown){
      this.playerS.anims.play('downS', true);
			this.playerS.setFlipY(true);
			this.playerS.setVelocityY(-150);
      this.playerS.setVelocityX(0);
			if(this.keys.R.isDown){
				this.playerS.setFlipY(true);
				this.playerS.setVelocityY(-200);
			}
		}

    else if (this.cursors.down.isDown){
      this.playerS.anims.play('downS', true);
      this.playerS.setVelocityX(0);
  		 this.playerS.setVelocityY(150);
  		 this.playerS.setFlipY(false);
  		 if(this.keys.R.isDown){
  				 this.playerS.setFlipY(false);
  				 this.playerS.setVelocityY(200);
  			}

		}


		if(this.keys.A.isDown){
			this.scene.start('Scene_7');
		}

	}
}
