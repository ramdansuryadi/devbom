var Bomb = require("./bomb");
var TextureUtil = require("../util/texture_util");

var DEFAULT_PLAYER_SPEED = 180;
var PLAYER_SPEED_POWERUP_INCREMENT = 60;
// var DEFAULT_PLAYER_SPEED = Math.floor((Math.random() * 1500) + 10);
// var PLAYER_SPEED_POWERUP_INCREMENT = Math.floor((Math.random() * 1500) + 10);

var Player = function(x, y, id, color) {
  this.firstFrame = this.getFrame(color, "01");
  Phaser.Sprite.call(this, game, x, y, TEXTURES, this.firstFrame);

  this.spawnPoint = {x: x, y: y};
  this.id = id;
  this.facing = "down";
  this.anchor.setTo(.5, .5);
  this.bombButtonJustPressed = false;
  this.speed = DEFAULT_PLAYER_SPEED;
  this.firstFrame = this.getFrame(color, "01");

  game.physics.enable(this, Phaser.Physics.ARCADE);

  this.body.setSize(15, 16, 1, 15);

  this.animations.add("down", TextureUtil.getFrames(this.getFrame, color, ["01", "02", "03", "04", "05"]), 10, true);
  this.animations.add("up", TextureUtil.getFrames(this.getFrame, color, ["06", "07", "08", "09", "10"]), 10, true);
  this.animations.add("right", TextureUtil.getFrames(this.getFrame, color, ["11", "12", "13"]), 10, true);
  this.animations.add("left", TextureUtil.getFrames(this.getFrame, color, ["14", "15", "16"]), 10, true);

  game.add.existing(this);
  this.createButtonAmigo();


};

Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.handleInput = function() {
  if (!buttonUp.input.pointerDown()&& !buttonDown.input.pointerDown()&& !buttonLeft.input.pointerDown()&& !buttonRight.input.pointerDown()&& !buttonBomb.input.pointerDown()) {
    this.handleMotionInput();
    this.handleBombInput(); 
  }
  if (buttonBomb.input.pointerDown()) {
    this.actionOnClickBombX();
  } 
  if (buttonUp.input.pointerDown()|| buttonDown.input.pointerDown()||buttonLeft.input.pointerDown()||buttonRight.input.pointerDown()) {
    this.acionMoveX();
  }
  
};


Player.prototype.handleMotionInput = function() {
    var moving = true;
    var speedTouch = touchControl.speed;

    game.physics.arcade.collide(this, level.blockLayer);
    game.physics.arcade.collide(this, level.bombs);

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.body.velocity.y = 0;
      this.body.velocity.x = -this.speed;
      this.facing = "left";
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.body.velocity.y = 0;
      this.body.velocity.x = this.speed;
      this.facing = "right";
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.body.velocity.x = 0;
      this.body.velocity.y = -this.speed;
      this.facing = "up";
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.body.velocity.x = 0;
      this.body.velocity.y = this.speed;
      this.facing = "down";
    } else if (Math.abs(speedTouch.y) < Math.abs(speedTouch.x)){
        // moving mainly right or left
        if (touchControl.cursors.left) {
            this.body.velocity.y = 0;
            this.body.velocity.x = -this.speed;
            this.facing = "left";
            joystickControl(1);
        } else if (touchControl.cursors.right) {
            this.body.velocity.y = 0;
            this.body.velocity.x = this.speed;
            this.facing = "right";
            joystickControl(1);
        }
    } else if (Math.abs(speedTouch.y) > Math.abs(speedTouch.x)){
        // moving mainly up or down
        if (touchControl.cursors.up) {
            this.body.velocity.x = 0;
            this.body.velocity.y = -this.speed;
            this.facing = "up";
            joystickControl(1);
        } else if (touchControl.cursors.down) {
            this.body.velocity.x = 0;
            this.body.velocity.y = this.speed;
            this.facing = "down";
            joystickControl(1);
        }
    } else {
      moving = false;
      this.freeze();
      joystickControl(1);
    }

    if(moving)  {
      this.animations.play(this.facing);
      socket.emit("move player", {x: this.position.x, y: this.position.y, facing: this.facing});
    }
  };

  Player.prototype.handleBombInput = function() {
    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && !game.physics.arcade.overlap(this, level.bombs) && !this.bombButtonJustPressed) {
      this.bombButtonJustPressed = true;

      // Bombs for a player are identified by timestamp.
      socket.emit("place bomb", {x: this.body.position.x, y: this.body.position.y, id: game.time.now});
    } else if(!game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.bombButtonJustPressed) {
      this.bombButtonJustPressed = false;
    }
  };

  Player.prototype.freeze = function() {
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.animations.stop();
  };

  Player.prototype.applySpeedPowerup = function() {
    this.speed += PLAYER_SPEED_POWERUP_INCREMENT;
  };

  Player.prototype.getFrame = function (prefix, number) {
      return "gamesprites/bomberman_" + prefix + "/bomberman_" + prefix + "_" + number + ".png";
  };

  Player.prototype.reset = function() {
    this.x = this.spawnPoint.x;
    this.y = this.spawnPoint.y;
    this.frame = this.firstFrame;
    this.facing = "down";
    this.bombButtonJustPressed = false;
    this.speed = DEFAULT_PLAYER_SPEED;
    if(!this.alive) {
      this.revive();
    }
  };


Player.prototype.createButtonAmigo = function () {

    buttonBomb = game.add.button(game.world.width-160, 472, TEXTURES, this.actionOnClickBomb,this, "gamesprites/bomb/button_bomb_hover.png","gamesprites/bomb/button_bomb.png");

    buttonUp = game.add.button(54, 450, TEXTURES, actionOnClickUp,this,"gamesprites/bomb/button_up_hover.png","gamesprites/bomb/button_up.png");
    buttonDown = game.add.button(54, 542, TEXTURES, actionOnClickDown,this,"gamesprites/bomb/button_down_hover.png","gamesprites/bomb/button_down.png");
    buttonLeft = game.add.button(32, 473, TEXTURES, actionOnClickLeft,this,"gamesprites/bomb/button_left_hover.png","gamesprites/bomb/button_left.png");
    buttonRight = game.add.button(122, 473, TEXTURES, actionOnClickRight,this,"gamesprites/bomb/button_right_hover.png","gamesprites/bomb/button_right.png");
    // imgMid = game.add.image(100, 500, TEXTURES);

    buttonBomb.input.useHandCursor = true;
    buttonUp.input.useHandCursor = true;
    buttonDown.input.useHandCursor = true;
    buttonLeft.input.useHandCursor = true;
    buttonRight.input.useHandCursor = true;


    buttonBomb.inputEnabled = true;
    buttonUp.inputEnabled = true;
    buttonDown.inputEnabled = true;
    buttonLeft.inputEnabled = true;
    buttonRight.inputEnabled = true;

    buttonUp.visible = false;
    buttonDown.visible = false;
    buttonLeft.visible = false;
    buttonRight.visible = false;
};

Player.prototype.actionOnClickBombX = function (){
  if(true && !game.physics.arcade.overlap(this, level.bombs) && !this.bombButtonJustPressed) {
      this.bombButtonJustPressed = true;

      // Bombs for a player are identified by timestamp.
      socket.emit("place bomb", {x: this.body.position.x, y: this.body.position.y, id: game.time.now});
    } else if(!game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.bombButtonJustPressed) {
      this.bombButtonJustPressed = false;
    }
}; 

Player.prototype.acionMoveX = function() {
    var moving = true;

    game.physics.arcade.collide(this, level.blockLayer);
    game.physics.arcade.collide(this, level.bombs);

    if (buttonLeft.input.pointerDown()) {
      this.body.velocity.y = 0;
      this.body.velocity.x = -this.speed;
      this.facing = "left";
    } else if (buttonRight.input.pointerDown()) {
      this.body.velocity.y = 0;
      this.body.velocity.x = this.speed;
      this.facing = "right";
    } else if (buttonUp.input.pointerDown()) {
      this.body.velocity.x = 0;
      this.body.velocity.y = -this.speed;
      this.facing = "up";
    } else if (buttonDown.input.pointerDown()) {
      this.body.velocity.x = 0;
      this.body.velocity.y = this.speed;
      this.facing = "down";
    } else {
      moving = true;
      this.freeze();
    }

    if(moving)  {
      this.animations.play(this.facing);
      socket.emit("move player", {x: this.position.x, y: this.position.y, facing: this.facing});
    }
  };


module.exports = Player;


function actionOnClickUp(){

};


function actionOnClickDown(){

};

function actionOnClickRight(){
};

function actionOnClickLeft(){

};

Player.prototype.actionOnClickBomb = function() {
  if(true && !game.physics.arcade.overlap(this, level.bombs) && !this.bombButtonJustPressed) {
    this.bombButtonJustPressed = true;
    // Bombs for a player are identified by timestamp.
    socket.emit("place bomb", {x: this.body.position.x, y: this.body.position.y, id: game.time.now});
  } else if(!game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.bombButtonJustPressed) {
    this.bombButtonJustPressed = false;
  }
};

function actionOnClickLeft(){

};

function actionOnClickBomb(){
    return true;
};

function joystickControl (value) {
  if (value == 0) {
    value = true;
  } else {
    value = false;
  }
  buttonUp.visible = value;
  buttonDown.visible = value;
  buttonLeft.visible = value;
  buttonRight.visible = value;
}