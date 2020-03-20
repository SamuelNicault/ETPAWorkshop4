class Scene7 extends Phaser.Scene {
    constructor() {
        super("Scene_7");
    }

	init(){
    this.cursor;
    this.Joueur;
    this.IA;
    this.ball;
    this.scoreJoueur = 0;
    this.scoreIA = 0;
    this.scoreTextJoueur;
    this.scoreTextIA;
    this.velocityX=Phaser.Math.Between(-400, 400);
    this.velocityY=300;
	}


	preload(){
    this.load.image('fond','assets/Pong_/Pong_fond.png');
    this.load.image('Joueur','assets/Pong_/Pong_Joueur.png');
    this.load.image('IA','assets/Pong_/Pong_IA.png');
    this.load.image('ball','assets/Pong_/Pong_ball.png');
	}

	create(){
    this.add.image(512, 360, 'fond');


      this.cursors = this.input.keyboard.createCursorKeys();
      this.keys = this.input.keyboard.addKeys('S,W,A');


      this.Joueur = this.physics.add.sprite(984, 360, 'Joueur');
      this.Joueur.setCollideWorldBounds(true);
      this.Joueur.body.setGravityY(-300);

      this.IA = this.physics.add.sprite(40, 360, 'IA');
      this.IA.setCollideWorldBounds(true);
      this.IA.body.setGravityY(-300);



      this.ball = this.physics.add.sprite(512, 360, 'ball');
      this.ball.body.setGravityY(-300);


      this.ball.setCollideWorldBounds(true);
      this.ball.setBounce(1);

      //it do horizontal and vertical movement.
      this.ball.setVelocityY(this.velocityY);
      this.ball.setVelocityX(this.velocityX);

      //in createGame()
      this.physics.add.collider(this.ball, this.Joueur, hitJoueur, null, this);
      this.physics.add.collider(this.ball, this.IA, hitIA, null, this);

      this.scoreTextIA = this.add.text(16, 16, 'score: 0', { fontSize: '16px', fill: '#F00' });
      this.scoreTextJoueur = this.add.text(700, 16, 'score: 0', { fontSize: '16px', fill: '#00F' });


      function hitJoueur(ball,Joueur)
      {
        this.velocityX=this.velocityX+20;
        this.velocityX=this.velocityX*-1;
        console.log(this.velocityX);

        this.ball.setVelocityX(this.velocityX);

        if(this.velocityY<0)
        {
          this.velocityY=this.velocityY*-1
          this.ball.setVelocityY(this.velocityY);
        }
        this.Joueur.setVelocityX(-1);
      }

      function hitIA(ball,IA)
      {
        this.velocityX=this.velocityX-20;
        this.velocityX=this.velocityX*-1;
        console.log(this.velocityX);
        this.ball.setVelocityX(this.velocityX);

        if(this.velocityY<0)
        {
          this.velocityY=this.velocityY*-1
          this.ball.setVelocityY(this.velocityY);
        }
        this.IA.setVelocityX(1);
      }

      function changeLevel () {
  			console.log('change de level');
  			this.scene.start('Scene_8');
  		}
      function restart () {
  			this.scene.start('Scene_7');
  		}
	}

	update() {

    if(this.keys.A.isDown){
			this.scene.start('Scene_8');
		}
    if(this.cursors.up.isDown)
    {
      this.Joueur.setVelocityY(-300);
    }
    else if(this.cursors.down.isDown)
    {
      this.Joueur.setVelocityY(300);
    }
    else
    {
      this.Joueur.setVelocityY(0);
    }

    if(this.ball.y<this.IA.y)
    {
      this.IA.setVelocityY(-240);
    }
    else if(this.ball.y>this.IA.y)
    {
      this.IA.setVelocityY(240);
    }
    else
    {
      this.IA.setVelocityY(0);
    }

    if(this.ball.x>1004)
    {
      this.scoreIA += 1;
      this.scoreTextIA.setText('Score: ' + this.scoreIA);
      this.ball.disableBody(true);
      this.ball.enableBody(true);
      this.ball.velocityX=Phaser.Math.Between(-100, 100);
      this.ball.velocityY=200;
      this.ball.x=400;
      this.ball.y=200;
      this.Joueur.x=984;
      this.Joueur.y=360;
      this.IA.x=40;
      this.IA.y=360;
      this.Joueur.setScale(2,3);
      this.ball.setVelocityY(this.velocityY);
      this.ball.setVelocityX(this.velocityX);


    }

    if(this.ball.x<20)
    {
      this.scoreJoueur += 1;
      this.scoreTextJoueur.setText('Score: ' + this.scoreJoueur);
      this.ball.disableBody(true);
      this.ball.enableBody(true);
      this.ball.velocityX=Phaser.Math.Between(-100, 100);
      this.ball.velocityY=200;
      this.ball.x=400;
      this.ball.y=200;
      this.Joueur.x=984;
      this.Joueur.y=360;
      this.IA.x=40;
      this.IA.y=360;
      this.IA.setScale(2,3);
      this.ball.setVelocityY(this.velocityY);
      this.ball.setVelocityX(this.velocityX);



    }

    if(this.scoreJoueur==5){
      this.cameras.main.fade(0xff,4000);
      this.scene.start('Scene_8');
    }
    if(this.scoreIA==5){
      this.gameOverText = this.add.text(450, 250, "GAME OVER MAN", {fontsize: '128px', fill: '#000'});
  		this.gameOverText.visible = false;
      this.cameras.main.fade(0xff,4000);
      this.scene.start('Scene_7');

    }
  }
}
