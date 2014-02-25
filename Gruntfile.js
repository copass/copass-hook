module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
      scripts: {
        files: ['*.js'],
        tasks: ['default'],
        options: {
          nospawn: true
        }
      }
    },
    develop: {
      server: {
        file: 'server.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-develop');


  // grunt.registerTask('start', function() {
  //   grunt.util.spawn({
  //     cmd: 'node',
  //     args: ['server.js']
  //   });
  //   // grunt.task.run('watch');
  // });

  // grunt.registerTask('default', 'start');
  grunt.registerTask('default', ['develop', 'watch']);

};