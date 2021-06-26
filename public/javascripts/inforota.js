var user = JSON.parse(sessionStorage.getItem("user"));
var rotaId = JSON.parse(sessionStorage.getItem("rotaId"));
var map;
var route = null;
var starsRating = 0;

window.onload = function () {

    document.getElementById("username").innerHTML = user.user_name;
    setupMap();
    loadInfoRota();
    loadFeedbacks();

    var stars = [...document.getElementsByClassName("rating__star")];

    function executeRating(stars) {
        const starClassActive = "rating__star fas fa-star";
        const starClassInactive = "rating__star far fa-star";
        const starsLength = stars.length;
        let i;
        stars.map((star) => {
            star.onclick = () => {
            i = stars.indexOf(star);
    
            if (star.className===starClassInactive) {
                for (i; i >= 0; --i) {
                    stars[i].className = starClassActive;
                } 
            } else {
                for (i; i < starsLength; ++i) {
                    stars[i].className = starClassInactive;
                } 
            }
            };
        });
    }
    executeRating(stars);

}

function setupMap() {
    map = L.map('mapa',{minZoom: 12}).setView(new L.LatLng(38.7476289, -9.1518309), 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/pcmiguel/ckhsyjp813gxb19qq3eqydsmu/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicGNtaWd1ZWwiLCJhIjoiY2toc3lncG1zMGllajJxcGkxYnNjanVieCJ9.yfUra6VpwwsP4dGk9badRA', {
        tileSize: 512,
        zoomOffset: -1,
        attribution: '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

}

async function loadInfoRota() {

    try {

        let rota = await $.ajax({
            url: "/api/rotas/"+rotaId,
            method: "get",
            dataType: "json"
        });
        

        getRoute(rota.locais);
        
        console.log(rota);
        document.getElementById("desc").innerHTML = rota.rota_description;
        

    } catch(err) {
        console.log(err);
    }

}

function getRoute(locais) {

    let waypoints = [];

    for (let local of locais) {
        let lat = local.local_latitude;
        let lnt = local.local_longitude;
        let marker = L.marker(new L.LatLng(lat, lnt)).addTo(map);
        
        //Vai criar o popup de quando coloca o rato por cima do local
        marker.bindPopup("<section class='popup'>"+
        "<h1>"+local.local_name+"</h1>"+
        "<h5>Carregar para mais informação </h5>"+
        "</section>");

        //Quando passa o rato por cima do local faz aparecer o popup
        marker.on('mouseover', function(){
            marker.openPopup();
        });

        //Quando tira o rato por cima do local fecha o popup
        marker.on('mouseout', function(){
            marker.closePopup();
        });

        //quando clica num local no mapa
        marker.on("click", function() {
            sessionStorage.setItem("localId", local.local_id);
            window.location = "infolocal.html";
        })

        waypoints.push(L.latLng(lat, lnt));
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

function novarota() {
    window.location = "novarota.html";
}

function rotas() {
    window.location = "minhasrotas.html";
}

async function enviarComentario() {
    var starsRating = [...document.getElementsByClassName("rating__star fas fa-star")];

    let comentario = document.getElementById("comentario").value;

    if (comentario != "" && starsRating.length != 0) {

        let data = {
            userId: user.user_id,
            feedback: comentario,
            estrelas: starsRating.length
        }
    
        try {
    
            let result = await $.ajax({
                url: "/api/rotas/"+rotaId+"/newFeedback",
                method: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                dataType: "json"
            });

            alert("Comentário enviado!");
            window.location = "inforota.html";

        } catch(err) {
            console.log(err);
        }

    } 
    else {
        alert("Por favor coloque um comentário e uma quantidade de estrelas!");
    }
}

async function loadFeedbacks() {

    try {

        let feedbacks = await $.ajax({
            url: "/api/rotas/"+rotaId+"/feedbacks",
            method: "get",
            dataType: "json"
        });
        
        let html = "";
        for (let feedback of feedbacks) {

            html += "<div class='box-feedback'>";
            html += "<span>"+feedback.user_name+"</span>";
            html += "<p>"+feedback.feedback+"</p>";

            if (feedback.estrelas == 5) {
                html += "<div><span class='rating__star2 fas fa-star'></span><span class='rating__star2 fas fa-star'></span><span class='rating__star2 fas fa-star'></span><span class='rating__star2 fas fa-star'></span><span class='rating__star2 fas fa-star'></span></div>";
            }
            else if (feedback.estrelas == 4) {
                html += "<div><span class='rating__star2 fas fa-star'></span><span class='rating__star2 fas fa-star'></span><span class='rating__star2 fas fa-star'></span><span class='rating__star2 fas fa-star'></span><span class='rating__star2 far fa-star'></span></div>";
            }
            else if (feedback.estrelas == 3) {
                html += "<div><span class='rating__star2 fas fa-star'></span><span class='rating__star2 fas fa-star'></span><span class='rating__star2 fas fa-star'></span><span class='rating__star2 far fa-star'></span><span class='rating__star2 far fa-star'></span></div>";
            }
            else if (feedback.estrelas == 2) {
                html += "<div><span class='rating__star2 fas fa-star'></span><span class='rating__star2 fas fa-star'></span><span class='rating__star2 far fa-star'></span><span class='rating__star2 far fa-star'></span><span class='rating__star2 far fa-star'></span></div>";
            }
            else if (feedback.estrelas == 1) {
                html += "<div><span class='rating__star2 fas fa-star'></span><span class='rating__star2 far fa-star'></span><span class='rating__star2 far fa-star'></span><span class='rating__star2 far fa-star'></span><span class='rating__star2 far fa-star'></span></div>";
            }
            html += "</div>";

        }
        document.getElementById("comentarios").innerHTML = html;

    } catch(err) {
        console.log(err);
    }

}