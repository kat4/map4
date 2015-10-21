var map = L.map('map').setView([102.0, 0.5], 3);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'swashbuckler.cify6jkdd02dttcm0s1bknyqr',
  accessToken: 'pk.eyJ1Ijoic3dhc2hidWNrbGVyIiwiYSI6ImNpZnk2amtsYjAyYTh0NG03ZnAyaDFuaTIifQ.zL7e_N3nod_-P_D9skbAMg'
}).addTo(map);

//L.polyline([[51.504269, -0.113356],[51.513404, -0.088766]], {color:'#66CCCC'}).addTo(map);

var mygeoJSON = {
    "type": "LineString",
    "coordinates": [[51.504269, -0.113356], [51.513404, -0.088766], [104.0, 0.0], [105.0, 1.0]]
};

L.geoJson(mygeoJSON).addTo(map);


//var marker = L.marker([51.504269, -0.113356], {'color': 'red'}).addTo(map);
//var newmarker = L.marker([51.513404, -0.088766]).addTo(map);
  // icon: L.mapbox.marker.icon({
  //   'marker-color': 'red'
  //   'size':



// map.fitBounds(polyline.getBounds());
