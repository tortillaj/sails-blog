// Add vendor prefixed styles
module.exports = function (grunt) {

  grunt.config.set('autoprefixer', {
      options: {
        browsers: ['last 2 version']
      },
      dist   : {
        files: [
          {
            expand: true,
            cwd   : '.tmp/public/styles',
            src   : '{,*/}*.css',
            dest  : '.tmp/public/styles'
          }
        ]
      }
    });

  grunt.loadNpmTasks('grunt-autoprefixer');
};
