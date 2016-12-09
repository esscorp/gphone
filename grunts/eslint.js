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
			src: [
				'gruntfile.js',
				'index.js',
				'grunts/**/*.js'
			]
		},
		frontend: {
			options: {
				configFile: 'eslint-config-ess/configs/frontend.js'
			},
			src: [
				'plugins.js'
			]
		}
	});

	grunt.loadNpmTasks('grunt-eslint');
};
