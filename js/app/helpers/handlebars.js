define([
  'handlebars',
  'moment'
  ], function(Handlebars, Moment) {
    Handlebars.registerHelper('formatDate', function(datetime, format) {
      var date = Moment(datetime);
      return date.format(format);
    });
});