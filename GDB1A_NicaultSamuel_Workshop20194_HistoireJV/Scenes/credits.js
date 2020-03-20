class Scenecredits extends Phaser.Scene {
    constructor() {
        super("Scenecredits");
    }

  init(){
    this.credits;
  }

  preload(){
    this.load.image('credits','assets/credits.png');
  }

  create(){
    this.credits = this.physics.add.sprite(512,1500,'credits');
  	this.credits.body.setGravityY(-300);
  	this.timedEvent = this.time.delayedCall(26000, changeLevel, [], this);
    this.keys = this.input.keyboard.addKeys('A');

  	function changeLevel () {
  		console.log('change de level');
  		this.scene.start('Scene_1');
  	}
  }


  update() {

    if(this.keys.A.isDown){
			this.scene.start('Scene_1');
		}


    if (this.credits.y >= -1800){
        this.tweens.add({
          targets: this.credits,

          y : -6000,
          // alpha: { start: 0, to: 1 },
          // alpha: 1,
          // alpha: '+=1',
          ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
          duration: 100000,
          repeat: 0,            // -1: infinity
          yoyo: false
      });
    }
  }
}
