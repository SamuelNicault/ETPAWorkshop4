class Scene5 extends Phaser.Scene {
    constructor() {
        super("Scene_5");
    }

	init(){
  	this.plateforms;
  	this.plateforms1;
  	this.solM;
  	this.Morio;
  	this.cursors;
  	this.coins;
    this.pixiesM;
  	this.scoreText;
  	this.gameOverText;
  	this.score = 0;
  	this.vie = 3;
  	this.saut = 2;
  	this.sauveSaut = 1;
  	this.sprite;
  	this.groupeBullets;
  	this.tir = 2;
  }


  preload(){
  	this.load.image('backgroundM','assets/Morio_/Morio_back.png');
  	this.load.image('plateform', 'assets/Morio_/Morio_platform.png');
  	this.load.image('solM', 'assets/Morio_/Morio_sol.png');
    this.load.image('pixieM', 'assets/Morio_/Morio_gold.png');
  	this.load.image('coins', 'assets/Morio_/Morio_gold.png');
  	this.load.spritesheet('persoM','assets/Morio_/Morio.png', {frameWidth: 16, frameHeight: 32});
  	this.load.spritesheet('jumpM','assets/Morio_/Morio.png', {frameWidth: 16, frameHeight: 32});
  	this.load.spritesheet('idleM','assets/Morio_/Morio.png', {frameWidth: 16, frameHeight: 32});
  	this.load.image('vie_3','assets/vie_3.png');
  	this.load.image('vie_2','assets/vie_2.png');
  	this.load.image('vie_1','assets/vie_1.png');
  	this.load.image('bullet', 'assets/bullet.png');
  	this.load.image('door', 'assets/door.png');
  	this.load.image('brique', 'assets/Morio_/Morio_cible.png');
	}

	create(){

		//Monde

		this.add.image(512,360,'backgroundM');



	//Fonction touché par la bombe


		this.door = this.physics.add.staticGroup();
		this.door.create(900,118, 'door');

		this.plateforms = this.physics.add.staticGroup();

    this.plateforms.create(300,200, 'plateform');
		this.plateforms.create(600,400, 'plateform');
		this.plateforms.create(500,300, 'plateform');
		this.plateforms.create(50,250, 'plateform');
		this.plateforms.create(900,150, 'plateform');
		this.plateforms.create(220,480, 'plateform');
		this.plateforms.create(700,200, 'plateform');
    this.plateforms.create(100,550, 'plateform');
    this.plateforms.create(500,500, 'plateform');
    this.plateforms.create(800,500, 'plateform');
    this.plateforms.create(300,610, 'plateform');
    this.plateforms.create(700,610, 'plateform');
    this.plateforms.create(900,610, 'plateform');

		this.plateforms1 = this.physics.add.staticGroup();


		this.solM = this.physics.add.staticGroup();
		this.solM.create(512,704, 'solM');


		//Vie

		this.vie_1 = this.add.image(70,35,'vie_1');
		this.vie_2 = this.add.image(70,35,'vie_2');
		this.vie_3 = this.add.image(70,35,'vie_3');


		//Player 1

		this.Morio = this.physics.add.sprite(100,450,'persoM');
		this.Morio.direction = 'rightM';
		this.Morio.setBounce(0.02);
		this.Morio.setCollideWorldBounds(true);
		this.Morio.body.setGravityY(200);
		this.physics.add.collider(this.Morio,this.plateforms);
		this.physics.add.collider(this.Morio,this.plateforms1);
		this.physics.add.collider(this.Morio,this.solM);
		this.physics.add.overlap(this.Morio,this.door, fadeLevel, null, this);


		this.groupeBullets = this.physics.add.group();

	    this.briques = this.physics.add.group({
	        key: 'brique',
	        repeat: 5,
	        setXY: { x: 40, y: 180, stepX: 130 }
	    });

	    this.briques.children.iterate(function (brique) {
	        brique.pointsVie=Phaser.Math.Between(1, 1);
          brique.setGravityY(-300);
	        brique.setBounce(0);
	    });

	    this.physics.add.collider(this.briques, this.plateforms);
	    this.physics.add.collider(this.groupeBullets, this.plateforms, destroy, null,this);

		//Récupération des curseurs
		this.keys = this.input.keyboard.addKeys('A,S,ENTER,F,R,O,SPACE');
		this.cursors = this.input.keyboard.createCursorKeys();
		this.fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

		//Animations Joueur 1

		this.anims.create({
			key: 'leftM',
			frames: this.anims.generateFrameNumbers('persoM', {start: 1, end: 2}),
			frameRate: 15,
			repeat: -1
		});

		this.anims.create({
			key: 'rightM',
			frames: this.anims.generateFrameNumbers('persoM', {start: 1, end: 2}),
			frameRate: 15,
			repeat: -1
		});

		this.anims.create({
			key: 'jumpM',
			frames: this.anims.generateFrameNumbers('jumpM', {start: 3, end: 3}),
			frameRate: 8,
			repeat: -1
		});


		this.anims.create({
			key: 'pauseM',
			frames: this.anims.generateFrameNumbers('idleM', {start: 0, end: 0}),
			frameRate: 8,
			repeat: -1
		});

    this.pixiesM = this.physics.add.group({
        key: 'pixieM',
        repeat: 0,
        setXY: { x: 500, y: 230, stepX: 110 }
    });

    this.pixiesM.children.iterate(function (pixieM) {
        pixieM.setGravityY(-300);
        pixieM.setBounce(0);
    });
    this.physics.add.overlap(this.pixiesM, this.Morio, collectPixie, null, this);
    this.physics.add.collider(this.Morio, this.briques, cassebrique, null, this);

		//coins

		this.coins = this.physics.add.group({
			key: 'coins',
			repeat: 0,
			setXY: {x: 12, y: 1, stepX: 70}
		});

		this.physics.add.collider(this.coins, this.plateforms);
		this.physics.add.collider(this.coins, this.solM);
		this.physics.add.overlap(this.coins, this.Morio, collectcoin, null, this);

		//Texte

		this.scoreText = this.add.text(25,100, 'Score: 0', {fontsize: '32px', fill: '#000'});
		this.gameOverText = this.add.text(450, 250, "GAME OVER MAN", {fontsize: '128px', fill: '#000'});
		this.gameOverText.visible = false;



		//Bombes

		this.bombs = this.physics.add.group();
		this.physics.add.collider(this.bombs, this.plateforms);
		this.physics.add.collider(this.Morio, this.bombs, hitBomb, null, this);
		this.physics.add.collider(this.bombs, this.solM);

		//Fonction touché par la bombe

		function hitBomb(Morio, bomb){
			this.vie --;
			bomb.destroy(true);
		}

		function destroy(bullet, plateforms){
			bullet.destroy(true);
		}



		//Fonction récupération coins

    function collectcoin(Morio, coin){
			coin.disableBody(true,true);
			this.score += 10;
			this.scoreText.setText('Score: '+ this.score);
			if (this.coins.countActive(true) === 0 && this.score<200){
				this.coins.children.iterate(function(child){
          coin.setGravityY(-300);
          var x =	Phaser.Math.Between(30,994);
          var y =	Phaser.Math.Between(120,690);

          child.enableBody(true,x,y, true, true);
				});
			};
		}

    function collectPixie(Morio, pixieM){
      pixieM.disableBody(true,true);
      this.score += 10;
      this.scoreText.setText('Score: '+ this.score);
  }




    function cassebrique (Morio, brique) {
		  brique.pointsVie--;

		  if (brique.pointsVie==0) {
		    brique.destroy();
        this.pixieM = this.pixiesM.create(this.Morio.x, this.Morio.y-40, 'pixieM');
        this.pixieM.setGravityY(-300);
        this.pixieM.setBounce(0);
		  }
		}

		function fadeLevel(Morio, door) {
      if(this.score>=200){
        if(this.keys.O.isDown){
  			   this.cameras.main.fade(0xff,4000);
  			   this.timedEvent = this.time.delayedCall(500, changeLevel, [], this);
        }
      }
		}

		function changeLevel () {
			console.log('change de level');
			this.scene.start('Scene_6');
		}

	}

	update() {
		//Perte de vie

		if (this.vie == 2){
			this.vie_2 = this.add.image(70,35,'vie_2');
			this.vie_3.destroy(true);
		}
		else if (this.vie == 1){
			this.vie_1 = this.add.image(70,35,'vie_1');
			this.vie_2.destroy(true);
		}
		else if (this.vie == 0){
			this.vie_1.destroy(true);
			this.physics.pause();
			this.Morio.setTint(0xff0000);
			this.Morio.anims.play('turn');
			this.gameOverText.visible = true;
			this.gameOver = true;
			this.score = 0;
			this.vie = 3;
		}
		if(this.vie == 3){
			this.vie_3 = this.add.image(70,35,'vie_3');
		}

		//Déplacement du Joueur 1


		if (this.keys.ENTER.isDown){
			this.registry.destroy(); // destroy registry
			this.events.off(); // disable all active events
			this.scene.restart(); // restart current scene
		}

		if (this.cursors.left.isDown){
			this.Morio.direction = 'leftM';
			this.Morio.anims.play('rightM', true);
			this.Morio.setVelocityX(-150);
			this.Morio.setFlipX(true);
			if(this.keys.R.isDown){
				this.Morio.anims.play('rightM', true);
				this.Morio.setFlipX(true);
				this.Morio.setVelocityX(-200);
			}
		}
		else if (this.cursors.right.isDown){
			this.Morio.direction = 'rightM';
			this.Morio.anims.play('leftM', true);
			this.Morio.setFlipX(false);
			this.Morio.setVelocityX(150);
			if(this.keys.R.isDown){
				this.Morio.anims.play('leftM', true);
				this.Morio.setFlipX(false);
				this.Morio.setVelocityX(200);
			}

		}

    else{
	    this.Morio.anims.play('pauseM', true);
			this.Morio.setVelocityX(0);

		}



		if ((this.Morio.body.touching.down) && (this.keys.SPACE.isDown)){
			this.saut = 2;
		}

		if ((this.sauveSaut==1) && (this.saut > 0) && (this.keys.SPACE.isDown)){
			this.saut --;
			this.sauveSaut = 0;
			if (this.saut==1) {
				if(this.score<40){
          this.Morio.anims.play('jumpM', true);
					this.Morio.setVelocityY(-350);
				}
				else{
          this.Morio.anims.play('jumpM', true);
					this.Morio.setVelocityY(-250);
				}
				if (this.Morio.body.velocity.y < 0) {
					this.Morio.anims.play('jumpM', true);
				}
			}
			if (this.saut==0) {
				if(this.score<40){
          this.Morio.anims.play('jumpM', true);
					this.Morio.setVelocityY(-350);
				}
				else{
          this.Morio.anims.play('jumpM', true);
					this.Morio.setVelocityY(-250);
				}
				if (this.Morio.body.velocity.y < 0) {
					this.Morio.anims.play('jumpM', true);
				}
			}
		}

		if (this.keys.SPACE.isUp){
			this.sauveSaut = 1;
		}

		if (Phaser.Input.Keyboard.JustDown(this.fire)) {
		        this.coefDir;
			    if (this.Morio.direction == 'leftM') { this.coefDir = -1; } else { this.coefDir = 1 }
		        // on crée la balle a coté du joueur
		        this.bullet = this.groupeBullets.create(this.Morio.x + (25 * this.coefDir), this.Morio.y - 4, 'bullet');
		        // parametres physiques de la balle.
		        this.bullet.body.allowGravity =false;
		        this.bullet.setVelocity(1000 * this.coefDir, 0); // vitesse en x et en y
	    }


		if(this.keys.A.isDown){
			this.scene.start('Scene_6');
		}

	}
}
