define([
  "config",
  "jquery",
  "backbone",
  "underscore",
  "models/event"
  ], function(Config, $, Backbone, _, Event) {
    var EventCollection = Backbone.Collection.extend({
      model: Event,

      sync: function(method, model, options) {
          var params = _.extend({
              type: 'GET',
              dataType: 'jsonp',
              url: Config.MeetupUrl,
              processData: false
          }, options);

          return $.ajax(params);
      },

      parse: function(response) {
        return _.first(response.results, 5);
      }
    });

    return EventCollection;
});