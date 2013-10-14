define([
  "marionette",
  "handlebars",
  "views/videoView",
  "text!templates/loadingVideos.html"
  ], function(Marionette, Handlebars, ItemView, LoadingVideosTemplate) {
    var LoadingVideosView = Marionette.ItemView.extend({
      template: Handlebars.compile(LoadingVideosTemplate)
    });

    var VideosView = Marionette.CollectionView.extend({
      itemView: ItemView,
      emptyView: LoadingVideosView,
      tagName: "ul"
    });

    return VideosView;
});