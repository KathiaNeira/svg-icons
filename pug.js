var pug = require('pug');
var fs = require('fs');
var globule = require("globule");
var pattern = globule.find([__dirname + '/frontend/**/**/*.pug']);
//var pattern = __dirname + "/frontend/pug/*.pug";
var src = __dirname;
var pathNode = require("path");

var filesInput = globule.find(pattern);

// Compile the source code
filesInput.forEach(function(element, index) {
    var path = element.split("/").pop();
    var name = path.replace('pug', 'html');

    var compiledFunction = pug.compileFile(element, {
      filename : 'pug',
      doctype: 'html',
      pretty: true,
      inlineRuntimeFunctions: true
    });

    var html = compiledFunction({prod:false});
    var outsrc = pathNode.resolve(src, name);
    fs.writeFileSync(outsrc, html, 'utf-8');
});
