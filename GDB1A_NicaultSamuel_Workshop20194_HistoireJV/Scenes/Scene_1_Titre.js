class Scene1 extends Phaser.Scene {
    constructor() {
        super("Scene_1");
    }


  init(){
    this.odyssey;
    this.press;
  }

  preload(){
    this.load.image('odyssey','assets/odyssey.png');
    this.load.image('odyssey_nul','assets/odyssey_nul.png');
    this.load.spritesheet('press','assets/press.png', {frameWidth: 70, frameHeight: 30});
  }

  create(){
    this.add.image(512,360,'odyssey_nul');

    this.odyssey = this.physics.add.sprite(512,360,'odyssey');
    this.keys = this.input.keyboard.addKeys('A');
    this.timedEvent = this.time.delayedCall(3000, changeLevel, [], this);

    this.press = this.physics.add.sprite(512,600,'press');
    this.press.setGravityY(-300).setScale(3).setAlpha(0);

    this.anims.create({
			key: 'pressing',
			frames: this.anims.generateFrameNumbers('press', {start: 0, end: 1}),
			frameRate: 1,
			repeat: -1
		});

  	function changeLevel () {
      this.press.setAlpha(1);
      this.press.anims.play('pressing', true);
  	}
  }

  update() {

    if(this.keys.A.isDown){
      this.scene.start('Scene_2');
    }

  }

}
