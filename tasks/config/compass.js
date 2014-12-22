// Compiles Sass to CSS and generates necessary files if requested
module.exports = function (grunt) {

  grunt.config.set('compass', {
    options: {
      sassDir: 'assets/styles',
      cssDir: '.tmp/public/styles',
      generatedImagesDir: '.tmp/public/styles/images/generated',
      imagesDir: '.tmp/public/images',
      javascriptsDir: '.tmp/public/js',
      fontsDir: '.tmp/public/fonts',
      httpImagesPath: 'images',
      httpGeneratedImagesPath: 'images/generated',
      httpFontsPath: 'fonts',
      relativeAssets: false,
      assetCacheBuster: false,
      raw: 'Sass::Script::Number.precision = 10\n',
      require: ['bootstrap-sass'],
      force: true,
      importPath: 'assets/vendor/bootstrap-sass-official/assets/stylesheets/'
    },
    dev: {
      options: {
        outputStyle: 'expanded',
        debugInfo: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
};
