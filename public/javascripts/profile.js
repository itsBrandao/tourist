var user = JSON.parse(sessionStorage.getItem("user"));
window.onload = function() {

    document.getElementById("username").innerHTML = user.user_name;

}