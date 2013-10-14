define([
  "config",
  "backbone",
  "models/video"
  ], function(Config, Backbone, Video) {
    var VideoCollection = Backbone.Collection.extend({
      model: Video,
      url: Config.YouTubeUrl,

      parse: function(response) {
        return response.data.items;
      }
    });

    return VideoCollection;
});