const { src, dest } = require('gulp');

function buildIcons() {
	// No custom icons needed - using FontAwesome icon string
	// This task is a no-op but required by the build script
	return src('nodes/**/*.png', { allowEmpty: true })
		.pipe(dest('dist/nodes'));
}

exports['build:icons'] = buildIcons;
