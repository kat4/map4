var map = L.map('map').setView([51.504269, -0.113356], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'swashbuckler.cify6jkdd02dttcm0s1bknyqr',
  accessToken: 'pk.eyJ1Ijoic3dhc2hidWNrbGVyIiwiYSI6ImNpZnk2amtsYjAyYTh0NG03ZnAyaDFuaTIifQ.zL7e_N3nod_-P_D9skbAMg'
}).addTo(map);

//L.polyline([[51.504269, -0.113356],[51.513404, -0.088766]], {color:'#66CCCC'}).addTo(map);

var mygeoJSON = {
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [[-0.110464,51.502599], [-0.11273900000000002,51.504095], [-0.112567,51.504549], [-0.112009,51.504949], [-0.109863,51.505377], [-0.108232,51.506232000000004], [-0.106645,51.50746], [-0.106173,51.509223], [-0.1054,51.512161], [-0.103683,51.512962], [-0.101366,51.51323], [-0.094242, 51.513016], [-0.091667,51.51323]]

  },
};

L.geoJson(mygeoJSON).addTo(map);

var PurpleTrainIcon = L.icon({
      iconUrl: '/assets/PurpleTrain.png',
      iconSize: [100, 50], // size of the icon
      iconAnchor: [0  , 2], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
var BlueTrainIcon = L.icon({
      iconUrl: '/assets/BlueTrain.png',
      iconSize: [100, 50], // size of the icon
      iconAnchor: [0  , 2], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
var RedTrainIcon = L.icon({
      iconUrl: '/assets/RedTrain.png',
      iconSize: [100, 50], // size of the icon
      iconAnchor: [0  , 2], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
var GreenTrainIcon = L.icon({
      iconUrl: '/assets/GreenTrain.png',
      iconSize: [100, 50], // size of the icon
      iconAnchor: [0  , 2], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

var marker = L.marker([51.504269, -0.113356], {icon: PurpleTrainIcon}).addTo(map);
//var newmarker = L.marker([51.513404, -0.088766]).addTo(map);
  // icon: L.mapbox.marker.icon({
  //   'marker-color': 'red'
  //   'size':



// map.fitBounds(polyline.getBounds());
