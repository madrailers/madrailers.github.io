# madrailers.github.io / madrailers.com

Thanks for having a look at the code behind the [MadRailers.com](http://madrailers.com) home page! As we mentioned on the site, we're looking to **crowdsource** both the **design** and **implementation** of the single-page site devoted to linking members to our various news and content sources.

## guidelines
We have a few guidelines we'd like you to work within; based around our goals for the site.

* Include prominent links to our [meetup site](http://meetup.com/Mad-Railers), [twitter account](http://twitter.com/madrailers), [github organization](https://github.com/madrailers) and [youtube channel](http://www.youtube.com/channel/UCpxYqZzpZNIA98Ps6hKJuUw)
* Include embedded versions of the latest 2-5 youtube videos from the channel. The [YouTube JSON/Javascript API may be found here](https://developers.google.com/youtube/2.0/developers_guide_json).
* Include links and descriptions to the next two upcoming Meetup events. The [Meetup.com JSON API may be found here](http://www.meetup.com/meetup_api/).
* Include the latest Tweets mentioning '@madrailers'. Information about Twitter's custom embedded timelines [may be found here](https://dev.twitter.com/docs/embedded-timelines).
* Ensure that madrailers.com can continue to be served via Github Pages.

Any single pull request **need not** include all of these enhancements; the only thing we ask is not to remove any that have already been implemented by someone else.

We've included empty css, img, and js directories. Please place any assets there.

## getting started
First clone the repo.

```bash
$ git clone https://github.com/madrailers/madrailers.github.io.git
```

If you have [Python](http://www.python.org/) installed, you can run a simple web server from the current directory with the following command:

```bash
$ cd madrailers.github.io
madrailers.github.io $ python -m SimpleHTTPServer
Serving HTTP on 0.0.0.0 port 8000 ...

```
Then simply open your browser to [http://localhost:8000/](http://localhost:8000/) and you can see the site. Edit `index.html`, add css, javascript, and images, and make it look great!

## the gear
We're leaning on a few pieces of technology in order to wrangle the combined might of all of our social media outlets (YouTube, Twitter, Meetup, etc.) onto the single page without using a backend.

<table>
  <thead>
    <th>Library/Framework</th>
    <th>Usage</th>
  </thead>
  <tbody>
    <tr>
      <td><a href="http://requirejs.org/">require.js</a></td>
      <td>Used to define javascript modules and manage dependencies between them. Also provides just-in-time retrieval of scripts and templates instead of pre-loading all of the script source on page load.</td>
    </tr>
    <tr>
      <td><a href="http://marionettejs.com/">Marionette.js</a></td>
      <td>A framework built on top of the <a href="http://backbonejs.org/">backbone.js</a> library that provides support for complex view lifecycle management and application management. Backbone.js is, in turn, built on <a href="http://underscorejs.org">underscore.js</a> and <a href="http://jquery.com">jQuery</a>.</td>
    </tr>
    <tr>
      <td><a href="http://handlebarsjs.com">Handlebars.js</a></td>
      <td>Logicless template library.</td>
    </tr>
    <tr>
      <td><a href="http://momentjs.com/">moment.js</a></td>
      <td>Library that makes date/time handling and formatting very easy.</td>
    </tr>
  </tbody>
</table>

## extending the site
Below are a few guidelines to get you started on working in the code:

* All third-party libraries and frameworks are located under `js/lib`
* The app is bootstrapped and started from `js/app/application.js`. It's where the main layout (see below) is created and added to the app.
* The main HTML structure of the page is contained in `js/app/templates/layout.html` and managed by the code in `js/app/layouts/mainLayout.js`
* The logic required to fetch individual endpoints is located in the `Collection` modules located under `js/app/collections`
* All Handlebars templates are located under `js/app/templates`
* Handlebars helpers are defined in `js/app/helpers/handlebars.js`
* All view modules are located under `js/app/views`
* Endpoint URLs for other APIs are located in `js/app/config.js`

The site uses [require.js](http://requirejs.org/) to manage the dependencies of the other modules. The only .js file that's pulled in
on page load is `js/app/application.js`, which subsequently pulls in the modules and libraries it needs to run.

The `requirejs.config({...})` call sets up the path shortcuts for the rest of the modules in the application and shims any third-party
libraries that don't export AMD modules by default.

```javascript
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
```

Those path shortcuts allow you to refer to paths more concisely in your modules. For example, you can define a module thusly...

```javascript
define([
  'handlebars',
  'marionette',
  'text!templates/foo.html'
  ], function(Handlebars, Marionette, Template) {
    var FooView = Marionette.ItemView.extend({
      template: Handlebars.compile(Template)
    });
    return FooView;
});
```

...which would be the same as defining it as the following if the paths had not been set in `js/app/application.js`...

```javascript
define([
  'lib/handlebars',
  'lib/marionette',
  'text!app/templates/foo.html'
  ], function(Handlebars, Marionette, Template) {
    var FooView = Marionette.ItemView.extend({
      template: Handlebars.compile(Template)
    });
    return FooView;
});
```

## faqs

**Q: What is the /meetup-slides directory?**<br/>
A: That is the source of the brief slides we show at the beginning and end of every MadRailers Meetup. We ask you not to submit pull requests against this content.

## thank you thank you thank you!
Many thanks to [everyone that's contributed](https://github.com/madrailers/madrailers.github.io/graphs/contributors) to this site! We really appreciate you pitching in to improve MadRailers' home on the web.
