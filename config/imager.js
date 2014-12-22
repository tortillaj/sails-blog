module.exports.imager = {
  variants: {
    items: {
      // keepNames: true,
      resize: {
        mini: "300x200",
        preview: "800x600"
      },
      crop: {
        thumb: "200x200",
        // Sets the crop position, or "gravity". Default is NorthWest.
        // See http://www.graphicsmagick.org/GraphicsMagick.html#details-gravity for details
        thumb_center: "200x200 Center"
      },
      resizeAndCrop: {
        large: {resize: "1000x1000", crop: "900x900"}
      },
      thumbnail: {
        // "Cuts the thumbnail to fit"
        // See http://superuser.com/questions/275476/square-thumbnails-with-imagemagick-convert
        better_thumb_center: "100x100 Center"
      }
    }
  },

  storage: {
    Local: {
      path: "./assets/images/"
    },
    S3: {
      key: 'XXXXXXXXXX',
      secret: 'XXXXXXXXXX',
      bucket: 'XXXXXXXXXX',
      storageClass: 'REDUCED_REDUNDANCY'
    }
  },

  debug: false
};
