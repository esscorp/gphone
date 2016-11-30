'use strict';


module.exports = function(grunt) {

	grunt.config('eslint', {
		options: {
			rulePaths: ['node_modules/eslint-config-ess/rules']
		},
		backend: {
			options: {
				config: 'eslint-config-ess/configs/backend.js'
			},
			src: [
				'gruntfile.js',
				'index.js',
				'grunts/**/*.js'
			]
		},
		frontend: {
			options: {
				config: 'eslint-config-ess/configs/frontend.js'
			},
			src: [
				'plugins.js'
			]
		}
	});

	grunt.loadNpmTasks('grunt-eslint');
};
