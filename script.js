const timeE = document.getElementById('time')
const currentweatherItemsE = document.getElementById('current-weather-items')
const timezoneE = document.getElementById('timezone')
const countryE = document.getElementById('country')
const currentTempE = document.getElementById('current-temp')
const currentTempforecastE = document.getElementById('current-temp-forecast')
const weatherForecastE = document.getElementById('weather-forecast')

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const API_KEY = '8c7d08b07859b100fccebb7948dcb3cc'


setInterval(() => {

    const time = new Date()
    const hour = time.getHours()
    const minutes = time.getMinutes()

    const ampm = hour >= 12 ? 'PM' : 'AM'

    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour

    const hh = hoursIn12HrFormat < 10 ? `0${hoursIn12HrFormat}` : hoursIn12HrFormat
    const mm = minutes < 10 ? `0${minutes}` : minutes

    timeE.innerHTML = hh + ':' + mm + ' ' + `<span id="am-pm">${ampm}</span>`

}, 1000);
getWeatherData()
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {

        let { latitude, longitude } = success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data)
            showWeatherData(data)
        })
    })
}

function showWeatherData(data) {

    let { humidity, pressure, clouds, wind_speed, temp } = data.current
    const humid = document.getElementById('humidity')
    const Airpressure = document.getElementById('pressure')
    const rain = document.getElementById('rain')
    const wind = document.getElementById('wind')
    const Currenttemp = document.getElementById('current-temp')
    const timeZone = document.getElementById('time-zone')



    timeZone.innerHTML = `${data.timezone}`

    humid.innerHTML = `${humidity} %`
    Airpressure.innerHTML = `${pressure} PS`
    rain.innerHTML = `${clouds} %`
    wind.innerHTML = `${wind_speed} km/h`
    Currenttemp.innerHTML = `${temp} &#176;C`

    let otherDayForecast = ''
    data.daily.forEach((day, idx) => {

        const unixTimestamp = day.dt
        const miliseconds = unixTimestamp * 1000
        const dateobject = new Date(miliseconds)
        const utc = dateobject.toLocaleString()

        if (idx == 0) {


            currentTempforecastE.innerHTML =
                ` <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather-icon">
                <div class="other">

                    <div class="day">${dateobject.toLocaleString("en-US", { weekday: "long" })}</div>
                    <div class="temp">
                    <div>Max: ${day.temp.max} &#176;C</div>
                    <div>Min: ${day.temp.min} &#176;C</div>
                    </div>

                </div>`
        }
        else {
            otherDayForecast +=
                `<div class="weather-forecast-item">
            <div class="day">${dateobject.toLocaleString("en-US", { weekday: "long" })}</div>
            <div class="temp">${day.temp.max} &#176;C</div>

        </div>`
        }
    })


    weatherForecastE.innerHTML = otherDayForecast;
}

