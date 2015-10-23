var map = L.map('map').setView([51.509223, -0.106173], 15);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'swashbuckler.cify6jkdd02dttcm0s1bknyqr',
  accessToken: 'pk.eyJ1Ijoic3dhc2hidWNrbGVyIiwiYSI6ImNpZnk2amtsYjAyYTh0NG03ZnAyaDFuaTIifQ.zL7e_N3nod_-P_D9skbAMg'
}).addTo(map);


L.geoJson(coordinates.waterlooAndCityLine).addTo(map);

function getCoords(time, routeCoords) {
  var routeLen = [];
  var pointsArray = routeCoords;

  pointsArray.reduce(function(prev, curr, index) {
    if (index !== 0) {
      routeLen.push(
        pythag(curr[0] - prev[0], curr[1] - prev[1])
      );
    }
    return curr;
  });

  var routeLenSum = routeLen.reduce(function(prev, curr, index) {
    return prev + curr;
  }, 0);

  var timeSteps = 215;
  var timeStepsArr = routeLen.map(function(elem) {
    return elem / routeLenSum * timeSteps;
  });

  var timeStepsCum = timeStepsArr.reduce(function(prev, curr, index) {
    if (index !== 0) {
      prev.push(eightdp(curr + prev[index - 1]));
    }
    return prev;
  }, [timeStepsArr[0]]);

  time = 214 - time;

  var bounds = [];
  var points = [];
  timeStepsCum.reduce(function(prev, curr, index) {

    if (time > prev && time < curr) {

      bounds.push(prev);
      bounds.push(curr);
      points.push(pointsArray[index]);
      points.push(pointsArray[index + 1]);
    }

    return curr;

  }, 0);

  var percentageTravelled = interpolate(bounds[0], bounds[1], time);
  return coordsBetweenTwoPoints(points[0], points[1], percentageTravelled);

}

function interpolate(a, b, t) {
  return (t - a) / (b - a);
}

function coordsBetweenTwoPoints(coordA, coordB, fraction) {
  return [coordA[0] + (coordB[0] - coordA[0]) * fraction,
    coordA[1] + (coordB[1] - coordA[1]) * fraction
  ];
}

function switchCoords(coordsArray) {
  return [coordsArray[1], coordsArray[0]];
}


function reverseArray(array) {
  var modifiedArray = [];
  array.forEach(function(elem) {
    modifiedArray.unshift(elem);
  });
  return modifiedArray;
}

function pythag(a, b) {
  return eightdp(Math.sqrt(eightdp(a * a + b * b)));
}

function eightdp(num) {
  return Math.round(num * 100000000) / 100000000;
}


var changedTrains = {};
var trainMarkers = {};

function updateTrains() {
  Object.keys(changedTrains).filter(function(elem) {
    if (trainMarkers[elem]) { // train exists, update time
      trainMarkers[elem].timeToStation = changedTrains[elem].timeToStation;
    } else { //add the train
      trainMarkers[elem] = changedTrains[elem];
      var dest = trainMarkers[elem].destinationName.substring(0, 4);
      var icon = trainIcons[dest];
      trainMarkers[elem].marker = L.marker(switchCoords(getCoords(trainMarkers[elem].timeToStation, coordinates[dest])), {
        icon: icon
      }).addTo(map);
    }
  });
}


function refreshMarkers() {
  Object.keys(trainMarkers).forEach(function(elem) {
    var dest = trainMarkers[elem].destinationName.substring(0, 4);
    trainMarkers[elem].marker.setLatLng(switchCoords(getCoords(trainMarkers[elem].timeToStation, coordinates[dest]))).update();

    if (trainMarkers[elem].timeToStation > 1) {
      trainMarkers[elem].timeToStation = trainMarkers[elem].timeToStation - 1;
    }
    // else if (timeToStation === 0) {
    //   timeToStation = 1;
    // }

  });

}

window.setInterval(function() {
  refreshMarkers();
}, 1000);


var trainIcons = {
  purple: L.icon({
    iconUrl: '/assets/PurpleTrain.png',
    iconSize: [100, 50], // size of the icon
    iconAnchor: [40, 23], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  }),

  Bank: L.icon({
    iconUrl: '/assets/BlueTrain.png',
    iconSize: [100, 50], // size of the icon
    iconAnchor: [40, 23], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  }),
  red: L.icon({
    iconUrl: '/assets/RedTrain.png',
    iconSize: [100, 50], // size of the icon
    iconAnchor: [40, 23], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  }),
  Wate: L.icon({
    iconUrl: '/assets/GreenTrain.png',
    iconSize: [100, 50], // size of the icon
    iconAnchor: [40, 23], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  })
};
