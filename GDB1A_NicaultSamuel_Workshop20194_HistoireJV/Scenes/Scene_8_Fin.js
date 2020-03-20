class Scene8 extends Phaser.Scene {
    constructor() {
        super("Scene_8");
    }

  init(){
    this.fin;
  }

  preload(){
    this.load.image('fin','assets/fin.png');
  }

  create(){
    this.fin = this.physics.add.sprite(512,1500,'fin');
  	this.fin.body.setGravityY(-300);
  	this.timedEvent = this.time.delayedCall(32000, changeLevel, [], this);
    this.keys = this.input.keyboard.addKeys('A');

  	function changeLevel () {
  		console.log('change de level');
  		this.scene.start('Scenecredits');
  	}
  }


  update() {

    if(this.keys.A.isDown){
			this.scene.start('Scenecredits');
		}


    if (this.fin.y >= -1800){
        this.tweens.add({
          targets: this.fin,

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
