const style = [{
  'id': 'directions-route-line-alt',
  'type': 'line',
  'source': 'directions',
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': '#bbb',
    'line-width': 4
  },
  'filter': [
    'all',
    ['in', '$type', 'LineString'],
    ['in', 'route', 'alternate']
  ]
}, {
    'id': 'directions-route-line',
    'type': 'line',
    'source': 'directions',
    'layout': {
        'line-cap': 'round',
        'line-join': 'round'
    },
    'paint': {
        'line-color': '#fff',
        "line-width": 12,
        "line-opacity": 0.75
    },
    'filter': [
      'all',
      ['in', '$type', 'LineString']
    ]
}, {
  'id': 'directions-route-line-bicycle',
  'type': 'line',
  'source': 'directions',
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
      'line-color': '#3bb2d0',
      "line-width": 6
  },
  'filter': [
    'all',
    ['in', '$type', 'LineString'],
    ['in', 'profile', 'bicycle', 'Bicycle']
  ]
}, 
{
    'id': 'directions-route-line-pedestrian',
    'type': 'line',
    'source': 'directions',
    'layout': {
        'line-cap': 'round',
        'line-join': 'round'
    },
    'paint': {
        'line-color': '#3bb2d0',
        "line-width": 4
    },
    'filter': [
      'all',
      ['in', '$type', 'LineString'],
      ['in', 'profile', 'pedestrian', 'Pedestrian']
    ]
},
{
    'id': 'directions-route-line-car',
    'type': 'line',
    'source': 'directions',
    'layout': {
        'line-cap': 'round',
        'line-join': 'round'
    },
    'paint': {
        'line-color': '#3bb2d0',
        "line-width": 8
    },
    'filter': [
      'all',
      ['in', '$type', 'LineString'],
      ['in', 'profile', 'car', 'Car']
    ]
},
{
    'id': 'directions-route-line-transit-back',
    'type': 'line',
    'source': 'directions',
    'layout': {
        'line-cap': 'round',
        'line-join': 'round'
    },
    'paint': {
        'line-color': '#fff',
        "line-width": 7
    },
    'filter': [
      'all',
      ['in', '$type', 'LineString'],
      ['has', 'trip_id']
    ]
},
{
    'id': 'directions-route-line-transit',
    'type': 'line',
    'source': 'directions',
    'layout': {
        'line-cap': 'round',
        'line-join': 'round'
    },
    'paint': {
        'line-color': {
            'property': 'trip_route_color',
            'type': 'identity'
        },
        "line-width": 4
    },
    'filter': [
      'all',
      ['in', '$type', 'LineString'],
      ['has', 'trip_id']
    ]
},
{
    'id': 'directions-route-line-transit-stop1',
    'type': 'circle',
    'source': 'directions',
    'paint': {
        'circle-radius': 7,
        'circle-color': "#000"
    },
    'filter': [
      'all',
      ['in', '$type', 'LineString'],
      ['has', 'trip_id']
    ]
},
{
    'id': 'directions-route-line-transit-stop2',
    'type': 'circle',
    'source': 'directions',
    'paint': {
        'circle-radius': 5,
        'circle-color': "#fff"
    },
    'filter': [
      'all',
      ['in', '$type', 'LineString'],
      ['has', 'trip_id']
    ]
},
{
  'id': 'directions-hover-point-casing',
  'type': 'circle',
  'source': 'directions',
  'paint': {
    'circle-radius': 8,
    'circle-color': '#fff'
  },
  'filter': [
    'all',
    ['in', '$type', 'Point'],
    ['in', 'id', 'hover']
  ]
}, {
  'id': 'directions-hover-point',
  'type': 'circle',
  'source': 'directions',
  'paint': {
    'circle-radius': 6,
    'circle-color': '#3bb2d0'
  },
  'filter': [
    'all',
    ['in', '$type', 'Point'],
    ['in', 'id', 'hover']
  ]
}, {
  'id': 'directions-waypoint-point-casing',
  'type': 'circle',
  'source': 'directions',
  'paint': {
    'circle-radius': 8,
    'circle-color': '#fff'
  },
  'filter': [
    'all',
    ['in', '$type', 'Point'],
    ['in', 'id', 'waypoint']
  ]
}, {
  'id': 'directions-waypoint-point',
  'type': 'circle',
  'source': 'directions',
  'paint': {
    'circle-radius': 6,
    'circle-color': '#8a8bc9'
  },
  'filter': [
    'all',
    ['in', '$type', 'Point'],
    ['in', 'id', 'waypoint']
  ]
}, {
  'id': 'directions-origin-point',
  'type': 'circle',
  'source': 'directions',
  'paint': {
    'circle-radius': 18,
    'circle-color': '#3bb2d0'
  },
  'filter': [
    'all',
    ['in', '$type', 'Point'],
    ['in', 'marker-symbol', 'A']
  ]
}, {
  'id': 'directions-origin-label',
  'type': 'symbol',
  'source': 'directions',
  'layout': {
    'text-field': 'A',
    'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
    'text-size': 12
  },
  'paint': {
    'text-color': '#fff'
  },
  'filter': [
    'all',
    ['in', '$type', 'Point'],
    ['in', 'marker-symbol', 'A']
  ]
}, {
  'id': 'directions-destination-point',
  'type': 'circle',
  'source': 'directions',
  'paint': {
    'circle-radius': 18,
    'circle-color': '#8a8bc9'
  },
  'filter': [
    'all',
    ['in', '$type', 'Point'],
    ['in', 'marker-symbol', 'B']
  ]
}, {
  'id': 'directions-destination-label',
  'type': 'symbol',
  'source': 'directions',
  'layout': {
    'text-field': 'B',
    'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
    'text-size': 12
  },
  'paint': {
    'text-color': '#fff'
  },
  'filter': [
    'all',
    ['in', '$type', 'Point'],
    ['in', 'marker-symbol', 'B']
  ]
}];

export default style;
