/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


  definition: function (req, res) {
    res.json(Post.definition);
  },

  index: function (req, res) {
    var limit = req.param('limit') || 10;
    var page = req.param('page') || 1;
    var paging = {page: parseInt(page), limit: parseInt(limit)};

    var sort = req.param('sort') || 'createdAt DESC';

    var query = req.param('query');
    var search = {};
    if (query) {
      search['or'] = [];
      var terms = query.split(' ');

      for (var q = 0; q < terms.length; q++) {
        search.or.push({
          title: {
            contains: terms[q]
          }
        });
        search.or.push({
          body: {
            contains: terms[q]
          }
        });
      }
    }

    Post.find(search).exec(function (error, allPosts) {
      if (error) return res.serverError(error);

      Post.find(search)
        .paginate(paging)
        .populate('tags')
        .populate('topic')
        .populate('attachments')
        .sort(sort)
        .exec(function (error, posts) {
          if (error) return res.serverError(error);

          var list = {
            posts: posts,
            meta: {
              params: {paging: paging, search: search, sort: sort},
              links: {self: sails.config.globals.baseHref + '/api/posts/page/' + paging.page}
            }
          };

          if (Object.keys(allPosts).length > paging.limit * paging.page) {
            list.meta.links.next = sails.config.globals.baseHref + '/api/posts/page/' + (paging.page + 1);
sails.log(paging.page);
            if (paging.page >= 2) {
              list.meta.links.prev = sails.config.globals.baseHref + '/api/posts/page/' + (paging.page - 1);
            }
          }

          res.send(200, list);
        });
    });
  },

  find: function (req, res) {
    var slug = req.param('slug');

    if (!slug) {
      slug = req.slug;
    }

    Post.find({slug: slug})
      .populate('tags')
      .populate('topic')
      .populate('attachments')
      .exec(function (error, post) {
        if (error) return res.serverError(error);
        res.send(post);
      });
  },

  create: function (req, res) {
    Post.create(req.allParams())
      .exec(function (error, created) {
        if (error) return res.serverError(error);
        req.slug = created.slug;
        sails.controllers.post.find(req, res);
      });
  },

  update: function (req, res) {
    var id = req.param('id');
    var updates = req.allParams();

    //return sails.log(req.params);

    Post.update({id: req.param('id')})
      .set(updates)
      .exec(function (error, updatedPost) {
        if (error) return res.serverError(error);
        req.slug = updatedPost.slug;
        sails.controllers.post.find(req, res);
      });
  }

};

