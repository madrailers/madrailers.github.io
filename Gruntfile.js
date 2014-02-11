/*global module:false*/
module.exports = function(grunt) {

  var repo_slug = 'madrailers/madrailers.github.io';

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    requirejs: {
      compile: {
        options: {
          baseUrl: "./",
          appDir: "src/javascripts",
          dir: "dist/js",
          modules: [
            { name: 'main' }
          ],

          paths: {
            jquery: "vendor/jquery",
            backbone: "vendor/backbone",
            marionette: "vendor/backbone.marionette",
            underscore: "vendor/underscore",
            json: "vendor/json2",
            text: "vendor/text",
            handlebars: "vendor/handlebars",
            moment: "vendor/moment-with-langs.min"
          },

          shim: {
            jquery : {
              exports : 'jQuery'
            },
            underscore : {
              exports : '_'
            },
            backbone : {
              deps : ['jquery', 'underscore'],
              exports : 'Backbone'
            },
            marionette : {
              deps : ['jquery', 'underscore', 'backbone'],
              exports : 'Marionette'
            },
            handlebars: {
              exports: 'Handlebars'
            }
          }
        }
      }
    },

    markdown: {
      all: {
        files: [
          {
            expand: true,
            cwd: 'src/markdown',
            src: '**/*.md',
            dest: 'dist/',
            ext: '.html'
          }
        ],
        options: {
          template: 'src/templates/template.jst'
        }
      }
    },

    'gh-pages': {
      options: {
        base: 'dist',
        branch: 'master',
        repo: 'git@github.com:' + repo_slug + '.git'
      },
      src: ['**']
    },

    clean: {
      all: ["dist"],
      js: [
        "dist/js/**/*.js",
        "dist/js/**/*.html",
        "!dist/js/main.js",
        "!dist/js/vendor/require.js"
      ]
    },

    copy: {
      main: {
        files: [
          {expand: true, cwd: 'src', src: ['index.html'], dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'src/images', src: ['**'], dest: 'dist/img'}
        ]
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'src/stylesheets',
          cssDir: 'dist/css',
          outputStyle: 'compressed',
          environment: 'production'
        }
      }
    },

    watch: {
      markdown: {
        files: ['src/markdown/**/*.md', 'src/templates/template.jst'],
        tasks: ['markdown']
      },
      copy: {
        files: ['src/index.html', 'src/images/**'],
        tasks: ['copy']
      },
      compass: {
        files: ['src/stylesheets/**/*.scss'],
        tasks: ['compass']
      },
      js: {
        files: ['src/javascripts/**/*.js'],
        tasks: ['requirejs']
      }
    }
  });

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-markdown');
  grunt.loadNpmTasks('grunt-gh-pages');

  // Default task.
  // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  grunt.registerTask('default', ['copy', 'requirejs', 'clean:js', 'markdown', 'compass']);
  grunt.registerTask('build', ['clean', 'copy', 'markdown', 'compass']);
  grunt.registerTask('deploy', ['gh-pages']);
  grunt.registerTask('autobuild', ['build', 'deploy']);
};
