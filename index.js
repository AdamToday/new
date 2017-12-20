var app = require('thor-spa-2');
var path = require('path');

app.run({
	'minify': app.args.get('minify'),
	'src': path.join(__dirname, 'src'),
	'dest': path.join(__dirname, 'build'),
	'css': {},
	'img': {},
	'js': {
		'scripts': [
			'vendor.js',
			'app.js'
		]
	},
	'static': {},
	'watch': !!app.args.get('local'),
	'disableServer': !app.args.get('server'),
});
