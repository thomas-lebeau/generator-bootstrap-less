module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    mochaTest: {
      all: {
        src: ['test/**/*.js']
      }
    },
    watch: {
      all: {
        files:['test/*.js', 'app/index.js'],
        tasks:['mochaTest']
      }
    }
  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('test', ['mochaTest']);

};
