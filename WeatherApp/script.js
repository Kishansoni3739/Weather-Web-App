async function getWeather(cityName){
    let apiKey = 'c6111f82ee0ff871bc29343d5f47ba8b'
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    const response = await fetch(apiUrl);
    var data = await response.json();
    return data;
}

let searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener("click", async () => {
    let cityName = document.querySelector('#city-input').value;
    let data = await getWeather(cityName);
    let imgSrc;
    if (data.cod == '200')
    {
        let currWeather = data.weather[0].main;
        if (currWeather == 'Clouds'){
            imgSrc = 'clouds';
        } else if (currWeather == 'Haze'){
            imgSrc = 'haze'
        }
        else if(currWeather == 'Smoke'){
            imgSrc = 'smog'
        }
        else if(currWeather == 'Rain'){
            imgSrc = 'rain'
        }
        else if(currWeather == 'Clear'){
            imgSrc = 'clear'
        }
        else if(currWeather == 'Snow'){
            imgSrc = 'snow'
        }
        
        document.querySelector(".info").innerHTML = `<img src="resources/images/${imgSrc}.png" id="Weather-img" alt="">
        <div class="weather-info">
            <span id="city">${data.name}</span>
            <p id="temperature">${Math.round(data.main.temp)} ℃</p>
            <div class="humidity-wind">
                <div class="humidity"><img src="resources/icons/humidity.svg" alt=""><span>${data.main.humidity} %</span></div>
                <div class="wind"><img src="resources/icons/wind.svg" alt=""><span>${Math.round(data.wind.speed)} km/h</span></div>
            </div>
        </div>`
    }
    else if (data.cod == '404')
    {
        document.querySelector(".info").innerHTML =`<img src="resources/images/no data.jpg" id="Weather-img" alt="">
        <div class="weather-info">
            <span id="city">Not Found</span>
        </div>`
    }
});


