var user = JSON.parse(sessionStorage.getItem("user"));
window.onload = function() {

    document.getElementById("username").innerHTML = user.user_name;

}

function profile() {
    window.location = "profile.html";
}

function novarota() {
    window.location = "novarota.html";
}

function rotas() {
    window.location = "minhasrotas.html";
}

function criarrota() {
    window.location = "criarrota.html";
}

function rotapersonalizada() {
    window.location = "rotas.html";
}