var path = window.location.host.indexOf('noobit') > -1 ? 'fairtradetown' : '';
//path = '/';

fallback.load({
      bootstrapcss: [
        '//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
        '/css/bootstrap.min.css'
      ],
      facss: [
        '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css',
        '/css/font-awesome.min.css'
      ],
      leafletcss: [
        '//cdn.leafletjs.com/leaflet-0.7.3/leaflet.css',
        '/css/leaflet.css'
      ],
      markerclustercss: [
        '//api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/MarkerCluster.css',
        '/css/MarkerCluster.css'
      ],
      markerccss: [
        path + "LeafletStyleSheet.css"
      ],
      markerdefaultcss: [
        '//api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/MarkerCluster.Default.css',
        '/css/MarkerCluster.Default.css'
      ],
      controlcss: [
        '//api.tiles.mapbox.com/mapbox.js/plugins/leaflet-locatecontrol/v0.24.0/L.Control.Locate.css',
        '/css/L.Control.Locate.css'
      ],
      loadingcss: [
        '/css/L.Control.Loading.css'
      ],
      appc: path + "css/app.css", 
      popup:  path + "css/popup.css",
      jQuery: [
          '//code.jquery.com/jquery-1.11.3.min.js',
          '//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js',
          '//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js',
          '/js/jquery-1.11.3.min.js'
      ],
      'jQuery.fn.modal': [
        '//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js',
        '/js/bootstrap.min.js'
      ],
      'L': [
        '//cdn.leafletjs.com/leaflet-0.7.3/leaflet.js',
        '/js/leaflet.js'
      ],
      'jQuery.fn.typeahead': [
        '//cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.10.5/typeahead.bundle.min.js',
        '/js/typeahead.bundle.min.js'
      ],
       'Handlebars': [
        '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0/handlebars.min.js',
        '/js/handlebars.min.js' 
      ],
       'List': [
        '//cdnjs.cloudflare.com/ajax/libs/list.js/1.1.1/list.min.js',
        '/js/list.min.js'
      ], 
      'L.Control.Loading': [
        '/js/L.Control.Loading.js'
      ], 
      'L.MarkerClusterGroup': [
        '//api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/leaflet.markercluster.js',
        '/js/leaflet.markercluster.js'
      ],
      'L.Control.Locate': [
        '//api.tiles.mapbox.com/mapbox.js/plugins/leaflet-locatecontrol/v0.24.0/L.Control.Locate.js',
        '/js/L.Control.Locate.js'
      ],
      'PruneCluster': [
        path + "js/PruneCluster.js"
      ],
      'jQuery.History.js': [
        path + "js/jquery.history.js"
      ],
      makimarkers: path + "js/leaflet.makimarkers.js",
      app: path + "js/app.js"  
  }, {
      deps: {},
      dependencies: {},
      shim: {
          'jQuery.fn.modal': ['jQuery'],
          'jQuery.History.js': ['jQuery'],
          'L': ['jQuery'],
          'jQuery.fn.typeahead': ['jQuery'],
          'List': ['jQuery'],
          'L.MarkerClusterGroup': ['L'],
          'PruneCluster': ['L'],
          'L.Control.Locate': ['L'],
          'L.Control.Loading': ['L'],
          makimarkers: ['L'],
          app: ['L.Control.Locate']
      },

      callback: function(success, failed) {
          // success - object containing all libraries that loaded successfully.
          // failed - object containing all libraries that failed to load.

          // All of my libraries have finished loading!

          // Execute my code that applies to all of my libraries here!
      }
  });

  fallback.ready(['jQuery'], function() {
      // jQuery Finished Loading

      // Execute my jQuery dependent code here!
  });

  fallback.ready(['jQuery', 'JSON'], function() {
      // jQuery and JSON Finished Loading

      // Execute my jQuery + JSON dependent code here!
  });

  fallback.ready(function() {
      // All of my libraries have finished loading!



  });
