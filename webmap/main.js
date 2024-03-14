//var map = L.map('map').setView([-6.858663, 107.915268], 13);

var mbAttrThunderforestOpenCycleMap = '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    mbUrlThunderforestOpenCycleMap ='https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=1d5650cfc20f4b96961bb1bd8af3283b'

var mbAttrEsri_WorldImagery = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    mburlEsri_WorldImagery = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' 

var mbAttrOpenStreetMap_Mapnik = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    mbUrlOpenStreetMap_Mapnik = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'

var mbAttrOpenTopoMap = 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    mbUrlOpenTopoMap = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'

// Setingan Ukuran Peta Basemap
var ThunderforestOpenCycleMap = L.tileLayer(mbUrlThunderforestOpenCycleMap, {maxZoom: 17, attribution: mbAttrThunderforestOpenCycleMap}),
    Esri_WorldImagery = L.tileLayer(mburlEsri_WorldImagery, {maxZoom: 17, attribution: mbAttrEsri_WorldImagery}),
    OpenStreetMap_Mapnik = L.tileLayer(mbUrlOpenStreetMap_Mapnik, {maxZoom: 17, attribution: mbAttrOpenStreetMap_Mapnik}),
    OpenTopoMap = L.tileLayer(mbUrlOpenTopoMap, {maxZoom: 17, attribution: mbAttrOpenTopoMap})

// Titik tengah Halaman Web adalah Kabupaten Sumedang
var map = L.map('map',{
	center: [-6.877703, 107.788925],
	zoom: 15,
	//maxBounds: bounds,
	layers: [Esri_WorldImagery]
});

//Data Geojson
$.getJSON("geojson/AOI_desa.geojson", function(data){
    var tes = L.geoJson(data);
    tes.addTo(map);
})

// Layer yang akan diload ke peta WebGIS
var baselayers = {
	"Basemap Tunjuk" : ThunderforestOpenCycleMap,
	"Esri World Imagery" : Esri_WorldImagery,
	"Open Street Map Mapnik" : OpenStreetMap_Mapnik,
    "Open Topo Map" : OpenTopoMap
}

// Layer Control Peta WebGIS
L.control.layers(baselayers, null,{
	position: 'topleft',
	collapsed: false
}).addTo(map);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Coordinat " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

