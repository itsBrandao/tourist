let user = JSON.parse(sessionStorage.getItem("user"));
var utilizadorID= user.user_id;
var moderador= user.user_moderador;

console.log(user.user_fullname)
console.log(utilizadorID)

window.onload = async function () {
  document.getElementById("userName").innerHTML=user.user_fullname;
  if(moderador==0){
    let userDropBox= "<a href='#' class='selected'>Conta</a>"+
    "<a href='parques.html' >Parques</a>"+
    "<a href='#' onclick='logout()'>Logout</a>";
    document.getElementById("userDropBox").innerHTML = userDropBox;

  }
  if(moderador==1){
    console.log("kaksdkd");
    let userDropBox= "<a href='#' class='selected'>Conta</a>"+
    "<a href='parques.html' >Parques</a>"+
    "<a href='addparque.html'>Adicionar Parque</a>"+
    "<a href='#' onclick='logout()'>Logout</a>";
    document.getElementById("userDropBox").innerHTML = userDropBox;

  }
}


function logout(){
  sessionStorage.clear();
  window.location = "login.html";
}