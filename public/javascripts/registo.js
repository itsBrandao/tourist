async function registo() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let pw = document.getElementById("pw").value;
    let data = document.getElementById("date").value;
    let nif = document.getElementById("nif").value;
    let telemovel = document.getElementById("telemovel").value;

    if (email != "" && pw != ""&& pw != "" && data != "" && nif != "" && telemovel != "" && name != "") { //Verificar se o input do email não está vazio
        try {

            let info = {
                fullname: name,
                email: email,
                password: pw,
                birthday: data,
                mobile: telemovel,
                nif: nif
            }
            
            let utilizador = await $.ajax({
                url: "/api/utilizadores/register?email="+email+"&password="+pw,
                method: "post",
                data: JSON.stringify(info),
                contentType: "application/json",
                dataType: "json"
            });

            var token;
            if (utilizador.success == 1) {
               
                token = prompt("Coloque o código enviado para o seu email:");

                let info = {
                    email: email,
                    password: pw,
                    token: token
                }

                let verify = await $.ajax({
                    url: "/api/utilizadores/verify",
                    method: "put",
                    data: JSON.stringify(info),
                    contentType: "application/json",
                    dataType: "json"
                });

                if (verify.success === 1) {
                    
                    alert("Conta verificada com sucesso!");
                    window.location = "cuvp.html";
                }        

            } else {
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