var pug = require('pug');
var fs = require('fs');
var glob = require("glob");
var glob = require('glob-all');
var pattern = glob.sync([__dirname + '/frontend/**/**/*.pug']);
//var pattern = __dirname + "/frontend/pug/*.pug";
var src = __dirname;
var pathNode = require("path");

var filesInput = glob.sync(pattern);

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

    var html = compiledFunction();
    var outsrc = pathNode.resolve(src, name);
    fs.writeFileSync(outsrc, html, 'utf-8');
});
