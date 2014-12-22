/**
 * Tag.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true,
      unique: true
    },
    slug: {
      type: 'string',
      unique: true
    },
    tagged: {
      collection: 'post',
      via: 'tags'
    }
  },

  beforeValidate: function (values, cb) {

    // Generate and sanitanize slug
    var getSlug = require('speakingurl');
    if (values.title) {
      values.slug = getSlug(values.title);
    }

    cb();

  }

};

