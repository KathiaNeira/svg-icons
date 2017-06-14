var path = require('path');
var fs = require('fs');
var attrSvg = "xmlns='http://www.w3.org/2000/svg' class='svg-icon-lib'";
//
var config = require("./svgConfig");
var cleanSvg = require("./cleanSvg");
//
IteratingFiles = function(){
	emptyFolderGenerateSvg();
	var newSvgConvertSymbols="";
	config.folderConfig.forEach(function(fileConfigSvg) {
		var readFileConfig = require(fileConfigSvg);
		var namePage = config.nameNewFileSvg(fileConfigSvg);
		readFileConfig.forEach(function(nameSvg){
			var pathImageSvg= config.folder+'/'+nameSvg+'.svg';
			var svgOrigin = fs.readFileSync(pathImageSvg, 'utf8');
			var newSvg = cleanSvg(svgOrigin);
			var generateNewSymbols= generateSymbol(newSvg, nameSvg);
			newSvgConvertSymbols+=generateNewSymbols;
		});
		generateFileSymbols(config.desc, namePage, newSvgConvertSymbols);
		newSvgConvertSymbols="";
	});
};

createNewFile = function(desc, name, newSymbols){
	var writeStream = fs.createWriteStream(desc+'/'+name+'.svg');
	writeStream.write("<svg "+attrSvg+">"+newSymbols+"</svg>");
};

generateFileSymbols = function(desc,name, newSymbols){
	createNewFile(desc, name, newSymbols);
};

emptyFolderGenerateSvg = function(){
	var filePath = globule.find([config.desc + '/*.svg']);
	filePath.forEach(function(files){
		fs.unlinkSync(files);
	})
};

IteratingFiles();