define([
  'handlebars',
  'marionette',
  'text!templates/layout.html'
  ], function(Handlebars, Marionette, Template) {
    var MainLayout = Marionette.Layout.extend({
      el: "#mainLayout",
      template: Handlebars.compile(Template),

      regions: {
        videos: "#videos",
        events: "#events"
      }
    });

    return MainLayout;
});