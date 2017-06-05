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

module.exports = cleanSvg;