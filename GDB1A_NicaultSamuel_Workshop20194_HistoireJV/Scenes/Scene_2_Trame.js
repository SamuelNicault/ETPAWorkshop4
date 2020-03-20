class Scene2 extends Phaser.Scene {
    constructor() {
        super("Scene_2");
    }

  init(){
    this.resume;
  }

  preload(){
    this.load.image('resume','assets/resume.png');
  }

  create(){
    this.resume = this.physics.add.sprite(512,1500,'resume');
  	this.resume.body.setGravityY(-300);
  	this.timedEvent = this.time.delayedCall(42000, changeLevel, [], this);
    this.keys = this.input.keyboard.addKeys('A');

  	function changeLevel () {
  		console.log('change de level');
  		this.scene.start('Scene_3');
  	}
  }


  update() {

    if(this.keys.A.isDown){
			this.scene.start('Scene_3');
		}


    if (this.resume.y >= -1800){
        this.tweens.add({
          targets: this.resume,

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
