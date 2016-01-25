// var mvp = document.getElementById('viewport');
// console.log(mvp);
// var mvps = screen.height/600;
// mvp.setAttribute('content','width=device-width, height=device-height, initial-scale=1, minimum-scale='+mvps+', maximum-scale='+mvps+', target-densityDpi=device-dpi, user-scalable=no');

var TextConfigurer = require("../util/text_configurer");

var Preloader = function () {};

module.exports = Preloader;

function loadFont(){
    TextConfigurer;
};

Preloader.prototype = {
  displayLoader: function() {
    loadFont();
        this.text = game.add.text(game.camera.width / 2, 250, "LOADING... ");
        this.text.anchor.setTo(.5, .5);
        TextConfigurer.configureText(this.text, "white", 32);

        this.load.onFileComplete.add(function(progress) {
            this.text.setText("LOADING... " + progress + "%");
        }, this);

        this.load.onLoadComplete.add(function() {
            game.state.start("TitleScreen");
        });      
  },

  preload: function () {
    
    this.displayLoader();

    this.load.atlasJSONHash("bbo_textures", "assets/textures/bbo_textures.png", "assets/textures/bbo_textures.json");
    this.load.atlasJSONHash("map_thumbnails", "assets/maps/map_thumbnails.png", "assets/maps/map_thumbnails.json");
    this.load.atlasJSONHash("dm_textures", "assets/textures/dm_textures.png", "assets/textures/dm_textures.json");

    this.load.tilemap("map_01", "assets/maps/map_01.json", null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap("map_02", "assets/maps/map_02.json", null, Phaser.Tilemap.TILED_JSON);
    
    this.load.image("tiles", "assets/tiles/tileset.png");
    this.load.image("repeating_bombs", "assets/repeating_bombs.png");

    this.load.audio("explosion", "assets/sounds/bomb.ogg");
    this.load.audio("powerup", "assets/sounds/powerup.ogg");
    this.load.audio("click", "assets/sounds/click.ogg");

    this.load.atlasJSONHash("compass", "assets/textures/bbo_textures.png","assets/textures/bbo_textures.json");
    this.load.atlasJSONHash('touch_segment', "assets/textures/bbo_textures.png","assets/textures/bbo_textures.json");
    this.load.atlasJSONHash('touch', "assets/textures/bbo_textures.png","assets/textures/bbo_textures.json");

    window.buttonClickSound = new Phaser.Sound(game, "click", .25);
  }
};
