var user = JSON.parse(sessionStorage.getItem("user"));
window.onload = function() {

    document.getElementById("username").innerHTML = user.user_name;
    document.getElementById("username2").innerHTML = user.user_name
    document.getElementById("email").innerHTML = user.user_email;;

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