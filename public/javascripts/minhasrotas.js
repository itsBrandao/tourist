var user = JSON.parse(sessionStorage.getItem("user"));
window.onload = function() {

    document.getElementById("username").innerHTML = user.user_name;
    loadMinhasRotas();

}

async function loadMinhasRotas() {

    try {

        let rotas = await $.ajax({
            url: "/api/users/"+user.user_id+"/rotas",
            method: "get",
            dataType: "json"
        });

        if (rotas.length == 0) {
            document.getElementById("lista-rotas").innerHTML = "Nenhuma rota criada!";
        }

        let html = "";
        for (let rota of rotas) {
            html += "<button id='"+rota.rota_id+"' class='header-btn2' onclick='infoRota("+rota.rota_id+");'><h2>"+rota.rota_name+"</h2></button>";
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
    window.location = "minhasrotas.html";
}

function infoRota(id) {

    sessionStorage.setItem("rotaId", id);
    window.location = "infoRota.html";

}