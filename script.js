// function getLocation() {
//    var geolocation = navigator.geolocation;
//    geolocation.getCurrentPosition(showLocation, errorHandler);
// }
//  console.log(getLocation())



let citi = document.querySelector('.search');
citi.onkeydown = (e)=> {
  if(e.key == 'Enter'){
    f1()
  }
}
document.querySelector('.search-btn').onclick = f1;
function f1(){
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${citi.value}&limit=1&appid=57da65640cf3a7d0e0d8829f4348de3a`)
.then(function(resp) {return resp.json() })
.then(function(dataName) { 
    // console.log(dataName);
   let lat1 = dataName[0].lat
   let lon1 = dataName[0].lon
  //  console.log(lat1 + " " + lon1)
            fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat1}&lon=${lon1}&limit=1&appid=57da65640cf3a7d0e0d8829f4348de3a&lang=ru`)
             // fetch('http://api.openweathermap.org/geo/1.0/direct?q=санкт-петербург,ru&limit=1&appid=57da65640cf3a7d0e0d8829f4348de3a')

                .then(function(resp) {return resp.json() })
                .then(function(data) { 
                    console.log(data);
                    document.querySelector('.location-title').textContent = data.name;
                    document.querySelector('.weather').innerHTML = Math.round(data.main.temp - 273) + '&deg';
                    document.querySelector('.rainfall').innerHTML = `${data.weather[0].description}`;
                    document.querySelector('.rainfall-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">`;
                    document.querySelector('.speed-wind').innerHTML = `Ветер ${data.wind.speed} м/с`;
                    document.querySelector('.now-time').innerHTML = date_time();
                      function date_time()
                        {
                            var current_datetime = new Date();
                            var day = (current_datetime.getDate());
                            var month = new Array("января","февраля","марта", "апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря");
                            var monthNum = (current_datetime.getMonth());
                            var year = current_datetime.getFullYear();
                            var hours = (current_datetime.getHours());
                            var minutes = (current_datetime.getMinutes());
                            var seconds = (current_datetime.getSeconds());

                            return day+' '+(month[monthNum])+ ' ' +year+ ' ' +"г." + ' ' +hours+":"+minutes + ":"+ seconds;
                        }
                     setInterval(function () {document.querySelector('.now-time').innerHTML = date_time();
                      function date_time()
                        {
                            var current_datetime = new Date();
                            var day = (current_datetime.getDate());
                            var month = new Array("января","февраля","марта", "апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря");
                            var monthNum = (current_datetime.getMonth());
                            var year = current_datetime.getFullYear();
                            var hours = (current_datetime.getHours());
                            var minutes = (current_datetime.getMinutes());
                            var seconds = (current_datetime.getSeconds());

                            return day+' '+(month[monthNum])+ ' ' +year+ ' ' +"г." + ' ' +hours+":"+minutes + ":"+ seconds;
                        }
                      },1000);
    })
});
}

 




