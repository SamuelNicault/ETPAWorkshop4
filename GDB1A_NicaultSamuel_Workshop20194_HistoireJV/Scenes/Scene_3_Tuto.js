class Scene3 extends Phaser.Scene {
    constructor() {
        super("Scene_3");
    }

	init(){
		this.platforms;
		this.platforms1;
		this.sol;
    this.sous;
		this.player;
		this.cursors;
    this.tuto;
		this.glands;
    this.pixies;
		this.scoreText;
		this.gameOverText;
		this.score = 0;
		this.vie = 3;
		this.saut = 2;
		this.sauveSaut = 1;
		this.sprite;
		this.groupeBullets;
		this.tir = 2;
		this.aidePopoText;
		this.aideTirText;
		this.aideGlandText;
		this.aideSortieText;
		this.aideSortie1Text;
	}


	preload(){
    this.load.image('background','assets/Morio_/Morio_back.png');
		this.load.image('platform', 'assets/Royman_/Royman_platform.png');
    this.load.image('tuto', 'assets/Royman_/Royman_tuto.png');
		this.load.image('sol', 'assets/Royman_/Royman_sol.png');
    this.load.image('sous', 'assets/Royman_/Royman_terre.png');
    this.load.image('pixie', 'assets/Royman_/Royman_pixie.png');
		this.load.image('glands', 'assets/Royman_/Royman_pixie.png');
		this.load.spritesheet('perso','assets/Royman_/Royman.png', {frameWidth: 21, frameHeight: 32});
		this.load.spritesheet('jump','assets/Royman_/Royman.png', {frameWidth: 21, frameHeight: 32});
		this.load.spritesheet('idle','assets/Royman_/Royman.png', {frameWidth: 21, frameHeight: 32});
		this.load.image('vie_3','assets/vie_3.png');
		this.load.image('vie_2','assets/vie_2.png');
		this.load.image('vie_1','assets/vie_1.png');
		this.load.image('bullet', 'assets/Royman_/Royman_bullet.png');
		this.load.image('door', 'assets/door.png');
		this.load.image('cible', 'assets/Royman_/Royman_cible.png');



	}

	create(){

		//Monde

		this.add.image(500,300,'background');



	//Fonction touché par la bombe


		this.door = this.physics.add.staticGroup();
		this.door.create(900,118, 'door');

		this.platforms = this.physics.add.staticGroup();

    this.platforms.create(300,200, 'platform');
		this.platforms.create(600,400, 'platform');
		this.platforms.create(500,300, 'platform');
		this.platforms.create(50,250, 'platform');
		this.platforms.create(900,150, 'platform');
		this.platforms.create(800,450, 'platform');
		this.platforms.create(220,480, 'platform');
		this.platforms.create(700,200, 'platform');

		this.platforms1 = this.physics.add.staticGroup();

    this.sol = this.physics.add.staticGroup();
		this.sol.create(512,582, 'sol');

		this.sous = this.physics.add.staticGroup();
    this.sous.create(-494,630, 'sous');
		this.sous.create(530,630, 'sous');
    this.sous.create(512,700, 'sous');

		//Vie

		this.vie_1 = this.add.image(70,35,'vie_1');
		this.vie_2 = this.add.image(70,35,'vie_2');
		this.vie_3 = this.add.image(70,35,'vie_3');


		//Player 1

		this.player = this.physics.add.sprite(100,450,'perso');
		this.player.direction = 'right';
		this.player.setBounce(0.02);
		this.player.setCollideWorldBounds(true);
		this.player.body.setGravityY(200);
		this.physics.add.collider(this.player,this.platforms);
		this.physics.add.collider(this.player,this.platforms1);
		this.physics.add.collider(this.player,this.sol);
		this.physics.add.overlap(this.player,this.door, fadeLevel, null, this);

		this.groupeBullets = this.physics.add.group();

	    this.cibles = this.physics.add.group({
	        key: 'cible',
	        repeat: 20,
	        setXY: { x: 20, y: 190, stepX: 60 }
	    });

	    this.cibles.children.iterate(function (cible) {
	        cible.pointsVie=Phaser.Math.Between(1, 10);
	        cible.setBounce(0);
	    });

	    this.physics.add.collider(this.cibles, this.platforms);
      this.physics.add.collider(this.cibles, this.sol);
	    this.physics.add.collider(this.groupeBullets, this.platforms, destroy, null,this);
	    this.physics.add.overlap(this.groupeBullets, this.cibles, hit, null,this);

		//Récupération des curseurs
		this.keys = this.input.keyboard.addKeys('A,S,ENTER,F,R,O,SPACE,G');
		this.cursors = this.input.keyboard.createCursorKeys();
		this.fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);


    this.pixies = this.physics.add.group({
        key: 'pixie',
        repeat: 0,
        setXY: { x: 500, y: 230, stepX: 110 }
    });

    this.pixies.children.iterate(function (pixie) {
        pixie.setGravityY(-300);
        pixie.setBounce(0);
    });
    this.physics.add.overlap(this.pixies, this.player, collectPixie, null, this);

		//Animations Joueur 1

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('perso', {start: 1, end: 2}),
			frameRate: 8,
			repeat: -1
		});

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('perso', {start: 1, end: 2}),
			frameRate: 8,
			repeat: -1
		});

		this.anims.create({
			key: 'jump',
			frames: this.anims.generateFrameNumbers('jump', {start: 0, end: 0}),
			frameRate: 5,
			repeat: -1
		});


		this.anims.create({
			key: 'pause',
			frames: this.anims.generateFrameNumbers('idle', {start: 0, end: 0}),
			frameRate: 8,
			repeat: -1
		});



    //Texte

    this.scoreText = this.add.text(25,100, 'Score: 0', {fontsize: '32px', fill: '#000'});
    this.gameOverText = this.add.text(450, 250, "GAME OVER MAN", {fontsize: '128px', fill: '#000'});
    this.gameOverText.visible = false;



    this.aideTirText = this.add.text(250, 30, "Voici une cible, appuyez sur F !", {'font': '30px', fill: '#000'});

    this.aideDashText = this.add.text(50, 30, "Mince, vous êtes ralentis, restez appuyez sur R pour courrir !", {'font': '30px', fill: '#000'});
    this.aideDashText.visible = false;

    this.aideGlandText = this.add.text(120, 30, "Ouah ! Ce truc doit rapporter des points !", {'font': '30px', fill: '#000'});

    this.aideSortieText = this.add.text(100, 160, "Voilà la sortie ! Mais il va falloir plus de points...", {'font': '14px', fill: '#000'});

    this.aideSortie1Text = this.add.text(100, 160, "Encore un petit effort.", {'font': '14px', fill: '#000'});


    this.tuto = this.physics.add.staticGroup();
    this.tuto.create(512,360, 'tuto');
    this.tuto.setAlpha(1);

		//Fonction touché par la bombe


		function destroy(bullet, platforms){
			bullet.destroy(true);
		}


    function collectPixie(player, pixie){
      pixie.disableBody(true,true);
      this.score += 10;
      this.scoreText.setText('Score: '+ this.score);
  }


		function hit (bullet, cible) {
		  cible.pointsVie--;

		  if (cible.pointsVie==0) {
		    cible.destroy();
        this.pixie = this.pixies.create(this.player.x, this.player.y-40, 'pixie');
        this.pixie.setGravityY(-300);
        this.pixie.setBounce(0);
		  }
		   bullet.destroy();
		}

		function fadeLevel(player, door) {
        if(this.keys.O.isDown){
  			   this.cameras.main.fade(0xff,4000);
  			   this.timedEvent = this.time.delayedCall(500, changeLevel, [], this);
        }
		}

		function changeLevel () {
			console.log('change de level');
			this.scene.start('Scene_4');
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
			this.player.setTint(0xff0000);
			this.player.anims.play('turn');
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
			this.player.direction = 'left';
			this.player.anims.play('right', true);
			this.player.setVelocityX(-150);
			this.player.setFlipX(true);
			if(this.keys.R.isDown){
				this.player.anims.play('right', true);
				this.player.setFlipX(true);
				this.player.setVelocityX(-200);
			}
		}
		else if (this.cursors.right.isDown){
			this.player.direction = 'right';
			this.player.anims.play('left', true);
			this.player.setFlipX(false);
			this.player.setVelocityX(150);
			if(this.keys.R.isDown){
				this.player.anims.play('left', true);
				this.player.setFlipX(false);
				this.player.setVelocityX(200);
			}

		}




		else{
	        this.player.anims.play('pause', true);
			this.player.setVelocityX(0);

		}

    if(this.keys.G.isDown){
      this.tuto.setAlpha(0);
    }

		if ((this.player.body.touching.down) && (this.keys.SPACE.isDown)){
			this.saut = 2;
		}

		if ((this.sauveSaut==1) && (this.saut > 0) && (this.keys.SPACE.isDown)){
			this.saut --;
			this.sauveSaut = 0;
			if (this.saut==1) {
				if(this.score<40){
					this.player.setVelocityY(-350);
				}
				else{
					this.player.setVelocityY(-250);
				}
				if (this.player.body.velocity.y < 0) {
					this.player.anims.play('jump', true);
				}
			}
			if (this.saut==0) {
				if(this.score<40){
					this.player.setVelocityY(-350);
				}
				else{
					this.player.setVelocityY(-250);
				}
				if (this.player.body.velocity.y < 0) {
					this.player.anims.play('jump', true);
				}
			}
		}

		if (this.keys.SPACE.isUp){
			this.sauveSaut = 1;
		}

		if (Phaser.Input.Keyboard.JustDown(this.fire)) {
		        this.coefDir;
			    if (this.player.direction == 'left') { this.coefDir = -1; } else { this.coefDir = 1 }
		        // on crée la balle a coté du joueur
		        this.bullet = this.groupeBullets.create(this.player.x + (25 * this.coefDir), this.player.y - 4, 'bullet');
		        // parametres physiques de la balle.
		        this.bullet.body.allowGravity =false;
		        this.bullet.setVelocity(400 * this.coefDir, 0); // vitesse en x et en y
	    }


		if(this.keys.A.isDown){
			this.scene.start('Scene_4');
		}

		// if(this.score<=0){
		// 	this.platforms1.create(800,100, 'platform').setAlpha(0);
		// 	this.platforms1.create(800,70, 'platform').setAlpha(0);
		// 	this.platforms1.create(800,30, 'platform').setAlpha(0);
		// }



    		if(this.player.x > 0 && this.player.x < 300 && this.player.y >= 500 && this.score<10){
    			this.aideTirText.visible = true;
    		}
    		else{
    			this.aideTirText.visible = false;
    		}

    		if(this.player.x > 300 && this.player.x < 600 && this.player.y <= 300 && this.score<60){
    			this.aideGlandText.visible = true;
    		}
    		else{
    			this.aideGlandText.visible = false;
    		}
	}
}
