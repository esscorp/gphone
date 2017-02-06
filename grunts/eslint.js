'use strict';


module.exports = function(grunt) {

	grunt.config('eslint', {
		options: {
			rulePaths: ['node_modules/@esscorp/eslint/rules']
		},
		backend: {
			options: {
				config: 'node_modules/@esscorp/eslint/configs/backend.js'
			},
			nonull: true,
			src: [
				'gruntfile.js',
				'index.js',
				'grunts/**/*.js'
			]
		},
		frontend: {
			options: {
				configFile: 'node_modules/@esscorp/eslint/configs/frontend.js'
			},
			nonull: true,
			src: [
				'plugins.js'
			]
		}
	});

	grunt.loadNpmTasks('grunt-eslint');
};
