# svg-icons

This project uses

**kebot** https://www.npmjs.com/package/kebot

```javascript
npm install kebot -g
npm install kebot --save-dev
```

**globule** https://www.npmjs.com/package/globule
Install globally and as a dependency
```javascript
npm install globule --save-dev
```
**run**
```javascript
kb getSvg
kb server
```
To test the local demo you must change the true to false in the file **pug.js**
```javascript
var html = compiledFunction({prod:false});
```

#### Customize settings
```javascript
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
```

Demo https://kathianeira.github.io/svg-icons/


