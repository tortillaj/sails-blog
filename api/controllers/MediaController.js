/**
 * MediaController
 *
 * @description :: Server-side logic for managing media
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


  definition: function (req, res) {
    res.json(Media.definition);
  },

  send: function(req, res) {
    var Imager = require('imager');
    var imagerConfig = sails.config.imager;
    var imager = new Imager(imagerConfig, 'S3');

    // add a field to support imager
    req.files.file.type = req.files.file.headers['content-type'];

    imager.upload([req.files.file], function(error, cdnUri, uploaded) {
      if (error) res.serverError(error);
      res.send({
        uploaded: uploaded,
        cdnUri: cdnUri
      });
    }, 'items');
  }

};

