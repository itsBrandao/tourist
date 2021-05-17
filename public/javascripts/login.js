
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


async function register() {

    let username = document.getElementById("username2").value;
    let password = document.getElementById("password2").value;
    let email = document.getElementById("email").value;
    let gender = document.getElementById("gender").value;
    let birthday = document.getElementById("birthday").value;

    if (username != "" && password != "" && email != "") {

        try {
            
            let info = {
                username: username,
                password: password,
                email: email,
                gender: gender,
                birthday: birthday
            }
            
            let utilizador = await $.ajax({
                url: "/api/users/register",
                method: "post",
                data: JSON.stringify(info),
                contentType: "application/json",
                dataType: "json"
            });

            alert("Registado!");

        } catch (err) {
            console.log(err);
        }

    } else {
        alert("Escreva o seu username e password!");
    }

}