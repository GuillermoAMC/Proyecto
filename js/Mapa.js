mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VpbGxlcm1vbSIsImEiOiJjazVtbjVicDMwYWd6M2RvN21odWllZGcyIn0.YBrAgeynlPp-YvY4l9xfrQ';
var map = new mapboxgl.Map({
style: 'mapbox://styles/mapbox/light-v10',
center: [-74.0066, 40.7135],
zoom: 15.5,
pitch: 45,
bearing: -17.6,
container: 'map',
antialias: true
})

// Agregar el control de navegacion
map.addControl(
    new mapboxgl.NavigationControl()
);

// Add geolocate control to the map.
map.addControl(
new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    trackUserLocation: true
    })
);

// var map = mapboxgl.map('map', 'mapbox.streets').setView([22.21312, 32.3211], 10);

// map.featureLayer({

//     type: 'Feature',
//     geometry: {
//         type: 'Point',
//         coordinates: [,]
//     },
//     properties: {
//         title: 'Hacker',
//         description: 'Que tal',
//         'marker-size': 'Large',
//         'marker-size': '#592912', 
//         'marker-symbol': 'cafe'
//     }
// }).addTo(map);

// map.on('click', function(e){
//     console.log(e.containerPoint.tostring() + " " + e.latlng.tostring());
// });

map.on('click', function(e){
    document.getElementById('info').innerHTML = JSON.stringify(e.lngLat.wrap());

var marker = new mapboxgl.Marker().setLngLat(e.lngLat.wrap()).addTo(map);

});

map.addControl(
    new MapboxDirections({
    accessToken: mapboxgl.accessToken
    }),
    'top-left'
    );

map.on('load', function() {
      map.addLayer({
        'id': 'room-extrusion',
        'type': 'fill-extrusion',
        'source': {
        // GeoJSON Data source used in vector tiles, documented at
        // https://gist.github.com/ryanbaumann/a7d970386ce59d11c16278b90dde094d
        'type': 'geojson',
        'data':
        'Json/Geo.geojson'
        },
        'paint': {
        // See the Mapbox Style Specification for details on data expressions.
        // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions
         
        // Get the fill-extrusion-color from the source 'color' property.
        'fill-extrusion-color': ['get', 'color'],
         
        // Get fill-extrusion-height from the source 'height' property.
        'fill-extrusion-height': ['get', 'height'],
         
        // Get fill-extrusion-base from the source 'base_height' property.
        'fill-extrusion-base': ['get', 'base_height'],
         
        // Make extrusions slightly opaque for see through indoor walls.
        'fill-extrusion-opacity': 0.5
        }
        });
        });

// The 'building' layer in the mapbox-streets vector source contains building-height
// data from OpenStreetMap.
map.on('load', function() {
    // Insert the layer beneath any symbol layer.
    var layers = map.getStyle().layers;
     
    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
    labelLayerId = layers[i].id;
    break;
    }
    }

    map.addLayer(
    {
    'id': '3d-buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
    'fill-extrusion-color': '#aaa',
     
    // use an 'interpolate' expression to add a smooth transition effect to the
    // buildings as the user zooms in
    'fill-extrusion-height': [
    'interpolate',
    ['linear'],
    ['zoom'],
    15,
    0,
    15.05,
    ['get', 'height']
    ],
    'fill-extrusion-base': [
    'interpolate',
    ['linear'],
    ['zoom'],
    15,
    0,
    15.05,
    ['get', 'min_height']
    ],
    'fill-extrusion-opacity': 0.6
    }
    },
    labelLayerId
    );
    });