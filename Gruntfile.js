module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    clean: {
      dist: ['dist']
    },
    concat: {
      js: {
        separator: ';',
        src: ['app/scripts/*', 'app/start.js'],
        dest: 'dist/app/phi.js',
      },
      libs: {
        separator: ';',
        src: ['libs/*'],
        dest: 'dist/app/vendor.js',
      }
    },
    copy: {
      dist: {
        files: [
          {src: 'app/index.html', dest: 'dist/'},
          {src: 'assets/**', dest: 'dist/app/'},
          {src: 'public/favicon.ico', dest: 'dist/app/favicon.ico'},
        ]
      }
    },
    sass: {
      dist: {
        files: {
          'dist/app/phi.css': 'app/styles/app.scss'
        }
      }
    },
    'http-server': {
      'dev': {
        root: 'dist/app/',
        port: 8081,
        host: "127.0.0.1",
        // host: "0.0.0.0",
        cache: 1,
        showDir : true,
        autoIndex: true,
        // server default file extension
        ext: "html",
        // run in parallel with other tasks
        runInBackground: true,
        openBrowser : false,
      }
    },
    watch: {
      dev: {
        files: ['app/**/*', 'assets/**/*'],
        tasks: ['build'],
        options: {
          livereload: true,
        },
      },
    },
    fontmin: {
      options: {
        dest:    'dist/app/assets/fonts/',
        basedir: 'dist/app/assets/fonts/'
      },
      'Bombshell.ttf': {
        getText: (html) => 'PhineyTakYou!',
        src: 'dist/**/*.html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-fontmin');

  // Default task(s).
  grunt.registerTask('default', ['build', 'http-server', 'watch']);
  grunt.registerTask('build', ['clean', 'concat', 'copy', 'sass', 'fontmin']);
  grunt.registerTask('prod', ['build'])
};
