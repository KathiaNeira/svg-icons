# svg-icons
```javascript
var gulp = require('gulp');
var svgSymbols = require('gulp-svg-symbols');
var path = require('path');
var glob = require('glob');

gulp.task('svgSymbols', function () {
	return gulp.src('./svg/*.svg')
		.pipe(svgSymbols({
			svgClassname: 'svg-icon-lib',
			templates: ['default-svg']
		}))
		.pipe(gulp.dest('./assest'));
});
```
