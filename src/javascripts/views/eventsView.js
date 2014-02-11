define([
  "marionette",
  "views/eventView"
  ], function(Marionette, ItemView) {
    var EventsView = Marionette.CollectionView.extend({
      itemView: ItemView,    
      tagName: "ul"
    });

    return EventsView;
});