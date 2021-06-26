var user = JSON.parse(sessionStorage.getItem("user"));
var localId = JSON.parse(sessionStorage.getItem("localId"));
var map;
var markerGroup;
var route = null;

window.onload = function () {

    document.getElementById("username").innerHTML = user.user_name;
    setupMap();
    loadInfoLocal();

}

function setupMap() {
    map = L.map('mapa',{minZoom: 12}).setView(new L.LatLng(38.7476289, -9.1518309), 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/pcmiguel/ckhsyjp813gxb19qq3eqydsmu/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicGNtaWd1ZWwiLCJhIjoiY2toc3lncG1zMGllajJxcGkxYnNjanVieCJ9.yfUra6VpwwsP4dGk9badRA', {
        tileSize: 512,
        zoomOffset: -1,
        attribution: '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

}

async function loadInfoLocal() {

    try {

        let local = await $.ajax({
            url: "/api/locais/"+localId,
            method: "get",
            dataType: "json"
        });

        let lat = local.local_latitude;
        let lnt = local.local_longitude;

        L.marker(new L.LatLng(lat, lnt)).addTo(map);
        map.panTo(new L.LatLng(lat, lnt));

        document.getElementById("desc").innerHTML = local.local_description;
        

    } catch(err) {
        console.log(err);
    }

}

function novarota() {
    window.location = "novarota.html";
}

function rotas() {
    window.location = "minhasrotas.html";
}