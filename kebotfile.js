var kebot = require('kebot');
kebot.task({
	alias : 'server',
	entry : './serverExpress.js'
});

kebot.task({
	alias : 'pug',
	entry : './pug.js'
});

kebot.task({
	alias : 'getSvg',
	entry : './getSvg.js'
});

kebot.task({
	alias : 'gulpfile',
	entry : './gulpfile.js'
})
