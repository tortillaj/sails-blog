/**
 * TagController
 *
 * @description :: Server-side logic for managing tags
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


  definition: function (req, res) {
    res.json(Tag.definition);
  },

  index: function (req, res) {
    var limit = req.param('limit') || 10;
    var page = req.param('page') || 0;

    Tag.find()
      .paginate({
        page: page,
        limit: limit
      })
      .populate('tagged')
      .exec(function(error, tags) {
        if (error) return res.serverError(error);
        return res.send(tags);
      });
  },

  create: function(req, res) {

  },

  find: function(req, res) {
    var limit = req.param('limit') || 10;
    var skip = req.param('skip') || 0;

    Tag.find({where: {slug: req.param('slug')}, limit: limit, skip: skip})
      .populate('tagged')
      .then(function (tagged) {
        return res.send(tagged);
      })
      .catch(function (error) {
        return res.serverError(error);
      });
  },

  search: function(req, res) {

  },

  update: function(req, res) {

  },

  destroy: function(req, res) {

  }

};

