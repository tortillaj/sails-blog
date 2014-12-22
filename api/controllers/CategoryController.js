/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


  definition: function (req, res) {
    res.json(Category.definition);
  },

  index: function (req, res) {
    var limit = req.param('limit') || 10;
    var page = req.param('page') || 0;

    Category.find()
      .paginate({
        page: page,
        limit: limit
      })
      .then(function (topics) {
        return res.send(topics);
      })
      .catch(function (error) {
        return res.serverError(error);
      });
  },

  create: function (req, res) {
    Category.create(req.allParams())
      .exec(function (error, created) {
        if (error) return res.serverError(error);
        return res.send(created);
      })
  },

  find: function (req, res) {

  },

  search: function (req, res) {

  },

  update: function (req, res) {

  },

  destroy: function (req, res) {

  }

};

