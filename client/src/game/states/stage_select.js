var StageSelect = function() {};

module.exports = StageSelect;

var xOffset = OTX+40;
var yOffset = 50;

var thumbnailXOffset = OTX+215;
var thumbnailYOffset = 150;

var stageNameYOffset = 328;

// var repeatingBombTilesprite;

var stages = [
	{name: "Map 1", thumbnailKey: "map_01.png", tilemapName: "map_01", maxPlayers: 4, size: "medium"},
	{name: "Map 2", thumbnailKey: "map_02.png", tilemapName: "map_02", maxPlayers: 4, size: "medium"},
];

StageSelect.prototype = {
	init: function(gameId, rbts) {
		// repeatingBombTilesprite = rbts;
		this.gameId = gameId;
	},

	create: function() {
		var selectionWindow = game.add.image(xOffset, yOffset, TEXTURES, "lobby/select_stage.png");
		this.selectedStageIndex = 0;
		var initialStage = stages[this.selectedStageIndex];

		this.leftButton = game.add.button(OTX+100, 180, TEXTURES, this.leftSelect, this, "lobby/buttons/left_select_button_02.png", "lobby/buttons/left_select_button_01.png");
		this.rightButton = game.add.button(OTX+450, 180, TEXTURES, this.rightSelect, this, "lobby/buttons/right_select_button_02.png", "lobby/buttons/right_select_button_01.png");
		this.okButton = game.add.button(OTX+495, 460, TEXTURES, this.confirmStageSelection, this, "lobby/buttons/ok_button_02.png", "lobby/buttons/ok_button_01.png");
		this.backLobbyButton = game.add.button(OTX+43, 460, TEXTURES, this.backLobby, this, "gamesprites/bomb/cancel.png", "gamesprites/bomb/cancel.png");

		this.leftButton.setDownSound(buttonClickSound);
		this.rightButton.setDownSound(buttonClickSound);
		this.okButton.setDownSound(buttonClickSound);

		this.thumbnail = game.add.image(thumbnailXOffset, thumbnailYOffset, MAP_THUMBNAILS, initialStage.thumbnailKey);

		// Display title
		this.text = game.add.text(game.camera.width / 2, stageNameYOffset, initialStage.name);
		this.configureText(this.text, "white", 28);
		this.text.anchor.setTo(.5, .5);

		// Display number of players
		this.numPlayersText = game.add.text(OTX+145, 390, "Max # of players:   " + initialStage.maxPlayers);
		this.configureText(this.numPlayersText, "white", 18);

		// Display stage size
		this.stageSizeText = game.add.text(OTX+145, 420, "Map size:   " + initialStage.size);
		this.configureText(this.stageSizeText, "white", 18);
	},

	leftSelect: function() {
		if(this.selectedStageIndex === 0) {
			this.selectedStageIndex = stages.length - 1;
		} else {
			this.selectedStageIndex--;
		}

		this.updateStageInfo();
	},

	rightSelect: function() {
		if(this.selectedStageIndex === stages.length - 1) {
			this.selectedStageIndex = 0;
		} else {
			this.selectedStageIndex++;
		}

		this.updateStageInfo();
	},

	update: function() {
		// repeatingBombTilesprite.tilePosition.x++;
		// repeatingBombTilesprite.tilePosition.y--;
	},

	updateStageInfo: function() {
		var newStage = stages[this.selectedStageIndex];
		this.text.setText(newStage.name);
		this.numPlayersText.setText("Max # of players:   " + newStage.maxPlayers);
		this.stageSizeText.setText("Map size:   " + newStage.size);
		this.thumbnail.loadTexture(MAP_THUMBNAILS, newStage.thumbnailKey);
	},

	configureText: function(text, color, size) {
		text.font = "Oswald";
		text.fill = color;
		text.fontSize = size;
	},

	confirmStageSelection: function() {
		var selectedStage = stages[this.selectedStageIndex];

		socket.emit("select stage", {mapName: selectedStage.tilemapName});
		// game.state.start("PendingGame", true, false, selectedStage.tilemapName, this.gameId, repeatingBombTilesprite);
		game.state.start("PendingGame", true, false, selectedStage.tilemapName, this.gameId);
	},

	backLobby: function() {
		game.state.start("Lobby");
	},
};