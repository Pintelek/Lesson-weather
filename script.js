const SearchBtn = document.querySelector('.search-btn');
const citi = document.querySelector('.search');
const GPS = document.querySelector('.location-logo');
let geo;
let lon1;
let lat1;

//===========получение Геоданных===========
GPS.onclick = getGeoposition;


function getGeoposition(){
  geo = navigator.geolocation;
  geo.getCurrentPosition(function(position){
    lat1 = position.coords.latitude;
    lon1 = position.coords.longitude;
    getWeater()
  });
  
  console.log('geolocation' in navigator)
}

/////===========получение названия города======
 citi.onkeydown = (e)=> {
  if(e.key == 'Enter'){
    getCitiCoordinate()
  }
}
SearchBtn.onclick = getCitiCoordinate;

//================================================================================
function getCitiCoordinate(){
  if(!citi.value){
    console.log(2);
      getGeoposition();
      return;
  }
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${citi.value}&limit=1&appid=57da65640cf3a7d0e0d8829f4348de3a`)
      .then(function(resp) {return resp.json() })
      .then(function(dataName) { 
        console.log(dataName);
        lat1 = dataName[0].lat
        lon1 = dataName[0].lon
        
         console.log(lat1 + " " + lon1);
         getWeater()
    });
    
  }
//===============================================
function getWeater(){
  console.log(lat1)
  if(!lat1){
    console.log(1);
    if(citi.value){
      console.log(2);
        getCitiCoordinate();
        return;
      }
    else {
      getGeoposition();
      return;
      // console.log(lat1, lon1)
    }
  }
  
  // console.log(citi.value)
  console.log(lat1, lon1)
  
  
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat1}&lon=${lon1}&lang=ru&units=metric&cnt=5&appid=57da65640cf3a7d0e0d8829f4348de3a`)
    .then(function(resp) {return resp.json() })
    .then(function(data) { 
        console.log(data);

        document.querySelector('.location-title').textContent = data.city.name;
        document.querySelector('.weather').innerHTML = Math.round(data.list[0].main.temp) + '&deg';
        document.querySelector('.rainfall').innerHTML = `${data.list[0].weather[0].description}`;
        document.querySelector('.rainfall-icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png" alt="">`;
        document.querySelector('.speed-wind').innerHTML = `Ветер ${data.list[0].wind.speed} м/с`;
        document.querySelector('.now-time').innerHTML = date_time();
      setInterval(function(){document.querySelector('.now-time').innerHTML = date_time();
      },1000);
    });
};

//===================
function date_time(){
  var current_datetime = new Date();
  var day = (current_datetime.getDate());
  var month = new Array("января","февраля","марта", "апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря");
  var monthNum = (current_datetime.getMonth());
  var year = current_datetime.getFullYear();
  var hours = (current_datetime.getHours());
  var minutes = (current_datetime.getMinutes());
  var seconds = (current_datetime.getSeconds());

  return day+' '+(month[monthNum])+ ' ' +year+ ' ' +"г." + ' ' +hours+":"+minutes + ":"+ seconds;
};
 




