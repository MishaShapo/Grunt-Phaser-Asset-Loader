/*
 * phaser-asset-loader
 * https://github.com/MishaShapo/Grunt-Phaser-Asset-Loader
 *
 * Copyright (c) 2015 Michail Shaposhnikov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    "phaser-asset-loader" : {
      build: {
        files: {
          'dest/phaser-asset-code.js' : ['assets/**/*.png','assets/**/*.jpg','assets/**/*.json','assets/**/*.csv','assets/**/*.txt','assets/**/*.ogg','assets/**/*.mp3','assets/**/*.m4a','assets/**/*.data']
        }
      }
    } 
  });
  
  grunt.registerMultiTask('phaser-asset-loader', 'Create load commands for Phaser assets', function() {
    grunt.log.writeln('Starting asset loader')
    try{
    this.files.forEach(function(file){
      var paths = file.src,
          out = file.dest,
          contents = '',
          images = ['.png','.jpg',],
          audio = ['.ogg','.mp3','.m4a'],
          text = ['.json','.csv','.txt'],
          xml = ['.xml'];

      var loadObjects = [];
      var keys = [];
      var approvedTypes = ['atlas','atlasJSONArray','atlasJSONHash','atlasXML','audio','audiosprite','binary','bitmapFont','image','images','json','spritesheet','text','tilemap'];
      
      paths.forEach(function( path ) {
          
          var extension = path.substring(path.lastIndexOf('.'));
          var name = path.substring(path.lastIndexOf('/')+1,path.lastIndexOf('.'));
          var type = (name.indexOf('_') > -1) ? name.substring(name.lastIndexOf('_')+1) : '';
          var isValidType = approvedTypes.some(function(curVal){return curVal === type;});
          var error = "";         
          
          if(isValidType){
            name = name.substring(0,name.lastIndexOf('_'));
          }


          if (images.some(function(curVal){return curVal === extension;})) {
            type = (isValidType) ? type: 'image';
          } else if (audio.some(function(curVal){return curVal === extension;})) {
            type = (isValidType) ? type : 'audio';
          } else if(text.some(function(curVal){return curVal === extension;})){
            type = (isValidType) ? type : "text";
          } else {
            if(!isValidType)
              type = "uknown";
          }

          if(loadObjects[name] == null){
            //New asset
              loadObjects[name] = {
                  type : type,
                  key: name,
                  urls : [path]
                }; 
              keys.push(name);
            } else {
              //Asset with this name exists. Appending path
              loadObjects[name].urls.push(path);
            } 
        
      });

      
      keys.forEach(function(cur){
        var asset = loadObjects[cur];
        contents += "this.load." + asset.type + ".('" + asset.key + "',[";
        asset.urls.forEach(function(cur,index,arr){
          contents += "'" + cur + "'";
          if(index != arr.length-1){
            contents += ",";
          }
        });
        
        contents += ']);\n';
      });
      grunt.file.write(out, contents);
      grunt.verbose.ok();
      });
    } catch(e){
      grunt.verbose.or.write("Error: ").error(e.message);
      grunt.fail.warn('Something went wrong');
    }
          
  });
};
