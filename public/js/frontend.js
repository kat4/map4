var map = L.map('map').setView([51.504269, -0.113356], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'swashbuckler.cify6jkdd02dttcm0s1bknyqr',
  accessToken: 'pk.eyJ1Ijoic3dhc2hidWNrbGVyIiwiYSI6ImNpZnk2amtsYjAyYTh0NG03ZnAyaDFuaTIifQ.zL7e_N3nod_-P_D9skbAMg'
}).addTo(map);

var mygeoJSON = {
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-0.110464,51.502599],
      [-0.11273900000000002,51.504095],
      [-0.112567,51.504549],
      [-0.112009,51.504949],
      [-0.109863,51.505377],
      [-0.108232,51.506232000000004],
      [-0.106645,51.50746],
      [-0.106173,51.509223],
      [-0.1054,51.512161],
      [-0.103683,51.512962],
      [-0.101366,51.51323],
      [-0.094242, 51.513016],
      [-0.091667,51.51323],
      [-0.08905843,51.5134047]]
  },
};

L.geoJson(mygeoJSON).addTo(map);

var pointsArray = mygeoJSON.geometry.coordinates;

function pythag(a, b) {
  return eightdp(Math.sqrt(eightdp(a * a + b * b)));
}

function eightdp(num) {
  return Math.round(num * 100000000) / 100000000;
}


routeLen = [];

pointsArray.reduce(function(prev, curr, index) {
  if (index === 0) {} else {
    routeLen.push(
      pythag(curr[0] - prev[0], curr[1] - prev[1])
    );
  }
  return curr;
});


var routeLenSum = routeLen.reduce(function(prev, curr, index) {
  return prev + curr;
}, 0);

console.log('lenghts', routeLen);
console.log(routeLenSum);

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

console.log(timeStepsArr);
console.log(timeStepsCum);


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
  console.log(bounds);
  var percentageTravelled = interpolate(bounds[0], bounds[1], time);
  return coordsBetweenTwoPoints(points[0],points[1],percentageTravelled);

}

function interpolate(a, b, t) {
  return (t - a) / (b - a);
}

function coordsBetweenTwoPoints(coordA, coordB, fraction) {
  return [coordA[0] + (coordB[0] - coordA[0]) * fraction,
    coordA[1] + (coordB[1] - coordA[1]) * fraction
  ];
}

console.log(getCoords(239));

function switchCoords(coordsArray) {
  return [coordsArray[1], coordsArray[0]];
}
var train = L.marker(switchCoords(getCoords(212))).addTo(map);
//var marker = L.marker([51.504269, -0.113356], {'color': 'red'}).addTo(map);
//var newmarker = L.marker([51.513404, -0.088766]).addTo(map);
  // icon: L.mapbox.marker.icon({
  //   'marker-color': 'red'
  //   'size':



// map.fitBounds(polyline.getBounds());
