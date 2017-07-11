Mapbox GL Directions
---

This is a modified version of the awesome Mapbox GL JS directions control. This one does **not** use the mapbox directions api but allows using the one from [Itinero](http://itinero.tech).

### Usage

```javascript
var mapboxgl = require('mapbox-gl');
var MapboxDirections = require('@mapbox/mapbox-gl-directions');

var directions = new MapboxDirections({
     accessToken: mapboxgl.accessToken, 
     api: 'http://opa-api.anyways.eu/mol/1/',
     api1: '',
     unit: 'metric',
     profile: 'car',
     geocoder: {
       accessToken: mapboxgl.accessToken
     }
});

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9'
});

map.addControl(directions, 'top-left');
```

This sends requests for example:

http://opa-api.anyways.eu/mol/1/routing?profile=car&loc=51.18758,5.092704&loc=51.1876671,5.1049834

- profile: car/bicycle/pedestrian
- loc: from/to locations

Live example: http://opa.anyways.eu/mol/1/

