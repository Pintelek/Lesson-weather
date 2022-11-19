let citi = document.querySelector('.i-1');
document.querySelector('.b-1').onclick = f1;
function f1(){
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${citi.value}&limit=1&appid=57da65640cf3a7d0e0d8829f4348de3a`)
.then(function(resp) {return resp.json() })
.then(function(dataName) { 
    console.log(dataName);
   let lat1 = dataName[0].lat
   let lon1 = dataName[0].lon
   console.log(lat1 + " " + lon1)
            fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat1}&lon=${lon1}&limit=1&appid=57da65640cf3a7d0e0d8829f4348de3a&lang=ru`)
             // fetch('http://api.openweathermap.org/geo/1.0/direct?q=санкт-петербург,ru&limit=1&appid=57da65640cf3a7d0e0d8829f4348de3a')

                .then(function(resp) {return resp.json() })
                .then(function(data) { 
                    console.log(data);
                    document.querySelector('.name-citi').textContent = data.name;
                    document.querySelector('.temperatura').innerHTML = Math.round(data.main.temp - 273) + '&deg';
                    document.querySelector('.weather-list-name').innerHTML = `${data.weather[0].description
                    }`;
                    document.querySelector('.weather-list-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">`;
        
    })
});
}

 




