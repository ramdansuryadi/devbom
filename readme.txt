//INSTALL APP
	// install nodejs - once
		// ubuntu
		- sudo apt-get update
		- sudo apt-get install nodejs
		- sudo apt-get install npm

		// windows, check node js website
	
	// install app - once
	- npm install

//CLIENT
	// build app
	- gulp
	// build mobile app
		- cd mobile
		// install cordova v 4.2.0 - once
		- npm install -g cordova@4.2.0
		
		// add platform - once
		- cordova platform add ios
		-/ cordova platform add android
		
		// add app to builder
			// if mobile/www exist
			delete all inside mobile/www if exist
			// if mobile/www not exist
			create www directory inside mobile

			// copy app files to mobile/www directory:
			. client/assets
			. client/dist
			. client/index.html

		// build package
		- cordova build ios
		-/ cordova build android


//SERVE SERVER 
	// ubuntu
		// install upstart - once
		- sudo apt-get install upstart
		
		// copy server/bomberman_server.conf to /etc/init/  - once
		- cp /PROJECT_DIR/server/bomberman_server.conf /etc/init/bomberman_server.conf

		// configure /etc/init/bomberman_server.conf accordingly  - once
		- vim /etc/init/bomberman_server.conf

		// run
		// -> to start (automatically startup as well)
		- sudo start bomberman_server
		// -> to stop
		- sudo stop bomberman_server

	// Window
		// run
		- node server/server.js