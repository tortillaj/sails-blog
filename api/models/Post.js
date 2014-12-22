/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    slug: {
      type: 'string'
    },
    body: {
      type: 'text',
      required: true
    },
    tags: {
      collection: 'tag',
      via: 'tagged',
      dominant: true
    },
    topic: {
      model: 'category'
    },
    status: {
      type: 'string',
      in : ['published', 'draft']
    },
    attachments: {
      model: 'media',
      via: 'attached',
      dominant: true
    }
  },

  beforeValidate: function(values, cb) {

    // Set the status if it wasn't sent
    if (!values.status) {
      values.status = 'draft';
    }

    // Generate and sanitanize slug
    var getSlug = require('speakingurl');
    if (values.title) {
      values.slug = getSlug(values.title);
    }

    cb();

  }

};

