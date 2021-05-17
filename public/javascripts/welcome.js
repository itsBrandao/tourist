function register() {
    window.location = "registo.html";
}


async function login() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username != "" && password != "") {

        try {
            
            let utilizador = await $.ajax({
                url: "/api/users/login?username="+username+"&password="+password,
                method: "get",
                dataType: "json"
            });

            sessionStorage.setItem("user", JSON.stringify(utilizador));
            window.location = "novarota.html";

        } catch (err) {
            console.log(err);
            if (err.status == 404) {
                alert(err.responseJSON.msg);
            }
        }

    } else {
        alert("Escreva o seu username e password!");
    }

}

