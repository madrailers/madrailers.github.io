requirejs.config({
  baseUrl: "js",

  paths: {
    jquery: "lib/jquery",
    backbone: "lib/backbone",
    underscore: "lib/underscore",
    json: "lib/json2",
    text: "lib/text",
    marionette: "lib/backbone.marionette",
    handlebars: "lib/handlebars",
    moment: "lib/moment-with-langs.min",
    config: "app/config",
    layouts: "app/layouts",
    views: "app/views",
    templates: "app/templates",
    collections: "app/collections",
    models: "app/models"
  },

  shim: {
    jquery : {
      exports : 'jQuery'
    },
    underscore : {
      exports : '_'
    },
    backbone : {
      deps : ['jquery', 'underscore'],
      exports : 'Backbone'
    },
    marionette : {
      deps : ['jquery', 'underscore', 'backbone'],
      exports : 'Marionette'
    },
    handlebars: {
      exports: 'Handlebars'
    }
  }
});

requirejs([
  'backbone',
  'marionette',
  "layouts/mainLayout",
  "views/videosView",
  "views/eventsView",
  "collections/videos",
  "collections/events",
  "app/helpers/handlebars"
  ], function(Backbone, Marionette, MainLayout, VideosView, EventsView, VideosCollection, EventsCollection) {
    var app = new Marionette.Application();

    app.addInitializer(function(options) {
      var layout = new MainLayout();
      layout.render();

      var videos = new VideosCollection();
      videos.fetch();
      layout.videos.show(new VideosView({
        collection: videos
      }));

      var events = new EventsCollection();
      events.fetch();
      layout.events.show(new EventsView({
        collection: events
      }));
    });

    app.on("initialize:after", function(options){
      if (Backbone.history){
        Backbone.history.start();
      }
    });

    var options = {};
    app.start(options);
});



