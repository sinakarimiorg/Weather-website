const $ = document

let addCityBtn = $.querySelector('.add-city-btn')
let searchCityBox = $.querySelector('.search-box')
let searchInput = $.querySelector('.search-input')
let searchButton = $.querySelector('.search-button')
let closeSearchInputBtn = $.querySelector('.close-search-bar-btn')
let changeDegreeTypeBtn = $.querySelector('.degree-type-switch')
let cityName = $.querySelector('.city-name')
let countryName = $.querySelector('.country-name')
let sunriseTime = $.querySelector('.sunrise-time')
let sunsetTime = $.querySelector('.sunset-time')
let todayDate = $.querySelector('.today-date')
let todayMonth = $.querySelector('.today-month')
let mainTemperature = $.querySelector('.temperature')
let weatherType = $.querySelector('.weather-type')
/////weather icons
let sunnyIcon = $.querySelector('.sunny')
let cloudyIcon = $.querySelector('.cloudy')
let windyIcon = $.querySelector('.windy')
let rainyIcon = $.querySelector('.rainy')
let snowyIcon = $.querySelector('.snowy')
let profileBarBtn = $.querySelector('.profile-bar-btn')


let apiData = {
    url: 'https://api.openweathermap.org/data/2.5/weather?q=',
    apiKey: '604233a90ebcb24af0451d05bae20f7b'
}

addCityBtn.addEventListener('click', () => {
    addCityBtn.classList.add('d-none')
    searchCityBox.classList.remove('d-none')
})

closeSearchInputBtn.addEventListener('click', () => {
    addCityBtn.classList.remove('d-none')
    searchCityBox.classList.add('d-none')
    searchInput.value = ''
})

let fetchFunc = (cityName) => {
    fetch(`${apiData.url}${cityName}&appid=${apiData.apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
            showData(data)
        })
}

function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = (hour.toString().length === 1 ? `0${hour}` : hour) + ':' + (min.toString().length === 1 ? `0${min}` : min);
    return {
        time: time,
        date,
        month
    };
}

let hideIcones = () => {
    snowyIcon.classList.add('d-none')
    rainyIcon.classList.add('d-none')
    windyIcon.classList.add('d-none')
    cloudyIcon.classList.add('d-none')
    sunnyIcon.classList.add('d-none')
}

let showData = (data) => {
    console.log(data);
    cityName.innerHTML = data.name
    countryName.innerHTML = data.sys.country
    sunriseTime.innerHTML = timeConverter(data.sys.sunrise).time
    sunsetTime.innerHTML = timeConverter(data.sys.sunset).time
    mainTemperature.innerHTML = `${Math.floor(data.main.temp)}°`
    todayDate.innerHTML = timeConverter(data.sys.sunset).date
    todayMonth.innerHTML = timeConverter(data.sys.sunset).month
    ///////////////weather type section
    let dataTypeWord = data.weather[0].main
    if (dataTypeWord === 'Clouds') {
        weatherType.innerHTML = 'cloudy'
        hideIcones()
        cloudyIcon.classList.remove('d-none')

    } else if (dataTypeWord === 'Rain') {
        weatherType.innerHTML = 'rainy'
        hideIcones()
        rainyIcon.classList.remove('d-none')
    } else if (dataTypeWord === 'Clear') {
        weatherType.innerHTML = 'Sunny'
        hideIcones()
        sunnyIcon.classList.remove('d-none')
    } else if (dataTypeWord === 'Snow') {
        weatherType.innerHTML = 'Sunny'
        hideIcones()
        snowyIcon.classList.remove('d-none')
    }
    else {
        weatherType.innerHTML = data.weather[0].main
        hideIcones()
    }
}

window.addEventListener('load', () => {
    fetchFunc('tehran')
    showData()
})

searchButton.addEventListener('click', function () {
    console.log(searchInput.value);
    if (searchInput.value) {
        fetchFunc(searchInput.value)
        searchInput.value = ''
        showData()
    }
})

searchInput.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        fetchFunc(searchInput.value)
        searchInput.value = ''
        showData()
    }
})