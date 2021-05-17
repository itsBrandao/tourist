let user = JSON.parse(sessionStorage.getItem("user"));
var utilizadorID= user.user_id;
var moderador= user.user_moderador;

console.log(user.user_fullname)
console.log(utilizadorID)

window.onload = async function () {
  document.getElementById("userName").innerHTML=user.user_fullname;
  if(moderador==0){
    let userDropBox= "<a href='#'>Conta</a>"+
    "<a href='parques.html' class='selected' >Parques</a>"+
    "<a href='#' onclick='logout()'>Logout</a>";
    document.getElementById("userDropBox").innerHTML = userDropBox;

  }
  if(moderador==1){
    console.log("kaksdkd");
    let userDropBox= "<a href='#' >Conta</a>"+
    "<a href='parques.html' class='selected'>Parques</a>"+
    "<a href='addparque.html'>Adicionar Parque</a>"+
    "<a href='#' onclick='logout()'>Logout</a>";
    document.getElementById("userDropBox").innerHTML = userDropBox;

    }
    getLocalizacao(); 
} 




function logout(){
  sessionStorage.clear();
  window.location = "login.html";
}




function mapSetup(position){
    latitude=position.coords.latitude;
    longitude=position.coords.longitude;
    map = L.map('map').setView([latitude,longitude], 50);
    markers = new L.LayerGroup().addTo(map);//coloca os markers
    L.tileLayer('https://api.mapbox.com/styles/v1/krscripter/ckigd79nk5gtv19qry86qdzsi/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia3JzY3JpcHRlciIsImEiOiJja2lnZDNlbWQwbmJvMnVxazYwcWU5MDRlIn0.jqnlOPKhrK-r7-Il14uaYQ', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([latitude,longitude]).addTo(map)
        .bindPopup('A sua localização')
        .openPopup();
  }



  function getLocalizacao(){
  
    if(navigator.geolocation){  
      navigator.geolocation.getCurrentPosition(mapSetup);
    }
  }
  