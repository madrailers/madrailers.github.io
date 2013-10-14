define([
  "handlebars",
  "marionette",
  "text!templates/event.html"
  ], function(Handlebars, Marionette, Template) {
    var EventView = Marionette.ItemView.extend({
      template: Handlebars.compile(Template),
      tagName: "li",
      className: "event"
    });

    return EventView;
});