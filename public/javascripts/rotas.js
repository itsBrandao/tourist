var user = JSON.parse(sessionStorage.getItem("user"));
window.onload = function() {

    document.getElementById("username").innerHTML = user.user_name;
    loadRotas();

}

async function loadRotas() {

    try {

        rotas = await $.ajax({
            url: "/api/rotas",
            method: "get",
            dataType: "json"
        });

        let html = "";
        for (let rota of rotas) {
            html += "<button id='"+rota.rota_id+"' class='header-btn2' onclick=''><h2>"+rota.rota_name+"</h2></button>";
        }
        document.getElementById("lista-rotas").innerHTML = html;

    } catch(err) {
        console.log(err);
    }

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