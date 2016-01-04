var AudioPlayer = require("../util/audio_player");

var Boot = function () {};

module.exports = Boot;

Boot.prototype = {

  preload: function () {
    // Fill in later.
  },

  create: function () {
    game.disableVisibilityChange = true; // So that game doesn't stop when window loses focus.
    game.input.maxPointers = 1;
    AudioPlayer.initialize();

    if (game.device.desktop) {
      game.scale.pageAlignHorizontally = true;
    } else {
      game.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.isFullScreen  =  true;
      game.scale.minWidth =  screen.width;
      game.scale.minHeight = screen.height;
      game.scale.maxWidth = screen.width;
      game.scale.maxHeight = screen.height;
      game.scale.forceLandscape = true;
      game.scale.pageAlignHorizontally = true;
      game.scale.setScreenSize(true);
    }

    game.state.start('Preloader');
  }
};
