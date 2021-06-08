
var map;
var user = JSON.parse(sessionStorage.getItem("user"));
var locais = [];
var markerGroup;
var route = null;

window.onload = function () {

    document.getElementById("username").innerHTML = user.user_name;

    setupMap(); 
    loadLocais();

}

function setupMap() {
    map = L.map('mapa',{minZoom: 12}).setView(new L.LatLng(38.7476289, -9.1518309), 13);

    markerGroup = L.layerGroup().addTo(map);

    L.tileLayer('https://api.mapbox.com/styles/v1/pcmiguel/ckhsyjp813gxb19qq3eqydsmu/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicGNtaWd1ZWwiLCJhIjoiY2toc3lncG1zMGllajJxcGkxYnNjanVieCJ9.yfUra6VpwwsP4dGk9badRA', {
        tileSize: 512,
        zoomOffset: -1,
        attribution: '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

}

async function loadLocais() {

    try {

        let locais = await $.ajax({
            url: "/api/locais",
            method: "get",
            dataType: "json"
        });

        let html = "";
        for (let local of locais) {
            html += "<button id='"+local.local_id+"' class='header-btn' onclick='selecionarLocal("+local.local_id+","+local.local_latitude+","+local.local_longitude+");'><h2>"+local.local_name+"</h2></button>";

        }
        document.getElementById("lista-locais").innerHTML = html;

    } catch(err) {
        console.log(err);
        if (err.status == 404) {

        }
    }

}

function selecionarLocal(id, lat, lnt) {

    if (verificarLocal(id)) {
        document.getElementById(id).style.backgroundColor = "#EDEDED";
        locais.pop(indexLocal(id));
        map.removeLayer(markerGroup);
    }
    else {
        document.getElementById(id).style.backgroundColor = "#000";
        locais.push({id: id, lat: lat, lnt: lnt});
        L.marker(new L.LatLng(lat, lnt)).addTo(markerGroup);
        map.panTo(new L.LatLng(lat, lnt));
    }
    console.log(markerGroup);
    getRoute();

}

function indexLocal(y) {

    let result = 0;
    for (let x in locais) {
        if(locais[x].id == y) {
            result = x;
            break;
        }
    }
    return result;

}

function verificarLocal(y) {

    let result = false;
    for (let x in locais) {
        if(locais[x].id == y) {
            result = true;
            break;
        }
    }
    return result;

}

function profile() {
    window.location = "profile.html";
}

function novarota() {
    window.location = "novarota.html";
}

function rotas() {
    window.location = "rotas.html";
}

function getRoute() {

    let waypoints = [];

    for (let x in locais) {
        waypoints.push(L.latLng(locais[x].lat, locais[x].lnt));
    }

    if (route != null) { //Vai remover a rota se nao for null para não ficar duplicado
        map.removeControl(route);
    }

    route = L.Routing.control({
        waypoints: waypoints,
        waypointMode: 'snap',
        createMarker: function() {} //Remover Waypoints
      }).addTo(map);

      document.getElementsByClassName("leaflet-control-container")[0].style.display = "None";
}
