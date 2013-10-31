'use strict';

module.exports = function(grunt) {
  
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compress');
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
        smarttabs: true,
        '-W061': true,
        '-W082' : true,
        ignores: [
          'src/grid/libs/jquery.event.drag.js',
          'src/grid/libs/slick.core.js',
          'src/grid/libs/slick.grid.js'
        ],
        bitwise: false,
        sub: true
      },
      files: ['src/**/*.js']

    },
    compress: {
      main :{
        options: {
          type: 'zip',
          archive: 'build/eGovNg-1.0.0.zip'
        },
        files: [
          { src : ['eGovNg.js','eGovNg.min.js'], dest :'eGovNg-1.0.0/', cwd: 'build/', expand: true},
          { src : ['css/*'], dest :'eGovNg-1.0.0/css/', cwd: 'build/', expand: true },
          { src : ['images/**/*'], dest :'eGovNg-1.0.0/images/', cwd: 'build/', expand: true}
        ]
      }
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
          'build/<%= pkg.name %>.js' : ['src/module.js',
              'src/**/libs/*.js',
              'src/**/directives/**/*.js',
              'src/**/services/*.js',
              'src/**/filters/**/*.js'
            ]
        }
      }
    }
  });

  grunt.registerTask('webserver',['connect:devserver'])
  grunt.registerTask('build',['jshint','recess','copy','uglify'])
  grunt.registerTask('default',['build','webserver', 'watch'])
};