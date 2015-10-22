var map = L.map('map').setView([51.504269, -0.113356], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'swashbuckler.cify6jkdd02dttcm0s1bknyqr',
  accessToken: 'pk.eyJ1Ijoic3dhc2hidWNrbGVyIiwiYSI6ImNpZnk2amtsYjAyYTh0NG03ZnAyaDFuaTIifQ.zL7e_N3nod_-P_D9skbAMg'
}).addTo(map);


L.geoJson(coordinates.waterlooAndCityLine).addTo(map);

function reverseArray(array){
  var modifiedArray = [];
  array.forEach(function(elem){
    modifiedArray.unshift(elem);
  });
  return modifiedArray;
}

var routeLen = [];
var pointsArray = coordinates.waterlooToBank;

pointsArray.reduce(function(prev, curr, index) {
  if (index === 0) {} else {
    routeLen.push(
      pythag(curr[0] - prev[0], curr[1] - prev[1])
    );
  }
  return curr;
});

function pythag(a, b) {
  return eightdp(Math.sqrt(eightdp(a * a + b * b)));
}

function eightdp(num) {
  return Math.round(num * 100000000) / 100000000;
}

var routeLenSum = routeLen.reduce(function(prev, curr, index) {
  return prev + curr;
}, 0);

var timeSteps = 240;
var timeStepsArr = routeLen.map(function(elem) {
  return elem / routeLenSum * timeSteps;
});

var timeStepsCum = timeStepsArr.reduce(function(prev, curr, index) {
  if (index === 0) {

  } else {
    prev.push(eightdp(curr + prev[index - 1]));
  }
  return prev;
}, [timeStepsArr[0]]);


function getCoords(time) {
  time = 240 - time;
  var bounds = [];
  var points = [];
  timeStepsCum.reduce(function(prev, curr, index) {

    if (time > prev && time < curr) {

      bounds.push(prev);
      bounds.push(curr);
      points.push(pointsArray[index]);
      points.push(pointsArray[index + 1]);

    }

    return prev;

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



var changedTrains = {
  "201":{
    time:36
  },
  "203":{
  time:100
  },
  "200":{
  time:200
  }
};

var trainMarkers = {

};

Object.keys(changedTrains).filter(function(elem){
  if(trainMarkers[elem]){// train exists, update time
    trainMarkers[elem].time = changedTrains[elem].time;
  }
    else{//add the train
      trainMarkers[elem] = changedTrains[elem];
      trainMarkers[elem].marker = L.marker(switchCoords(getCoords(trainMarkers[elem].time))).addTo(map);
    }
});


function refreshMarkers(){
  Object.keys(trainMarkers).forEach(function(elem){
  trainMarkers[elem].marker.setLatLng(switchCoords(getCoords(trainMarkers[elem].time))).update();
  trainMarkers[elem].time = trainMarkers[elem].time - 1;
  });

}

window.setInterval(function() {
  refreshMarkers();
}, 1000);



// myInterval = 0;
// window.setInterval(function() {
//      hitSequence.setLatLng(L.latLng(
//      geojson.coordinates[t][0],
//      geojson.coordinates[t][1]));
//      myInterval = geojson.coordinates[t][2];
//   t += 1;
// }, myInterval);
// }
//train.setLatLng(newCoords);

//var marker = L.marker([51.504269, -0.113356], {'color': 'red'}).addTo(map);
//var newmarker = L.marker([51.513404, -0.088766]).addTo(map);
// icon: L.mapbox.marker.icon({
//   'marker-color': 'red'
//   'size':
