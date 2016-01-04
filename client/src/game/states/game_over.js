var TextConfigurer = require('../util/text_configurer');

function GameOver() {
}

GameOver.prototype = {
	init: function(winnerColor, winByDefault) {
		this.winnerColor = winnerColor;
		this.winByDefault = winByDefault;
	},

	create: function() {
		var textToDisplay = this.winByDefault ? "NO OTHER PLAYERS REMAINING.\nYOU WIN BY DEFAULT." : "GAME OVER.\nWINNER: " + this.winnerColor;
		textToDisplay += "\n\n";
		var textObject = game.add.text(game.world.centerX, game.world.centerY - 50, textToDisplay, {align: "center",autoUpperCase: true});
		textObject.anchor.setTo(0.5, 0.5);
		TextConfigurer.configureText(textObject, "white", 28);
		buttonEnter = game.add.button(game.world.centerX - 95, 300, TEXTURES, this.actionOnClickOk,this,"lobby/buttons/game_over_ok_button_2.png","lobby/buttons/game_over_ok_button_1.png");
		buttonEnter.input.useHandCursor = true;
		buttonEnter.inputEnabled = true;
	},

	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			this.returnToLobby();
		}
	},

	returnToLobby: function() {
		game.state.start("Lobby");
	},

	actionOnClickOk: function(){
    	this.returnToLobby();
	}	
}

module.exports = GameOver;



 

