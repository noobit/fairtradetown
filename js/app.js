/* PLZ: http://fbinter.stadt-berlin.de/fb/wfs/geometry/senstadt/re_postleit?REQUEST=GetCapabilities&SERVICE=WFS&VERSION=1.1.0 */
var path = window.location.host.indexOf('noobit') > -1 ? '/fairtradetown' : '';
var color1 = 'fff';
var map, featureList, markerSearch = [], ortsteileSearch = [], bezirkeSearch = [], plzSearch = [];

jQuery(document).ready(function($) {
    var siteUrl = 'http://'+(document.location.hostname||document.location.host)+'path';

    // Make sure that all clicked links that link to your internal website
    // don't just reload the page but execute a History.pushState call
    $(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click", function(e) {
        jQuery("#main").show(); //animate({left: 'show'});
        // jQuery("#map").addClass("col-lg-6");
        // jQuery("#map").removeClass("col-lg-10");
        jQuery("#search").removeClass("col-lg-offset-2 col-md-offset-3").addClass("col-lg-offset-6 col-md-offset-8");
        //jQuery("#search").addClass("col-lg-offset-6 col-md-offset-8");

        e.preventDefault();
        
        History.pushState({}, "", this.pathname);
    });

    // Catch all History stateChange events
    History.Adapter.bind(window, 'statechange', function(){
        var State = History.getState();

        // Load the new state's URL via an Ajax Call
        $.get(State.url, function(data){
            // Replace the "<title>" tag's content
            document.title = $(data).find("title").text();

            // Replace the content of the main container (.content)
            // If you're using another div, you should change the selector
            $('#main').html($(data).find('.content'));

            // If you're using Google analytics, make sure the pageview is registered!
            // ga('send', 'pageview', {
            //     'page': State.url,
            //     'title': document.title
            // });
        });
    });
});



jQuery(document).on("click", ".feature-row", function(e) {
  jQuery(document).off("mouseout", ".feature-row", clearHighlight);
  sidebarClick(parseInt(jQuery(this).attr("id"), 10));
});

jQuery(document).on("mouseover", ".feature-row", function(e) {
  highlight.clearLayers().addLayer(L.circleMarker([jQuery(this).attr("lat"), jQuery(this).attr("lng")], highlightStyle));
});

jQuery(document).on("click", ".fa-times-circle", function(e) {
  jQuery("#main").hide(); //collapse("toggle");
  // jQuery("#map").addClass("col-lg-10");
  // jQuery("#map").removeClass("col-lg-6");
  jQuery("#search").addClass("col-lg-offset-2 col-md-offset-3").removeClass("col-lg-offset-6 col-md-offset-8");
 // jQuery("#search").removeClass("col-lg-offset-6 col-md-offset-8");

  //map.invalidateSize();
  return false;
});

jQuery(document).on("mouseout", ".feature-row", clearHighlight);


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

// Loading Handler Spin
var loadingHandler = function (event) {
    mapInstance.fireEvent('dataloading', event);
};

var loadHandler = function (event) {
    mapInstance.fireEvent('dataload', event);
};

// layerInstanceBar.on('loading', loadingHandler);
// layerInstanceBar.on('load', loadHandler);


//var path = window.location.host.indexOf('noobit') > -1 ? 'fairtradetown' : '';

// function syncSidebar() {
//   /* Empty sidebar features */
//   jQuery("#feature-list tbody").empty();
//   /* Loop through layer and add only features which are in the map bounds */
//   ortsteile.eachLayer(function (layer) {
//     if (map.hasLayer(ortsteileLayer)) {
//       if (map.getBounds().contains(layer.getLatLng())) {
//         jQuery("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.BEZIRK + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
//       }
//     }
//   });
//    Loop through museums layer and add only features which are in the map bounds 
//   marker.eachLayer(function (layer) {
//     if (map.hasLayer(markerLayer)) {
//       if (map.getBounds().contains(layer.getLatLng())) {
//         jQuery("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.name + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
//       }
//     }
//   });
//   /* Update list.js featureList */
//   /*featureList = new List("features", {
//     valueNames: ["feature-name"]
//   });
//   featureList.sort("feature-name", {
//     order: "asc"
//   });*/
// }


/* Basemap Layers */
var berlinAttribution = 'Geoportal Berlin / Orteile von Berlin.';

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
//var pruneCluster = new PruneClusterForLeaflet();


var categories = {
  'Weltläden, Cafés & Einzelgeschäfte' : {desc: "Weltläden, Cafés & Einzelgeschäfte", icon: "marker", color: "00B4DF", category: 0},
  'Bioläden & -ketten' : {desc: "Bioläden & -ketten", icon: "marker", color: "CED41E", category: 1},
  'Sonstige Ketten (Supermärkte, Drogeriemärkte, Gastrononmieketten, usw.)' : {desc: "Sonstige Ketten (Supermärkte, Drogeriemärkte, Gastrononmieketten, usw.)", icon: "marker", color: "FFFFFF", category: 2},
  'nicht kategorisiert' : {desc: "nicht kategorisiert", icon: "marker", color: "FFFFFF", opacity: 0.8, category: 4}
};

// pruneCluster.BuildLeafletClusterIcon = function(cluster) {
//     var e = new L.Icon.MarkerCluster(); 
//     e.stats = cluster.stats;
//     e.population = cluster.population;
//     return e;
// };

/*L.Icon.MarkerCluster = L.Icon.extend({
  options: {
    iconSize: new L.Point(44, 44),
    className: 'prunecluster leaflet-markercluster-icon'
  },
  createIcon: function () {
    // based on L.Icon.Canvas from shramov/leaflet-plugins (BSD licence)
    var e = document.createElement('canvas');
    this._setIconStyles(e, 'icon');
    var s = this.options.iconSize;
    e.width = s.x;
    e.height = s.y;
    this.draw(e.getContext('2d'), s.x, s.y);
    return e;
  },
  createShadow: function () {
    return null;
  },
  draw: function(canvas, width, height) {
    var lol = 0;
    var start = 0;
    for (var cat in categories) {
      var size =  .4;
      if (size > 0) {
        canvas.beginPath();
        canvas.moveTo(22, 22);
        canvas.fillStyle = '#' + categories[cat].color;
        var from = start + 0.14,
            to = start + size * 3.14;
        if (to < from) {
            from = start;
        }
        canvas.arc(22,22,22, from, to);
        start = start + size*3.14;
        canvas.lineTo(22,22);
        canvas.fill();
        canvas.closePath();
      }
    }
    canvas.beginPath();
    canvas.fillStyle = 'white';
    canvas.arc(22, 22, 18, 0, Math.PI*2);
    canvas.fill();
    canvas.closePath();
    canvas.fillStyle = '#555';
    canvas.textAlign = 'center';
    canvas.textBaseline = 'middle';
    canvas.font = 'bold 12px sans-serif';
    canvas.fillText(this.population, 22, 22, 40);
  }
});*/

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

var layerControl = L.control.layers(null, null, {
  position: 'bottomright',
  collapsed: isCollapsed
});
// var zoomControl = L.control.zoom({
//   position: 'topright'
// });
var borderControl = L.control.layers(null, null, {
  position: 'topright',
  collapsed: 'true' 
});

for (var icat in categories) {  
  var layer = L.featureGroup();
  layers[icat] = layer;
  cultureLayer.addLayer(layer);
  if (icat != 'nicht kategorisiert') {
    var cat = categories[icat];
    ico = "https://api.tiles.mapbox.com/v3/marker/pin-s-" + cat.icon + "+" + cat.color + "@2x.png";
    desc = "<img class='layer-control-img' src='" + ico + "' />"  +  cat.desc;
    layerControl.addOverlay(layer, desc);
  }
}

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
  var symbol;

  for (var id in features) {
    var feat = features[id];
    //console.log(feat);
    if (feat.geometry === null || feat.properties.show !== 'x') { continue; }
    //var cat =  "Bioläden & -ketten"; /* = feat.properties.kategorie1 ? feat.properties.kategorie1 : 'nicht kategorisiert';*/
    switch (feat.properties.kategorie1) {
      case "Supermarkt":
        symbol = "grocery";
        cat  = "Sonstige Ketten (Supermärkte, Drogeriemärkte, Gastrononmieketten, usw.)" ;
        break;
      case "Discounter":
        symbol = "grocery";
        cat  = "Sonstige Ketten (Supermärkte, Drogeriemärkte, Gastrononmieketten, usw.)" ;
        break;
      case "Drogeriemarkt":
        symbol = "grocery";
        cat  = "Sonstige Ketten (Supermärkte, Drogeriemärkte, Gastrononmieketten, usw.)" ;
        break;
      case "Warenhaus":
        symbol = "grocery";
        cat  = "Sonstige Ketten (Supermärkte, Drogeriemärkte, Gastrononmieketten, usw.)" ;
        break;
      case "Restaurantkette":
        symbol = "restaurant";
        cat  = "Sonstige Ketten (Supermärkte, Drogeriemärkte, Gastrononmieketten, usw.)" ;
        break;
      case "Bäckerei- / Cafékette":
        symbol = "cafe";
        cat  = "Sonstige Ketten (Supermärkte, Drogeriemärkte, Gastrononmieketten, usw.)" ;
        break;
      case "Textilkette":
        symbol = "clothing-store";
        cat  = "Sonstige Ketten (Supermärkte, Drogeriemärkte, Gastrononmieketten, usw.)" ;
        break;
      case "Blumenfilialist":
        symbol = "garden";
        cat  = "Sonstige Ketten (Supermärkte, Drogeriemärkte, Gastrononmieketten, usw.)" ;
        break;
      case "Bioladen":
        symbol = "shop";
        cat  = "Bioläden & -ketten";
        break;
      case "Biomarkt":
        symbol = "shop";
        cat  = "Bioläden & -ketten";
        break;
      case "Reformhaus":
        symbol = "shop";
        cat  = "Bioläden & -ketten";
        break;
      case "Textilgeschäft":
        symbol = "clothing-store";
        cat  = "Weltläden, Cafés & Einzelgeschäfte";
        break;
      case "Weltladen":
        symbol = "shop";
        cat  = "Weltläden, Cafés & Einzelgeschäfte";
        break;
      case "Bäckerei / Café":
        symbol = "cafe";
        cat  = "Weltläden, Cafés & Einzelgeschäfte";
        break;
      case "Einzelgeschäft":
        symbol = "warehouse";
        cat  = "Weltläden, Cafés & Einzelgeschäfte";
        break;
      case "Blumengeschäft":
        symbol = "garden";
        cat  = "Weltläden, Cafés & Einzelgeschäfte";
        break;
      case "Restaurant":
        symbol = "restaurant";
        cat  = "Weltläden, Cafés & Einzelgeschäfte";
        break;
      case "Spielwarengeschäft":
        symbol = "soccer";
        cat  = "Weltläden, Cafés & Einzelgeschäfte";
        break;
      default:
        symbol = "circle";
        cat  = "nicht kategorisiert";
    }

    color1 = categories[cat].color;

    var layer = layers[cat];
    var cati = categories[cat];
    marker = L.geoJson(feat, {
      pointToLayer: function(feature, latLng) {         
        //var icon = icons[cat]; 
        var icon = new L.MakiMarkers.icon({
          icon: symbol ? symbol : 'circle-stroked',
          color: '#' + categories[cat].color, 
          size: "m"
        });
        /*var markerPrune = new PruneCluster.Marker(latLng.lat, latLng.lng);
          markerPrune.data.name = feature.properties.name;
          markerPrune.data.ID = feature.properties.id;
          markerPrune.data.icon = icon; 
          markerPrune.data.riseOnHover = true;
          markerPrune.data.popup = bindePopup(feature);

          markerPrune.category = categories[cat].category;
          markerPrune.weight   = categories[cat].category;*/

        var marker = new L.marker(latLng, { 
          icon: icon,
          keyboard: false,
          riseOnHover: true,
          opacity: categories[cat].opacity ? categories[cat].opacity : 1
        });

        /*if (! L.touch) {
          markerPrune.on('mouseover', function(e) {
            var nom = e.target.feature.properties.name;
            var pos = map.latLngToContainerPoint(e.latlng);
            popup.innerHTML = nom;
            L.DomUtil.setPosition(popup, pos);
            L.DomUtil.addClass(popup, 'visible');

          }).on('mouseout', function(e) {
              L.DomUtil.removeClass(popup, 'visible');
          });
        }*/
       // pruneCluster.RegisterMarker(markerPrune);
       // pruneCluster.ProcessView();
        return marker;
      },
      onEachFeature: bindePopup
    });
    if (layer !== undefined) {
      layer.addLayer(marker);
      markerSearch.push({
        name: feat.properties.name,
        address: feat.properties.strasse,
        marker: marker, 
        icon: "https://api.tiles.mapbox.com/v3/marker/pin-s-" + cati.icon + "+" + cati.color + ".png",
        source: "Marker",
        id: feat.properties.id, //L.stamp(layer),
        lat: feat.geometry.coordinates[1],
        lng: feat.geometry.coordinates[0]
      });
    }  
  }
  map.fitBounds(layer.getBounds(), {padding: [10, 10]});
  return layers;
}
 

function bindePopup(feature, layer) {

  /* feature.layer = layer; */  
  var props = feature.properties;
  // var color =  "fff"; /* = feat.properties.kategorie1 ? feat.properties.kategorie1 : 'nicht kategorisiert';*/
  //   if (props.kategorie1.indexOf("Super") != -1 || props.kategorie1.indexOf("kette") != -1) {
  //     color = categories["Sonstige Ketten (Supermärkte, Drogeriemärkte, Gastrononmieketten, usw.)"].color ;
  //   }
  //   else if (props.kategorie1.indexOf("Bio") != -1) {
  //     color = categories["Bioläden & -ketten"].color;
  //   }
  //   else if (props.kategorie1.indexOf("Welt") != -1 || props.kategorie1.indexOf("Einzel") != -1 || props.kategorie1.indexOf("Café") != -1) {
  //     color = categories["Weltläden, Cafés & Einzelgeschäfte"].color;
  //   }
  //   else {
  //     color = ["nicht kategorisiert"].color;
  //   }
  if (props) {
    var desc = '<span id="feature-popup">';
    desc += "<h2 style='padding:20px;margin-left:-20px; margin-right:-20px; background-color:#" + color1 + "'>" + props.name + "</h2>";
    desc += (props.beschreibung ? "<p>" + props.beschreibung + "</p>" : "");
    desc += "<div id='address'>",
    desc +=     "<i class='fa fa-map-marker fa-fw'></i>&nbsp;" + props.strasse + "<br />";
    desc +=     "<i class='fa fa-fw'></i>&nbsp;" + props.plz + " " + props.ort + "";
    desc += "</div>";
    desc += "<p>";
    desc += "<div id='contact'>";
    desc +=   (props.telefon1   ? "<i class='fa fa-phone fa-fw'></i>&nbsp;" + props.telefon1 + "<br />" : "");
    desc +=   (props.telefax    ? "<i class='fa fa-fax fa-fw'></i>&nbsp;" + props.telefax + "<br />" : "" );
    desc +=   (props.email      ? "<i class='fa fa-envelope fa-fw'></i>&nbsp;<a href='mailto:" + props.email + "'>" + props.email + "</a><br />" : "" );
    desc +=   (props.homepage   ? "<i class='fa fa-external-link fa-fw'></i>&nbsp;<a href='http://" + props.homepage + "' target=_blank>" + props.homepage + "</a><br />" : "" );
    // desc +=   (props.kategorie1 ? "<i class='fa fa-th-list fa-fw'></i>&nbsp;" + props.kategorie1 : "" ); 
    // desc +=   (props.kategorie2 ? "&nbsp;/&nbsp;" + props.kategorie2 : "");
    desc += "</div>"
    desc += "<div id='oeffnungszeiten'>";
    desc +=   ((!props.oeffnungszeiten == null) ? "<i class='fa fa-sign-in fa-fw'></i>&nbsp;" + props.oeffnungszeiten : "" );
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
      maxWidth: 400,
      autoPanPaddingTopLeft: [10,90]
     // class: 
    }); 
  } 

}

var account_name = 'noobit';
var sql_statement = 'SELECT * FROM Marker Map';

$.getJSON('https://'+account_name+'.cartodb.com/api/v2/sql?format=GeoJSON&q='+sql_statement, function(data) {
  displayFeatures(data.features, layers, icons);
    $.each(data.features, function(key, val) {
       //console.log(key, val);
  });
});

// jQuery.getJSON("/data/marker.geojson", function (data) {
//   //marker.addData(data);
//   displayFeatures(data.features, layers, icons);
// });


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
      color: "#999",
      weight: 2,
      opacity: 0.6,
      fillOpacity: 0.3,
      fillColor: "#999",
      dashArray: "2 4"
    });

    (function(layer, properties) {
      layer.on("mouseover", function (e) {
        layer.setStyle({
          color: '#999', 
          weight: 2,
          opacity: 0.6,
          fillOpacity: 0.6,
          fillColor: '#999'
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
          color: "#999",
          weight: 2,
          opacity: 0.6,
          fillOpacity: 0.3,
          fillColor: "#999"
        }); 
        jQuery("#popup-" + properties.OTEIL).remove();
      });
    })(layer, feature.properties);
  
  }
});
jQuery.getJSON(path + "/data/ortsteile.geojson", function (data) {
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
      color: "#999",
      weight: 3,
      opacity: 0.6,
      fillOpacity: 0.3,
      fillColor: "#999"
    });
    (function(layer, properties) {
      layer.on("mouseover", function (e) {
        layer.setStyle({
          color: '#999', 
          weight: 3,
          opacity: 0.6,
          fillOpacity: 0.6,
          fillColor: '#999'
        });
        jQuery("#bezirk").text(properties.spatial_alias); 
       
      });
      layer.on("mouseout", function (e) {
        layer.setStyle({
          color: "#999",
          weight: 3,
          opacity: 0.6,
          fillOpacity: 0.3,
          fillColor: "#999"
        }); 
        jQuery("#popup-" + properties.OTEIL).remove();
      });
    })(layer, feature.properties);
  }
});
jQuery.getJSON(path + "/data/bezirke.geojson", function (data) {
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
      color: "#999",
      weight: 1,
      opacity: 0.8,
      fillOpacity: 0.3,
      fillColor: "#999",
      dashArray: "5 2 3 2"
    });

    (function(layer, properties) {
      layer.on("mouseover", function (e) {
        layer.setStyle({
          color: '#999', 
          weight: 1,
          opacity: 0.8,
          fillOpacity: 0.6,
          fillColor: '#999'
        });
        /*var hed = jQuery("<div></div>", {
            text: "Bezirk / Ortsteil / PLZ: " + properties.BEZIRK + " / " + properties.OTEIL + " / ",
            css: { fontSize: "16px", marginBottom: "3px" }
        }).appendTo(popup);
        popup.appendTo("#map");*/
        
      });
      layer.on("mouseout", function (e) {
        layer.setStyle({
          color: "#999",
          weight: 1,
          opacity: 0.8,
          fillOpacity: 0.3,
          fillColor: "#999"
        }); 
        //jQuery("#popup-" + properties.OTEIL).remove();
      });
    })(layer, feature.properties);
  
  }
});
jQuery.getJSON(path + "/data/plz.geojson", function (data) {
  plz.addData(data);
});

/* Single marker cluster layer to hold all clusters */
 /*var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 16
});*/ 
               


map = L.map("map", {
  layers: [mapquestTile],
  attributionControl: true,
  zoomControl: false
});


map.setView([52.505, 13.29], 13);
//map.addLayer(pruneCluster);

markerLayer.on('loading', loadingHandler);
markerLayer.on('load', loadHandler);


// Add our zoom control manually where we want to
  var zoomControl = L.control.zoom({
      position: 'topright'
  });
  map.addControl(zoomControl);


 // Add our loading control in the same position and pass the 
  // zoom control to attach to it
  var loadingControl = L.Control.loading({
      position: 'topright',
      zoomControl: zoomControl
  });
  map.addControl(loadingControl);

/* Layer control listeners that allow for a single markerClusters layer */
// map.on("overlayadd", function(e) {
//   if (e.layer === markerLayer) {
//     //markerClusters.addLayer(marker);
//     //syncSidebar();
//   }
//  /* if (e.layer === museumLayer) {
//     markerClusters.addLayer(museums);
//     syncSidebar();
//   }*/
// });

// map.on("overlayremove", function(e) {
//   if (e.layer === markerLayer) {
//    // markerClusters.removeLayer(marker);
//     //syncSidebar();
//   }
//   if (e.layer === museumLayer) {
//     // markerLayerClusters.removeLayer(museums);
//     //syncSidebar();
//   }
// });

// /* Filter sidebar feature list to only show features in current map bounds */
// map.on("moveend", function (e) {
//   syncSidebar();
// });

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
  position: "topright",
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




  
  cultureLayer.addTo(map);

  // Add Base Tiles
  // layerControl.addBaseLayer(baseTile, 'Openstreetmap');
  // layerControl.addBaseLayer(blackwhiteTile, 'Schwarz / Weiß');
  // layerControl.addBaseLayer(bmapTile, 'BMap');
  // layerControl.addBaseLayer(mapquestTile, 'Mapquest OSM');
  // layerControl.addBaseLayer(positronTile, 'Schwarz / Weiß');
  // layerControl.addBaseLayer(mapboxTile, 'Mapbox (50.000 / Month)');


  // Add Choices
  borderControl.addOverlay(bezirke, 'Bezirk: <span id="bezirk"></span>');
  borderControl.addOverlay(ortsteile, 'Ortsteil: <span id="ortsteil"></span>');
  borderControl.addOverlay(plz, 'PLZ: <span id="plz"></span>');




  //zoomControl.addTo(map);

  layerControl.addTo(map);
  borderControl.addTo(map);


  var icons = setupIcons();

  /* Highlight search box text on click */
  // jQuery("#searchbox").click(function () {
  //   jQuery(this).select();
  // });

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
   if (datum.source === "GeoNames") {
     map.setView([datum.lat, datum.lng], 14);
   }
    if (datum.source === "Marker") {
      // if (!map.hasLayer(markerLayer)) {
      //   map.addLayer(markerLayer);
      // }
      map.setView([datum.lat, datum.lng], 16);    
      datum.marker.openPopup();
      // if (map._layers[datum.id]) {
      //   map._layers[datum.id].fire("click");  
      // }
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
