var kebot = require('kebot');
kebot.task({
	alias : 'server',
	entry : './serverExpress.js'
});

kebot.task({
	alias : 'pug',
	entry : './pug.js'
})
