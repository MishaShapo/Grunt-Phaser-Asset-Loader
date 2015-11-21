# Grunt-Phaser-Asset-Loader
Automatically creates Phaser simple load commands from a directory of assets.

## Quick-Start Guide
1. Install Node.js
2. Open empty directory and instll Grunt with `npm install grunt --save-dev`
3. Put the Gruntfile.js and package.json files into that directory
4. Create a folder called 'assets' in the same directory and put all of your images, sounds, spritesheets in there. The internal structure of the asset folder doesn't matter. The script will find all the files and their corresponding paths.
5. Open a command line in that directory and run `grunt phaser-asset-loader`
6. If all went right, you should see a green "Done, without errors" message in the log.
7. There should be a directory called dest with a .js file with all the Phaser commands. Copy that into your game and get coding. =)
