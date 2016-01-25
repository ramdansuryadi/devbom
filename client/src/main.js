window.game = new Phaser.Game(1080, 600, Phaser.AUTO, '');
window.player = null;
window.socket = null;
window.level = null;
window.TEXTURES = "bbo_textures";
window.DM_TEXTURES = "dm_textures";
window.MAP_THUMBNAILS = "map_thumbnails";
window.OTX = 240;

startGame();

function startGame() {
   // socket = io("https://powerful-chamber-6580.herokuapp.com:443");
    socket = io("http://localhost:8000");
    // socket = io("http://192.168.123.152:8000");
    // socket = io("http://192.168.123.27:8000");

    require("./game/mods/phaser_enhancements");

	game.state.add("Boot", require("./game/states/boot"));
	game.state.add("Preloader", require("./game/states/preloader"));
	game.state.add("TitleScreen", require("./game/states/title_screen"));
	game.state.add("Lobby", require("./game/states/lobby"));
	game.state.add("StageSelect", require("./game/states/stage_select"));
	game.state.add("PendingGame", require("./game/states/pending_game"));
	game.state.add("Level", require("./game/states/level"));
	game.state.add("GameOver", require("./game/states/game_over"));

	game.state.start('Boot');
};

Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

