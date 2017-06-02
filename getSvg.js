var path = require('path');
var fs = require('fs');
var path = require("path");
var glob = require('glob-all');
// Declaring folder source and destination
var folder = __dirname + "/images";
var desc = __dirname + "/src/svg";
var attrSvg = "xmlns='http://www.w3.org/2000/svg' class='svg-icon-lib'";

removeXml = function(fileSvg){
	return fileSvg.replace(/\<\?xml.+\?\>|\<\!DOCTYPE.+]\>/g, '');
};

removeComments = function(fileSvg){
	return fileSvg.replace(/<!--(?!>)[\S\s]*?-->/g, '');
};

removeStyle = function(fileSvg){
	return fileSvg.replace(/<style(?!>)[\S\s]*?style>/g, '')
};

getViewBox = function(fileSvg){
	return fileSvg.match(/viewBox="(?!>)[\S\s]*?"/g)[0];
};

createSymbol = function(fileSvg){
	return fileSvg.replace(/svg/gi, "symbol");
};

generateSymbol = function(fileSvg, nameId){
	var viewBox = getViewBox(fileSvg);
	return fileSvg.replace(/<symbol(?!>)[\S\s]*?>/g, '<symbol id="'+nameId+'" '+viewBox+'>');
};

cleanSvg = function(svg){
	var fileSvg;
	fileSvg = removeXml(svg);
	fileSvg = removeComments(fileSvg);
	fileSvg = removeStyle(fileSvg);
	fileSvg = createSymbol(fileSvg);
	return fileSvg
};

IteratingFiles = function(){
	var folderConfig = glob.sync([__dirname + '/frontend/**/_*.js']);
	var newSvgConvertSymbols="";
	folderConfig.forEach(function(fileConfigSvg) {
		var readFileConfig = require(fileConfigSvg);
		var chunkFile = fileConfigSvg.split('/');
		var namePage = chunkFile[chunkFile.length-2];
		readFileConfig.forEach(function(nameSvg){
			var pathImageSvg= folder+'/'+nameSvg+'.svg';
			var svgOrigin = fs.readFileSync(pathImageSvg, 'utf8');
			var newSvg = cleanSvg(svgOrigin);
			var generateNewSymbols= generateSymbol(newSvg, nameSvg);
			newSvgConvertSymbols+=generateNewSymbols;
		});
		generateFileSymbols(desc, namePage, newSvgConvertSymbols);
		newSvgConvertSymbols="";
	});
};

writeFiles = function(desc, name,newSymbols){
	fs.writeFileSync(desc+'/symbols-'+name+'.svg', "<svg "+attrSvg+">"+newSymbols+"</svg>", 'utf8');
};

createNewFile = function(desc, name, newSymbols){
	var writeStream = fs.createWriteStream(desc+'/symbols-'+name+'.svg');
	writeStream.write("<svg "+attrSvg+">"+newSymbols+"</svg>");
};

generateFileSymbols = function(desc,name, newSymbols){
	fs.open(desc+'/symbols-'+name+'.svg', 'wx', (err, fd) => {
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