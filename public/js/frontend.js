var map = L.map('map').setView([51.509, -0.101], 14);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'swashbuckler.cify6jkdd02dttcm0s1bknyqr',
  accessToken: 'pk.eyJ1Ijoic3dhc2hidWNrbGVyIiwiYSI6ImNpZnk2amtsYjAyYTh0NG03ZnAyaDFuaTIifQ.zL7e_N3nod_-P_D9skbAMg'
}).addTo(map);
// var geojson = { type: 'LineString', coordinates: [[51.504269, -0.113356], [51.513404,-0.088766]] };
// L.geoJson(geojson).addTo(map);

L.polyline([[51.504269, -0.113356],[51.513404, -0.088766]], {color:'#66CCCC'}).addTo(map);

map.fitBounds(polyline.getBounds());





// var myLine = {
//     "type": "LineString",
//     "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
// };
//
// var myStyle = {
//     "color": "#ff7800",
//     "weight": 5,
//     "opacity": 0.65
// };
//
// L.geoJson(myLine, {
//     style: myStyle
// }).addTo(map);
