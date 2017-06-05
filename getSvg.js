var path = require('path');
var fs = require('fs');
var attrSvg = "xmlns='http://www.w3.org/2000/svg' class='svg-icon-lib'";
//
var config = require("./svgConfig");
var cleanSvg = require("./cleanSvg");
//
IteratingFiles = function(){
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

writeFiles = function(desc, name,newSymbols){
	fs.writeFileSync(desc+'/'+name+'.svg', "<svg "+attrSvg+">"+newSymbols+"</svg>", 'utf8');
};

createNewFile = function(desc, name, newSymbols){
	var writeStream = fs.createWriteStream(desc+'/'+name+'.svg');
	writeStream.write("<svg "+attrSvg+">"+newSymbols+"</svg>");
};

generateFileSymbols = function(desc,name, newSymbols){
	fs.open(desc+'/'+name+'.svg', 'wx', (err, fd) => {
		if (err) {
    		if (err.code === 'EEXIST') {
					writeFiles(desc, name, newSymbols);
				}
		}else{
			createNewFile(desc, name, newSymbols);
		}
	});
};
IteratingFiles();