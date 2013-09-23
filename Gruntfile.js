'use strict';

module.exports = function(grunt) {
  
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-recess');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect:{
      devserver:{
        options:{
          port: 8001,
          hostname : '0.0.0.0',
          base : '.',
          keepalive: true
        }
      }
    },
    jshint: {
      options: {
        multistr: true,
        smarttabs: true
      },
      files: ['src/**/*.js']
    },
    watch: {
      files: ['src/**/*.js','less/**/*.less'],
      tasks: ['jshint','recess','copy','uglify'],
      livereload: {
        options: {
          livereload: true
        },
        files: ['src/**/*.js', 'doc/contents/api/*'],
        tasks: ['uglify']
      }
    },
    recess: {
      options: {
        compile: true
      },
      kt3m: {
        src: ['less/eGovNg.less'],
        dest: 'build/css/<%= pkg.name %>.css'
      },
      min: {
        options: {
          compress: true
        },
        src: ['less/eGovNg.less'],
        dest: 'build/css/<%= pkg.name %>.min.css'
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['images/**'], dest: 'build/'}
        ]
      }
    },
    uglify: {
      min : {
        options: {
          wrap : 'eGovNg',
          mangle : false,
          compress : false,
          beautify : true,
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'build/<%= pkg.name %>.js' : ['src/module.js','src/filters/*.js','src/services/*.js','src/directives/**/*.js']
        }
      },
      concat : {
        options: {
          wrap : 'eGovNg',
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'build/<%= pkg.name %>.min.js' : ['src/module.js','src/filters/*.js','src/services/*.js','src/directives/**/*.js']
        }
      }
    }
  });

  grunt.registerTask('webserver',['connect:devserver'])
  grunt.registerTask('build',['jshint','recess','copy','uglify'])
  grunt.registerTask('default',['build','webserver', 'watch'])
};