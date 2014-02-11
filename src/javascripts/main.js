requirejs([
  'backbone',
  "views/videosView",
  "views/eventsView",
  "collections/videos",
  "collections/events",
  "helpers/handlebars"
  ], function(Backbone, VideosView, EventsView, VideosCollection, EventsCollection) {
    if($("#videos").length) {
      var videos = new VideosCollection();
      videos.fetch({
        success: function() {
          var videosView = new VideosView({collection: videos});
          $("#videos").html(videosView.render().el);
        }
      });
    }

    if($("#events").length) {
      var events = new EventsCollection();
      events.fetch({
        success: function() {
          var eventsView = new EventsView({collection: events});
          $("#events").html(eventsView.render().el);
        }
      });
    }
});