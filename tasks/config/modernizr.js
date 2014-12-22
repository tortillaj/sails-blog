// Modernizr
module.exports = function (grunt) {

  grunt.config.set('modernizr', {
    dist: {
      outputFile: '.tmp/public/js/modernizr.js',
      tests: ['respond', 'svg', 'mq', 'touch', 'localstorage', 'css_filters', 'css_backgroundsizecover', 'inputtypes', 'url_data_uri'],
      uglify: false,
      parseFiles: false
    }
  });

  grunt.loadNpmTasks('grunt-modernizr');
};
