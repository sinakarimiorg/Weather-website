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
//////////weather images
let cloudyImg = $.querySelector('.cloudy-img')
let sunnyImg = $.querySelector('.sunny-img')
let windyImg = $.querySelector('.windy-img')
let rainyImg = $.querySelector('.rainy-img')
let snowyImg = $.querySelector('.snowy-img')
//////////right side
let humidityPercent = $.querySelector('.humidity-percent')
let windQuantity = $.querySelector('.wind-quantity')
let feelsLikeTemp = $.querySelector('.feels-like-temp')
//////////hours section
let firstHour = $.querySelector('.first-hour')
let secondHour = $.querySelector('.second-hour')
let thirdHour = $.querySelector('.third-hour')
let fourthHour = $.querySelector('.fourth-hour')
let fifthHour = $.querySelector('.fifth-hour')
let sixthHour = $.querySelector('.sixth-hour')
let seventhHour = $.querySelector('.seventh-hour')




let apiData = {
    url: 'https://api.openweathermap.org/data/2.5/weather?q=',
    apiKey: '604233a90ebcb24af0451d05bae20f7b',
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

let hideImagesFunc = () => {
    cloudyImg.classList.add('d-none')
    sunnyImg.classList.add('d-none')
    windyImg.classList.add('d-none')
    rainyImg.classList.add('d-none')
    snowyImg.classList.add('d-none')
}

let now = new Date
let nowHour = now.getHours()
let mainTemperatureQuantity;
let feelsLikeTempQuantity;

let showData = (data) => {
    console.log(data);
    cityName.innerHTML = data.name
    countryName.innerHTML = data.sys.country
    sunriseTime.innerHTML = timeConverter(data.sys.sunrise).time
    sunsetTime.innerHTML = timeConverter(data.sys.sunset).time
    mainTemperature.innerHTML = Math.floor(data.main.temp)
    mainTemperatureQuantity = Math.floor(data.main.temp)
    todayDate.innerHTML = timeConverter(data.sys.sunset).date
    todayMonth.innerHTML = timeConverter(data.sys.sunset).month
    ///////////////weather type section
    let dataTypeWord = data.weather[0].main
    if (dataTypeWord === 'Clouds') {
        weatherType.innerHTML = 'cloudy'
        hideIcones()
        cloudyIcon.classList.remove('d-none')
        hideImagesFunc()
        cloudyImg.classList.remove('d-none')

    } else if (dataTypeWord === 'Rain') {
        weatherType.innerHTML = 'rainy'
        hideIcones()
        rainyIcon.classList.remove('d-none')
        hideImagesFunc()
        rainyImg.classList.remove('d-none')
    } else if (dataTypeWord === 'Clear') {
        weatherType.innerHTML = 'Sunny'
        hideIcones()
        sunnyIcon.classList.remove('d-none')
        hideImagesFunc()
        sunnyImg.classList.remove('d-none')
    } else if (dataTypeWord === 'Snow') {
        weatherType.innerHTML = 'Sunny'
        hideIcones()
        snowyIcon.classList.remove('d-none')
        hideImagesFunc()
        snowyImg.classList.remove('d-none')
    }
    else {
        weatherType.innerHTML = data.weather[0].main
        hideIcones()
        hideImagesFunc()
        windyImg.classList.remove('d-none')
    }
    ///////////////Upcoming hours section
    firstHour.innerHTML = `${(nowHour === 24 ? '01' : nowHour + 1)}:00`
    firstHour.innerHTML.length === 5 ? firstHour.innerHTML = firstHour.innerHTML : firstHour.innerHTML = `0${firstHour.innerHTML}`

    secondHour.innerHTML = `${Number(firstHour.innerHTML.slice(0, 2)) === 24 ? '01' : Number(firstHour.innerHTML.slice(0, 2)) + 1}:00`
    secondHour.innerHTML.length === 5 ? secondHour.innerHTML = secondHour.innerHTML : secondHour.innerHTML = `0${secondHour.innerHTML}`

    thirdHour.innerHTML = `${Number(secondHour.innerHTML.slice(0, 2)) === 24 ? '01' : Number(secondHour.innerHTML.slice(0, 2)) + 1}:00`
    thirdHour.innerHTML.length === 5 ? thirdHour.innerHTML = thirdHour.innerHTML : thirdHour.innerHTML = `0${thirdHour.innerHTML}`

    fourthHour.innerHTML = `${Number(thirdHour.innerHTML.slice(0, 2)) === 24 ? '01' : Number(thirdHour.innerHTML.slice(0, 2)) + 1}:00`
    fourthHour.innerHTML.length === 5 ? fourthHour.innerHTML = fourthHour.innerHTML : fourthHour.innerHTML = `0${fourthHour.innerHTML}`

    fifthHour.innerHTML = `${Number(fourthHour.innerHTML.slice(0, 2)) === 24 ? '01' : Number(fourthHour.innerHTML.slice(0, 2)) + 1}:00`
    fifthHour.innerHTML.length === 5 ? fifthHour.innerHTML = fifthHour.innerHTML : fifthHour.innerHTML = `0${fifthHour.innerHTML}`

    sixthHour.innerHTML = `${Number(fifthHour.innerHTML.slice(0, 2)) === 24 ? '01' : Number(fifthHour.innerHTML.slice(0, 2)) + 1}:00`
    sixthHour.innerHTML.length === 5 ? sixthHour.innerHTML = sixthHour.innerHTML : sixthHour.innerHTML = `0${sixthHour.innerHTML}`

    seventhHour.innerHTML = `${Number(sixthHour.innerHTML.slice(0, 2)) === 24 ? '01' : Number(sixthHour.innerHTML.slice(0, 2)) + 1}:00`
    seventhHour.innerHTML.length === 5 ? seventhHour.innerHTML = seventhHour.innerHTML : seventhHour.innerHTML = `0${seventhHour.innerHTML}`
    ///////////////detail boxs Quantities
    windQuantity.innerHTML = Math.floor(data.wind.speed)
    humidityPercent.innerHTML = Math.floor(data.main.humidity)
    feelsLikeTemp.innerHTML = Math.floor(data.main.feels_like)
    feelsLikeTempQuantity =Math.floor(data.main.feels_like)
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

changeDegreeTypeBtn.addEventListener('click', () => {
    changeDegreeTypeBtn.classList.toggle('fahrenheit')
    if (changeDegreeTypeBtn.className === 'degree-type-switch') {
        mainTemperature.innerHTML = mainTemperatureQuantity
        feelsLikeTemp.innerHTML = feelsLikeTempQuantity
    } else {
        mainTemperature.innerHTML = Math.floor(Number(mainTemperature.innerHTML) * 1.8 + 32)
        feelsLikeTemp.innerHTML = Math.floor(Number(feelsLikeTemp.innerHTML) * 1.8 + 32)
    }
})