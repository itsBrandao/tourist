async function login() {

    let email = document.getElementById("email").value;
    let pw = document.getElementById("pw").value;

    if (email != "" && pw != "") { //Verificar se o input do email não está vazio
        try {
            
            let utilizador = await $.ajax({
                url: "/api/utilizadores/login?email="+email+"&password="+pw,
                method: "get",
                dataType: "json"
            });

            if (utilizador.success == 1) {
                sessionStorage.setItem("user", JSON.stringify(utilizador.data));
                window.location = "account.html";
            } 
            else {
                alert(utilizador.msg);
            }

            } catch (err) {
                console.log(err);
                if (err.status == 404) {
                    alert(err.responseJSON.msg);
                }
            }

    }
    else {
        alert("Escreve um email/password");
    }

}