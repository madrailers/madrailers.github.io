define([
  "handlebars",
  "marionette",
  "text!templates/video.html"
  ], function(Handlebars, Marionette, Template) {
    var VideoView = Marionette.ItemView.extend({
      template: Handlebars.compile(Template),
      tagName: "li",
      className: "video"
    });

    return VideoView;
});