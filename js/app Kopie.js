/* PLZ: http://fbinter.stadt-berlin.de/fb/wfs/geometry/senstadt/re_postleit?REQUEST=GetCapabilities&SERVICE=WFS&VERSION=1.1.0 */

var map, featureList, markerSearch = [], ortsteileSearch = [], bezirkeSearch = [], plzSearch = [];

jQuery(document).on("click", ".feature-row", function(e) {
  jQuery(document).off("mouseout", ".feature-row", clearHighlight);
  sidebarClick(parseInt(jQuery(this).attr("id"), 10));
});

jQuery(document).on("mouseover", ".feature-row", function(e) {
  highlight.clearLayers().addLayer(L.circleMarker([jQuery(this).attr("lat"), jQuery(this).attr("lng")], highlightStyle));
});

jQuery(document).on("mouseout", ".feature-row", clearHighlight);

jQuery("#about-btn").click(function() {
  jQuery("#aboutModal").modal("show");
  jQuery(".navbar-collapse.in").collapse("hide");
  return false;
});

jQuery("#full-extent-btn").click(function() {
  map.fitBounds(marker.getBounds());
  jQuery(".navbar-collapse.in").collapse("hide");
  return false;
});

jQuery("#legend-btn").click(function() {
  jQuery("#legendModal").modal("show");
  jQuery(".navbar-collapse.in").collapse("hide");
  return false;
});

jQuery("#login-btn").click(function() {
  jQuery("#loginModal").modal("show");
  jQuery(".navbar-collapse.in").collapse("hide");
  return false;
});

jQuery("#list-btn").click(function() {
  jQuery('#sidebar').toggle();
  map.invalidateSize();
  return false;
});

jQuery("#nav-btn").click(function() {
  jQuery(".navbar-collapse").collapse("toggle");
  return false;
});

jQuery("#sidebar-toggle-btn").click(function() {
  jQuery("#sidebar").toggle();
  map.invalidateSize();
  return false;
});

jQuery("#sidebar-hide-btn").click(function() {
  jQuery('#sidebar').hide();
  map.invalidateSize();
});

function clearHighlight() {
  highlight.clearLayers();
}

function sidebarClick(id) {
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  
  if (document.body.clientWidth <= 767) {
    jQuery("#sidebar").hide();
    map.invalidateSize();
  }
}

function syncSidebar() {
  /* Empty sidebar features */
  jQuery("#feature-list tbody").empty();
  /* Loop through layer and add only features which are in the map bounds */
  ortsteile.eachLayer(function (layer) {
    if (map.hasLayer(ortsteileLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        jQuery("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.BEZIRK + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  /* Loop through museums layer and add only features which are in the map bounds */
  marker.eachLayer(function (layer) {
    if (map.hasLayer(markerLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        jQuery("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.name + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  /* Update list.js featureList */
  /*featureList = new List("features", {
    valueNames: ["feature-name"]
  });
  featureList.sort("feature-name", {
    order: "asc"
  });*/
}


/* Basemap Layers */
var berlinAttribution = '"Geoportal Berlin / Orteile von Berlin".';

var baseTile = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
   attribution: 'Tiles by <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
   detectRetina: true
});
var blackwhiteTile = L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
   attribution: 'Tiles by <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
   detectRetina: true
}); 
var bmapTile = L.tileLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
   attribution: 'Tiles by <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
   detectRetina: true
}); 
var mapquestTile = L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg', {
   attribution: 'Tiles by <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
   detectRetina: true
}); 
var mapboxTile = L.tileLayer(
  'http://{s}.tiles.mapbox.com/v3/medardus.ki1enpim/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> Contributors',
  detectRetina: true,
  maxZoom: 18
}); 
var positronTile = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>', 
  detectRetina: true
}); 
var retina = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png';



var marker = L.featureGroup;

var categories = {
  'Einzelhandel' : {desc: "Einzelhandel", icon: "shop", color: "660022"},
  'Supermarkt' : {desc: "Supermärkte", icon: "grocery", color: "339900"},
  'Gastronomie/Kette' : {desc: "Gastronomie / Kette", icon: "cafe", color: "40dd28"},
  'Gastronomie/einzeln' : {desc: "Gastronomie / einzeln", icon: "cross", color: "115544"},
  'nicht kategorisiert' : {desc: "nicht kategorisiert", icon: "square", color: "dddddd", opacity: 0.8}
};

var setupIcons = function() {
  var icons = {};
  for (var cat in categories) {
    var icon = new L.MakiMarkers.icon({
      icon: categories[cat].icon, 
      color: '#' + categories[cat].color, 
      size: "m"
    });

    icons[cat] = icon;
    }
    return icons;
  };

// Layer control, setting up 1 layer per category
var layers = {},
    cultureLayer = L.layerGroup();


/* Overlay Layers */
var highlight = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "#00FFFF",
  fillOpacity: 0.7,
  radius: 10
};

var markerLayer = L.geoJson(null);

function displayFeatures(features, layers, icons) {
  var popup = L.DomUtil.create('div', 'tiny-popup', map.getContainer());
  for (var id in features) {
    var feat = features[id];
    var cat = feat.properties.kategorie1 ? feat.properties.kategorie1 : 'nicht kategorisiert';
    var layer = layers[cat];
    var cati = categories[cat];
    marker = L.geoJson(feat, {
      pointToLayer: function(feature, latLng) {         
        var icon = icons[cat]; 
        var marker = L.marker(latLng, {
          icon: icon,
          keyboard: false,
          riseOnHover: true,
          opacity: categories[cat].opacity ? categories[cat].opacity : 1
        });
        if (! L.touch) {
          marker.on('mouseover', function(e) {
            var nom = e.target.feature.properties.name;
            var pos = map.latLngToContainerPoint(e.latlng);
            popup.innerHTML = nom;
            L.DomUtil.setPosition(popup, pos);
            L.DomUtil.addClass(popup, 'visible');

          }).on('mouseout', function(e) {
              L.DomUtil.removeClass(popup, 'visible');
          });
        }
        return marker;
      },
      onEachFeature: bindePopup
    });
    if (layer !== undefined) {
      layer.addLayer(marker);
      markerSearch.push({
        name: feat.properties.name,
        address: feat.properties.strasse,

        icon: "https://api.tiles.mapbox.com/v3/marker/pin-s-" + cati.icon + "+" + cati.color + ".png",
        source: "Marker",
        id: L.stamp(layer),
        lat: feat.geometry.coordinates[1],
        lng: feat.geometry.coordinates[0]
      });
    }  
  }
  map.fitBounds(layer.getBounds());
  return layers;
}
 

function bindePopup(feature, layer) {
  /* feature.layer = layer; */   
  

  var props = feature.properties;

  if (props) {
    var desc = '<span id="feature-popup">';
    desc += "<h2>" + props.name + "</h2>";
    desc += (props.beschreibung ? "<p>" + props.beschreibung + "</p>" : "");
    desc += "<div id='address'>",
    desc +=     "<i class='fa fa-map-marker fa-fw'></i>&nbsp;" + props.strasse + "<br />";
    desc +=     "<i class='fa fa-fw'></i>&nbsp;" + props.plz + " " + props.ort + "";
    desc += "</div>";
    desc += "<p>";
    desc += "<div id='contact'>";
    desc +=   (props.telefon1   ? "<i class='fa fa-phone fa-fw'></i>&nbsp;" + props.telefon1 + "<br />" : "");
    desc +=   (props.telefax    ? "<i class='fa fa-fax fa-fw'></i>&nbsp;" + props.telefax + "<br />" : "" );
    desc +=   (props.email      ? "<i class='fa fa-envelope-o fa-fw'></i>&nbsp;<a href='mailto:" + props.email + "'>" + props.email + "</a><br />" : "" );
    desc +=   (props.homepage   ? "<i class='fa fa-external-link fa-fw'></i>&nbsp;<a href='http://" + props.homepage + "' target=_blank>" + props.homepage + "</a><br />" : "" );
    desc +=   (props.kategorie1 ? "<i class='fa fa-th-list fa-fw'></i>&nbsp;" + props.kategorie1 : "" ); 
    desc +=   (props.kategorie2 ? "&nbsp;/&nbsp;" + props.kategorie2 : "");
    desc += "</div>"
    desc += "<div id='oeffnungszeiten'>";
    desc +=   (props.oeffnungszeiten ? "<i class='fa fa-sign-in fa-fw'></i>&nbsp;" + props.oeffnungszeiten : "" );
    desc += "</div>";
    desc += (props.logo ? "<img src='/images/logos/" + props.logo + "' alt='logo' />" : "" );
    desc += "<div id='socialweb'>";
    desc +=   "<i class='fa fa-fw'></i>";
    desc +=   (props.facebook ? "<a href='http://" + props.facebook + "' target=_blank><span class='fa-stack fa-lg'><i class='fa fa-square-o fa-stack-2x'></i><i class='fa fa-facebook fa-stack-1x'></i></span></a>" : "");
    desc +=   (props.google   ? "<a href='http://" + props.google   + "' target=_blank><span class='fa-stack fa-lg'><i class='fa fa-square-o fa-stack-2x'></i><i class='fa fa-google-plus fa-stack-1x'></i></span></a>" : "");
    desc +=   (props.twitter  ? "<a href='http://" + props.twitter  + "' target=_blank><span class='fa-stack fa-lg'><i class='fa fa-square-o fa-stack-2x'></i><i class='fa fa-twitter fa-stack-1x'></i></span></a>" : "");
    desc += "</div>";
    desc += "</span>";

    layer.bindPopup(desc, {
      minWidth: 250,
      maxWidth: 400
     // class: 
    });
  } 

}
jQuery.getJSON("/data/marker.geojson", function (data) {
  //marker.addData(data);
  displayFeatures(data.features, layers, icons);
});


// ORTSTEILE:
var ortsteileLayer = L.geoJson(null);
var ortsteile = L.geoJson(null, {
  /*style: function (feature) {
    if (feature.properties.route_id === "1" || feature.properties.route_id === "2" || feature.properties.route_id === "3") {
      return {
        color: "#ff3135",
        weight: 3,
        opacity: .5
      };
    }
  },*/
  onEachFeature: function (feature, layer) {
    ortsteileSearch.push({
        name: feature.properties.OTEIL, 
        source: "Ortsteil",
        id: L.stamp(layer),
        bounds: layer.getBounds()
      });
    /*if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Division</th><td>" + feature.properties.Division + "</td></tr>" + "<tr><th>Line</th><td>" + feature.properties.Line + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          jQuery("#feature-title").html(feature.properties.Line);
          jQuery("#feature-info").html(content);
          jQuery("#featureModal").modal("show");

        }
      });
    }*/
    layer.setStyle({
      color: "#2262CC",
      weight: 3,
      opacity: 0.6,
      fillOpacity: 0.1,
      fillColor: "#2262CC",
      dashArray: "2 4"
    });

    (function(layer, properties) {
      layer.on("mouseover", function (e) {
        layer.setStyle({
          color: '#2262CC', 
          weight: 4,
          opacity: 0.6,
          fillOpacity: 0.65,
          fillColor: '#2262CC'
        });
        var popup = jQuery("<div></div>", {
          id: "popup-" + properties.OTEIL,
          css: {
            position: "absolute",
            bottom: "85px",
            left: "50px",
            zIndex: 1002,
            backgroundColor: "white",
            padding: "8px",
            border: "1px solid #ccc"
          }
        });
        var hed = jQuery("<div></div>", {
            text: "Bezirk / Ortsteil: " + properties.BEZIRK + " / " + properties.OTEIL,
            css: { fontSize: "16px", marginBottom: "3px" }
        }).appendTo(popup);
        popup.appendTo("#map");
      });
      layer.on("mouseout", function (e) {
        layer.setStyle({
          color: "#2262CC",
          weight: 3,
          opacity: 0.6,
          fillOpacity: 0.1,
          fillColor: "#2262CC"
        }); 
        jQuery("#popup-" + properties.OTEIL).remove();
      });
    })(layer, feature.properties);
  
  }
});
jQuery.getJSON("/data/ortsteile.geojson", function (data) {
  ortsteile.addData(data);
});

// BEZIRKE:
var bezirkeLayer = L.geoJson(null);
var bezirke = L.geoJson(null, {
  /*style: function (feature) {
    if (feature.properties.route_id === "1" || feature.properties.route_id === "2" || feature.properties.route_id === "3") {
      return {
        color: "#ff3135",
        weight: 3,
        opacity: .5
      };
    }
  },*/
  onEachFeature: function (feature, layer) {
    bezirkeSearch.push({
      name: feature.properties.spatial_alias, //layer.features....
      source: "Bezirk",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
    layer.setStyle({
      color: "#225522",
      weight: 4,
      opacity: 0.6,
      fillOpacity: 0.3,
      fillColor: "#226434"
    });
    (function(layer, properties) {
      layer.on("mouseover", function (e) {
        layer.setStyle({
          color: '#225522', 
          weight: 5,
          opacity: 0.6,
          fillOpacity: 0.65,
          fillColor: '#226434'
        });        
      });
      layer.on("mouseout", function (e) {
        layer.setStyle({
          color: "#225522",
          weight: 4,
          opacity: 0.6,
          fillOpacity: 0.3,
          fillColor: "#226434"
        }); 
        jQuery("#popup-" + properties.OTEIL).remove();
      });
    })(layer, feature.properties);
  }
});
jQuery.getJSON("/data/bezirke.geojson", function (data) {
  bezirke.addData(data);
});

// PLZ:
var plzLayer = L.geoJson(null);
var plz = L.geoJson(null, {
  /*style: function (feature) {
    if (feature.properties.route_id === "1" || feature.properties.route_id === "2" || feature.properties.route_id === "3") {
      return {
        color: "#ff3135",
        weight: 3,
        opacity: .5
      };
    }
  },*/
  onEachFeature: function (feature, layer) {
    plzSearch.push({
        name: feature.properties.spatial_alias, 
        source: "PLZ",
        id: L.stamp(layer),
        bounds: layer.getBounds()
      });
    /*if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Division</th><td>" + feature.properties.Division + "</td></tr>" + "<tr><th>Line</th><td>" + feature.properties.Line + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          jQuery("#feature-title").html(feature.properties.Line);
          jQuery("#feature-info").html(content);
          jQuery("#featureModal").modal("show");

        }
      });
    }*/
    layer.setStyle({
      color: "#555500",
      weight: 1,
      opacity: 0.4,
      fillOpacity: 0.1,
      fillColor: "#cd6635",
      dashArray: "5 2 3 2"
    });

    (function(layer, properties) {
      layer.on("mouseover", function (e) {
        layer.setStyle({
          color: '#555500', 
          weight: 2,
          opacity: 0.5,
          fillOpacity: 0.65,
          fillColor: '#cd6635'
        });
        /*var hed = jQuery("<div></div>", {
            text: "Bezirk / Ortsteil / PLZ: " + properties.BEZIRK + " / " + properties.OTEIL + " / ",
            css: { fontSize: "16px", marginBottom: "3px" }
        }).appendTo(popup);
        popup.appendTo("#map");*/
      });
      layer.on("mouseout", function (e) {
        layer.setStyle({
          color: "#555500",
          weight: 1,
          opacity: 0.4,
          fillOpacity: 0.1,
          fillColor: "#cd6635"
        }); 
        //jQuery("#popup-" + properties.OTEIL).remove();
      });
    })(layer, feature.properties);
  
  }
});
jQuery.getJSON("/data/plz.geojson", function (data) {
  plz.addData(data);
});

/* Single marker cluster layer to hold all clusters */
 var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 16
}); 

map = L.map("map", {
  layers: [positronTile, markerClusters],
  attributionControl: true
});

/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function(e) {
  if (e.layer === markerLayer) {
    console.log('markerlayer');
    markerClusters.addLayer(marker);
    syncSidebar();
  }
 /* if (e.layer === museumLayer) {
    markerClusters.addLayer(museums);
    syncSidebar();
  }*/
});

map.on("overlayremove", function(e) {
  if (e.layer === markerLayer) {
    markerClusters.removeLayer(marker);
    syncSidebar();
  }
  /*if (e.layer === museumLayer) {
    markerClusters.removeLayer(museums);
    syncSidebar();
  }*/
});

/* Filter sidebar feature list to only show features in current map bounds */
map.on("moveend", function (e) {
  syncSidebar();
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
  highlight.clearLayers();
});

/* Attribution control */
/*function updateAttribution(e) {
  jQuery.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      jQuery("#attribution").html((layer.getAttribution()));
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<a href='#' onclick='jQuery(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
  return div;
};
map.addControl(attributionControl);
*/

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "topleft",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "icon-direction",
  metric: false,
  strings: {
    title: "Mein Standort",
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true; 
} else {
  var isCollapsed = false;
  jQuery("#sidebar").hide();
  map.invalidateSize();
}

var layerControl = L.control.layers(null, null, {
  collapsed: isCollapsed
});

for (var icat in categories) {
  var layer = L.featureGroup();
  layers[icat] = layer;
  cultureLayer.addLayer(layer);
 
  var cat = categories[icat];
      ico = "https://api.tiles.mapbox.com/v3/marker/pin-s-" + cat.icon + "+" + cat.color + "@2x.png";
     desc = "<img class='layer-control-img' src='" + ico + "' />"  +  cat.desc;
    layerControl.addOverlay(layer, desc);
  }
  cultureLayer.addTo(map);

  // Add Base Tiles
  layerControl.addBaseLayer(baseTile, 'Normal OSM');
  layerControl.addBaseLayer(blackwhiteTile, 'Schwarz / Weiß');
  layerControl.addBaseLayer(bmapTile, 'BMap');
  layerControl.addBaseLayer(mapquestTile, 'Mapquest OSM');
  layerControl.addBaseLayer(positronTile, 'Positron (Mein Favorit)');
  layerControl.addBaseLayer(mapboxTile, 'Mapbox (50.000 / Month)');


  // Add Choices
  layerControl.addOverlay(bezirke, 'Bezirke (WFS)');
  layerControl.addOverlay(ortsteile, 'Ortsteile (WFS)');
  layerControl.addOverlay(plz, 'PLZ (WFS)');


  layerControl.addTo(map);
  var icons = setupIcons();

  /* Highlight search box text on click */
  jQuery("#searchbox").click(function () {
    jQuery(this).select();
  });

  /* Prevent hitting enter from refreshing the page */
  jQuery("#searchbox").keypress(function (e) {
    if (e.which == 13) {
      e.preventDefault();
    }
  });

  jQuery("#featureModal").on("hidden.bs.modal", function (e) {
    jQuery(document).on("mouseout", ".feature-row", clearHighlight);
  });

/* Typeahead search functionality */
jQuery(document).one("ajaxStop", function () {
  jQuery("#loading").hide();
  /* Fit map to Marker bounds */
  //map.fitBounds(marker.getBounds());
  featureList = new List("features", {valueNames: ["feature-name"]});
  //featureList.sort("feature-name", {order:"asc"});

  var markerBH = new Bloodhound({
    name: "Marker",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: markerSearch,
    limit: 20
  });

  var ortsteileBH = new Bloodhound({
    name: "Ortsteile",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: ortsteileSearch,
    limit: 5
  });
  var bezirkeBH = new Bloodhound({
    name: "Bezirke",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: bezirkeSearch,
    limit: 5
  });
  var plzBH = new Bloodhound({
    name: "PLZ",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: plzSearch,
    limit: 50
  });
  var geonamesBH = new Bloodhound({
    name: "GeoNames",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
     url: "http://nominatim.openstreetmap.org/search?format=json&polygon_geojson=1&limit=5&countrycodes=de&q=Berlin, %QUERY",
      filter: function (data) {
        return jQuery.map(data, function (result) {
          return {  
            name: result.display_name,
            lat: result.lat,
            lng: result.lon,
            source: "GeoNames"
          };
        });
      },
      ajax: {
        beforeSend: function (jqXhr, settings) {
          settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
          jQuery("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          jQuery('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
        }
      }
    },
    limit: 10
  });
  markerBH.initialize();
  ortsteileBH.initialize();
  bezirkeBH.initialize();
  plzBH.initialize();

  geonamesBH.initialize();

  /* instantiate the typeahead UI */
  jQuery("#searchbox").typeahead({
    minLength: 1,
    highlight: true,
    hint: true
  }, {
    name: "Marker",
    displayKey: "name",
    source: markerBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><i class='fa fa-map-marker fa-fw'></i>Marker</h4>",
      suggestion: Handlebars.compile(["<div class='icon'><img src='{{icon}}' /></div><div class='suggest'>{{name}}<br /><small>{{address}}</small></div>"].join(""))
    }
  }, {
    name: "Bezirke",
    displayKey: "name",
    source: bezirkeBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><i class='fa fa-round fa-fw'></i>Bezirke</h4>",
      suggestion: Handlebars.compile(["<div class='icon'><i class='fa fa-square fa-fw'></i></div><div class='suggest'></div>{{name}}<br>&nbsp;<small>{{address}}</small></div>"].join(""))
    }
  }, {
    name: "Ortsteile",
    displayKey: "name",
    source: ortsteileBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><i class='fa fa-square fa-fw'></i>Ortsteile</h4>",
      suggestion: Handlebars.compile(["<div class='icon'><i class='fa fa-square fa-fw'></i></div><div class='suggest'></div>{{name}}<br>&nbsp;<small>{{address}}</small></div>"].join(""))
    }
  }, {
    name: "PLZ",
    displayKey: "name",
    source: plzBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><i class='fa fa-round fa-fw'></i>PLZ</h4>",
      suggestion: Handlebars.compile(["<div class='icon'><i class='fa fa-square fa-fw'></i></div><div class='suggest'></div>{{name}}<br>&nbsp;<small>{{address}}</small></div>"].join(""))
    }
  }, {
    name: "GeoNames",
    displayKey: "name",
    source: geonamesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><i class='fa fa-globe fa-fw'></i>Freie Suche</h4>"
    }
  }).on("typeahead:selected", function (obj, datum) {
    if (datum.source === "Bezirk" || datum.source === "Ortsteil" || datum.source === "PLZ") {
      map.fitBounds(datum.bounds);
    }
    if (datum.source === "Marker") {
      if (!map.hasLayer(markerLayer)) {
        map.addLayer(markerLayer);
      }
      map.setView([datum.lat, datum.lng], 16);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
        //datum.openPopup();
      }
    }
    if (datum.source === "GeoNames") {
      map.setView([datum.lat, datum.lng], 14);
    }
    if (jQuery(".navbar-collapse").height() > 50) {
      jQuery(".navbar-collapse").collapse("hide");
    }
  }).on("typeahead:opened", function () {
    jQuery(".navbar-collapse.in").css("max-height", jQuery(document).height() - jQuery(".navbar-header").height());
    jQuery(".navbar-collapse.in").css("height", jQuery(document).height() - jQuery(".navbar-header").height());
  }).on("typeahead:closed", function () {
    jQuery(".navbar-collapse.in").css("max-height", "");
    jQuery(".navbar-collapse.in").css("height", "");
  });
  jQuery(".twitter-typeahead").css("position", "static");
  jQuery(".twitter-typeahead").css("display", "block");
});
