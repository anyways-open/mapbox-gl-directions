import * as types from '../constants/action_types';
import utils from '../utils';
const request = new XMLHttpRequest();
const request1 = new XMLHttpRequest();

function originPoint(coordinates) {
  return (dispatch) => {
    const origin = utils.createPoint(coordinates, {
      id: 'origin',
      'marker-symbol': 'A'
    });

    dispatch({ type: types.ORIGIN, origin });
    dispatch(eventEmit('origin', { feature: origin }));
  };
}

function destinationPoint(coordinates) {
  return (dispatch) => {
    const destination = utils.createPoint(coordinates, {
      id: 'destination',
      'marker-symbol': 'B'
    });

    dispatch({ type: types.DESTINATION, destination });
    dispatch(eventEmit('destination', { feature: destination }));
  };
}

function setDirections(directions) {
  return dispatch => {
    dispatch({
      type: types.DIRECTIONS,
      directions
    });
    dispatch(eventEmit('route', { route: directions }));
  };
}

function setDirections1(directions) {
  return dispatch => {
    dispatch({
      type: types.DIRECTIONS1,
      directions
    });
    dispatch(eventEmit('route', { route: directions }));
  };
}

function updateWaypoints(waypoints) {
  return {
    type: types.WAYPOINTS,
    waypoints: waypoints
  };
}

function setHoverMarker(feature) {
  return {
    type: types.HOVER_MARKER,
    hoverMarker: feature
  };
}

function fetchDirections() {
  return (dispatch, getState) => {
      const { api, api1, accessToken, routeIndex, profile, origin, destination, waypoints } = getState();
      
      // build request for first route.
      if (profile == 'transit') {
          var options = [];
          options.push('profile=pedestrian|pedestrian|pedestrian');
          options.push('time=201703201655');
          options.push('loc=' + origin.geometry.coordinates[1] + ',' + origin.geometry.coordinates[0]);
          options.push('loc=' + destination.geometry.coordinates[1] + ',' + destination.geometry.coordinates[0]);
          request.abort();
          request.open('GET', `${api}multimodal?${options.join('&')}`, true);
      } else {
          var options = [];
          options.push('profile=' + profile);
          options.push('loc=' + origin.geometry.coordinates[1] + ',' + origin.geometry.coordinates[0]);
          options.push('loc=' + destination.geometry.coordinates[1] + ',' + destination.geometry.coordinates[0]);
          request.abort();
          request.open('GET', `${api}routing?${options.join('&')}`, true);
      }

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        if (data.error) {
          dispatch(setDirections([]));
          return dispatch(setError(data.error));
        }

        dispatch(setError(null));
        //if (!data.routes[routeIndex]) dispatch(setRouteIndex(0));
        dispatch(setDirections(data));

        var aStop;
        var bStop;
        data.features.forEach(function (feature) {
            if (feature &&
                feature.geometry &&
                feature.geometry.type == "Point") {
                if (!aStop) {
                    aStop = feature.geometry.coordinates;
                } else {
                    bStop = feature.geometry.coordinates;
                }
            }
        });

        // Revise origin / destination points
        dispatch(originPoint(aStop));
        dispatch(destinationPoint(bStop));
      } else {
        dispatch(setDirections([]));
        return dispatch(setError(JSON.parse(request.responseText).message));
      }
    };

    request.onerror = () => {
      dispatch(setDirections([]));
      return dispatch(setError(JSON.parse(request.responseText).message));
    };

    request.send();
    
      // build request for second route.
      
    if (api1) {
        if (profile == 'transit') {
            var options = [];
            options.push('profile=pedestrian|pedestrian|pedestrian');
            options.push('time=201703201655');
            options.push('loc=' + origin.geometry.coordinates[1] + ',' + origin.geometry.coordinates[0]);
            options.push('loc=' + destination.geometry.coordinates[1] + ',' + destination.geometry.coordinates[0]);
            request1.abort();
            request1.open('GET', `${api1}multimodal?${options.join('&')}`, true);
        } else {
            var options = [];
            options.push('profile=' + profile);
            options.push('loc=' + origin.geometry.coordinates[1] + ',' + origin.geometry.coordinates[0]);
            options.push('loc=' + destination.geometry.coordinates[1] + ',' + destination.geometry.coordinates[0]);
            request1.abort();
            request1.open('GET', `${api1}routing?${options.join('&')}`, true);
        }
      request1.onload = () => {
        if (request1.status >= 200 && request1.status < 400) {
          var data = JSON.parse(request1.responseText);
          if (data.error) {
            dispatch(setDirections1([]));
            return dispatch(setError(data.error));
          }

          dispatch(setError(null));
          //if (!data.routes[routeIndex]) dispatch(setRouteIndex(0));
          dispatch(setDirections1(data));

          var aStop;
          var bStop;
          data.features.forEach(function (feature) {
              if (feature &&
                  feature.geometry &&
                  feature.geometry.type == "Point") {
                  if (!aStop) {
                      aStop = feature.geometry.coordinates;
                  } else {
                      bStop = feature.geometry.coordinates;
                  }
              }
          });

          // Revise origin / destination points
          dispatch(originPoint(aStop));
          dispatch(destinationPoint(bStop));
        } else {
          dispatch(setDirections1([]));
          return dispatch(setError(JSON.parse(request1.responseText).message));
        }
      };

      request1.onerror = () => {
        dispatch(setDirections1([]));
        return dispatch(setError(JSON.parse(request1.responseText).message));
      };

      request1.send();
    }
  };
}

function normalizeWaypoint(waypoint) {
  const properties = { id: 'waypoint' };
  return Object.assign(waypoint, {
    properties: waypoint.properties ?
      Object.assign(waypoint.properties, properties) :
      properties
  });
}

function setError(error) {
  return dispatch => {
    dispatch({
      type: 'ERROR',
      error
    });
    if (error) dispatch(eventEmit('error', { error: error }));
  };
}

export function queryOrigin(query) {
  return {
    type: types.ORIGIN_QUERY,
    query
  };
}

export function queryDestination(query) {
  return {
    type: types.DESTINATION_QUERY,
    query
  };
}

export function queryOriginCoordinates(coords) {
  return {
    type: types.ORIGIN_FROM_COORDINATES,
    coordinates: coords
  };
}

export function queryDestinationCoordinates(coords) {
  return {
    type: types.DESTINATION_FROM_COORDINATES,
    coordinates: coords
  };
}

export function clearOrigin() {
  return dispatch => {
    dispatch({
      type: types.ORIGIN_CLEAR
    });
    dispatch(eventEmit('clear', { type: 'origin' }));
    dispatch(setError(null));
  };
}

export function clearDestination() {
  return dispatch => {
    dispatch({
      type: types.DESTINATION_CLEAR
    });
    dispatch(eventEmit('clear', { type: 'destination' }));
    dispatch(setError(null));
  };
}

export function setOptions(options) {
  return {
    type: types.SET_OPTIONS,
    options: options
  };
}

export function hoverMarker(coordinates) {
  return (dispatch) => {
    const feature = (coordinates) ? utils.createPoint(coordinates, { id: 'hover'}) : {};
    dispatch(setHoverMarker(feature));
  };
}

export function setRouteIndex(routeIndex) {
  return {
    type: types.ROUTE_INDEX,
    routeIndex
  };
}

export function updateOrigin(coordinates) {
    return (dispatch, getState) => {
        const { destination } = getState();
        dispatch(originPoint(coordinates));
    };
}

export function createOrigin(coordinates) {
  return (dispatch, getState) => {
    const { destination } = getState();
    dispatch(originPoint(coordinates));
    if (destination.geometry) dispatch(fetchDirections());
  };
}

export function updateDestination(coordinates) {
    return (dispatch, getState) => {
        const { origin } = getState();
        dispatch(destinationPoint(coordinates));
    };
}

export function createDestination(coordinates) {
  return (dispatch, getState) => {
    const { origin } = getState();
    dispatch(destinationPoint(coordinates));
    if (origin.geometry) dispatch(fetchDirections());
  };
}

export function setProfile(profile) {
  return (dispatch, getState) => {
    const { origin, destination } = getState();
    dispatch({ type: types.DIRECTIONS_PROFILE, profile });
    dispatch(eventEmit('profile', { profile }));
    if (origin.geometry && destination.geometry) dispatch(fetchDirections());
  };
}

export function reverse() {
  return (dispatch, getState) => {
    const state = getState();
    if (state.destination.geometry) dispatch(originPoint(state.destination.geometry.coordinates));
    if (state.origin.geometry) dispatch(destinationPoint(state.origin.geometry.coordinates));
    if (state.origin.geometry && state.destination.geometry) dispatch(fetchDirections());
  };
}

/*
 * Set origin from coordinates
 *
 * @param {Array<number>} coordinates [lng, lat] array.
 */
export function setOriginFromCoordinates(coords) {
  return (dispatch) => {
    if (!utils.validCoords(coords)) coords = [utils.wrap(coords[0]), utils.wrap(coords[1])];
    if (isNaN(coords[0]) && isNaN(coords[1])) return dispatch(setError(new Error('Coordinates are not valid')));
    dispatch(queryOriginCoordinates(coords));
    dispatch(createOrigin(coords));
  };
}

/*
 * Set destination from coordinates
 *
 * @param {Array<number>} coords [lng, lat] array.
 */
export function setDestinationFromCoordinates(coords) {
  return (dispatch) => {
    if (!utils.validCoords(coords)) coords = [utils.wrap(coords[0]), utils.wrap(coords[1])];
    if (isNaN(coords[0]) && isNaN(coords[1])) return dispatch(setError(new Error('Coordinates are not valid')));
    dispatch(createDestination(coords));
    dispatch(queryDestinationCoordinates(coords));
  };
}

export function addWaypoint(index, waypoint) {
  return (dispatch, getState) => {
    let { destination, waypoints } = getState();
    waypoints.splice(index, 0, normalizeWaypoint(waypoint));
    dispatch(updateWaypoints(waypoints));
    if (destination.geometry) dispatch(fetchDirections());
  };
}

export function setWaypoint(index, waypoint) {
  return (dispatch, getState) => {
    let { destination, waypoints } = getState();
    waypoints[index] = normalizeWaypoint(waypoint);
    dispatch(updateWaypoints(waypoints));
    if (destination.geometry) dispatch(fetchDirections());
  };
}

export function removeWaypoint(waypoint) {
  return (dispatch, getState) => {
    let { destination, waypoints } = getState();
      waypoints = waypoints.filter((way) => {
        return !utils.coordinateMatch(way, waypoint);
      });

      dispatch(updateWaypoints(waypoints));
      if (destination.geometry) dispatch(fetchDirections());
  };
}

export function eventSubscribe(type, fn) {
  return (dispatch, getState) => {
    const { events } = getState();
    events[type] = events[type] || [];
    events[type].push(fn);
    return {
      type: types.EVENTS,
      events
    };
  };
}

export function eventEmit(type, data) {
  return (dispatch, getState) => {
    const { events } = getState();

    if (!events[type]) {
      return {
        type: types.EVENTS,
        events
      };
    }

    const listeners = events[type].slice();

    for (var i = 0; i < listeners.length; i++) {
      listeners[i].call(this, data);
    }
  };
}
