var path = require('path');
var fs = require('fs');
var path = require("path");

// Declaring folder source and destination
var folder = __dirname + "/images";
var desc = __dirname + "/assest";
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
	var files = fs.readdirSync(folder);
	var svgIcons = "";
	for(var i=0; i<files.length; i++){
		var pathSvg= folder+'/'+files[i];
		var file = files[i].split(".")[0];
  	var nameId = file.replace('.svg', '');
		var fileSvg = fs.readFileSync(pathSvg, 'utf8');
		var finalSvg = cleanSvg(fileSvg);
		var generateNewSymbol= generateSymbol(finalSvg, nameId);
		svgIcons+=generateNewSymbol;
	}
	return svgIcons;
};

writeFiles = function(){
	var newSymbols = IteratingFiles()
	fs.writeFileSync(desc+'/example.svg', "<svg "+attrSvg+">"+newSymbols+"</svg>", 'utf8');
};

createNewFile = function(){
	var newSymbols = IteratingFiles();
	var writeStream = fs.createWriteStream(desc+'/example.svg');
	writeStream.write("<svg "+attrSvg+">"+newSymbols+"</svg>");
};

generateFileSymbols = function(){
	fs.open(desc+'/example.svg', 'wx', (err, fd) => {
		if (err) {
    		if (err.code === 'EEXIST') {
					writeFiles();
				}
		}else{
			createNewFile();
		}
	});
};

generateFileSymbols();