define([
  "marionette",
  "handlebars",
  "views/eventView",
  "text!templates/loadingEvents.html"
  ], function(Marionette, Handlebars, ItemView, LoadingEventsTemplate) {
    var LoadingEventsView = Marionette.ItemView.extend({
      template: Handlebars.compile(LoadingEventsTemplate)
    });

    var EventsView = Marionette.CollectionView.extend({
      itemView: ItemView,
      emptyView: LoadingEventsView,
      tagName: "ul",
    });

    return EventsView;
});