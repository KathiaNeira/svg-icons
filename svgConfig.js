var globule = require('globule');
// Declares all svg folder
var folder = __dirname + "/images";

// Compiled svg folder
var desc = __dirname + "/src/svg";

// Looking for all the folders that have the configuration file with the svg to display in the view.
var folderConfig = globule.find([__dirname + '/frontend/**/_*.js']);

// Getting the name of the view to name the compiled svg file
nameNewFileSvg = function(fileConfigSvg){
  // fileConfigSvg = example -> /home/myFolder/page1/config.js
  var chunkFile = fileConfigSvg.split('/');
  // namePage = example -> page1
  var namePage = chunkFile[chunkFile.length-2];
  // This will serve to name our compiled file depending on the view it is in, for example: symbols-page1.svg
  return 'symbols-'+namePage;
};

module.exports = {
  folder:folder,
  desc:  desc,
  folderConfig: folderConfig,
  nameNewFileSvg:nameNewFileSvg
}