define([
  "marionette",
  "views/videoView"
  ], function(Marionette, ItemView) {
    var VideosView = Marionette.CollectionView.extend({
      itemView: ItemView,
      tagName: "ul"
    });

    return VideosView;
});