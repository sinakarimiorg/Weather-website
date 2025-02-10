const $ = document
const html = document.documentElement;
const body = document.body;

let topBarContainer = $.querySelectorAll('.top-bar')
let addCityBtn = $.querySelectorAll('.add-city-btn')
let searchCityBox = $.querySelectorAll('.search-box')
let searchInput = $.querySelectorAll('.search-input')
let searchButton = $.querySelectorAll('.search-button')
let closeSearchInputBtn = $.querySelectorAll('.close-search-bar-btn')
let changeDegreeTypeBtn = $.querySelectorAll('.degree-type-switch')
let cityName = $.querySelectorAll('.city-name')
let countryName = $.querySelectorAll('.country-name')
let sunriseTime = $.querySelectorAll('.sunrise-time')
let sunsetTime = $.querySelectorAll('.sunset-time')
let todayDate = $.querySelectorAll('.today-date')
let todayMonth = $.querySelectorAll('.today-month')
let mainTemperature = $.querySelectorAll('.temperature')
let weatherType = $.querySelectorAll('.weather-type')
/////weather icons
let sunnyIcon = $.querySelectorAll('.sunny')
let cloudyIcon = $.querySelectorAll('.cloudy')
let windyIcon = $.querySelectorAll('.windy')
let rainyIcon = $.querySelectorAll('.rainy')
let snowyIcon = $.querySelectorAll('.snowy')
let profileBarBtn = $.querySelectorAll('.profile-bar-btn')
//////////weather images
let cloudyImg = $.querySelectorAll('.cloudy-img')
let sunnyImg = $.querySelectorAll('.sunny-img')
let windyImg = $.querySelectorAll('.windy-img')
let rainyImg = $.querySelectorAll('.rainy-img')
let snowyImg = $.querySelectorAll('.snowy-img')
//////////right side
let humidityPercent = $.querySelectorAll('.humidity-percent')
let windQuantity = $.querySelectorAll('.wind-quantity')
let feelsLikeTemp = $.querySelectorAll('.feels-like-temp')
//////////hours section
let firstHour = $.querySelectorAll('.first-hour')
let secondHour = $.querySelectorAll('.second-hour')
let thirdHour = $.querySelectorAll('.third-hour')
let fourthHour = $.querySelectorAll('.fourth-hour')
let fifthHour = $.querySelectorAll('.fifth-hour')
let sixthHour = $.querySelectorAll('.sixth-hour')
let seventhHour = $.querySelectorAll('.seventh-hour')
//////////Language Bar Section
const langSelect = document.getElementById('lang');
const englishDiv = document.getElementById('english');
const persianDiv = document.getElementById('persian');



let apiData = {
    url: 'https://api.openweathermap.org/data/2.5/weather?q=',
    apiKey: '604233a90ebcb24af0451d05bae20f7b',
}

addCityBtn.forEach(elem => {
    elem.addEventListener('click', () => {
        topBarContainer.forEach(elem => {
            elem.classList.add('flex-column')
        })
        addCityBtn.forEach(elem => {
            elem.classList.add('d-none')
        })
        searchCityBox.forEach(elem => {
            elem.classList.remove('d-none')
        })
    })
})

closeSearchInputBtn.forEach(elem => {
    elem.addEventListener('click', () => {
        topBarContainer.forEach(elem => {
            elem.classList.remove('flex-column')
        })
        addCityBtn.forEach(elem => {
            elem.classList.remove('d-none')
        })
        searchCityBox.forEach(elem => {
            elem.classList.add('d-none')
        })
        searchInput.forEach(elem => {
            elem.value = ''
        })
    })
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
    snowyIcon.forEach(elem => {
        elem.classList.add('d-none')
    })
    rainyIcon.forEach(elem => {
        elem.classList.add('d-none')
    })
    windyIcon.forEach(elem => {
        elem.classList.add('d-none')
    })
    cloudyIcon.forEach(elem => {
        elem.classList.add('d-none')
    })
    sunnyIcon.forEach(elem => {
        elem.classList.add('d-none')
    })
}

let hideImagesFunc = () => {
    cloudyImg.forEach(elem => {
        elem.classList.add('d-none')
    })
    sunnyImg.forEach(elem => {
        elem.classList.add('d-none')
    })
    windyImg.forEach(elem => {
        elem.classList.add('d-none')
    })
    rainyImg.forEach(elem => {
        elem.classList.add('d-none')
    })
    snowyImg.forEach(elem => {
        elem.classList.add('d-none')
    })
}

let now = new Date
let nowHour = now.getHours()
let mainTemperatureQuantity;
let feelsLikeTempQuantity;

let showData = (data) => {
    cityName.forEach(elem => {
        elem.innerHTML = data.name
    })
    countryName.forEach(elem => {
        elem.innerHTML = data.sys.country
    })
    sunriseTime.forEach(elem => {
        elem.innerHTML = timeConverter(data.sys.sunrise).time
    })
    sunsetTime.forEach(elem => {
        elem.innerHTML = timeConverter(data.sys.sunset).time
    })
    mainTemperature.forEach(elem => {
        elem.innerHTML = Math.floor(data.main.temp)
    })

    mainTemperatureQuantity = Math.floor(data.main.temp)

    todayDate.forEach(elem => {
        elem.innerHTML = timeConverter(data.sys.sunset).date
    })
    todayMonth.forEach(elem => {
        elem.innerHTML = timeConverter(data.sys.sunset).month
    })
    ///////////////weather type section
    let dataTypeWord = data.weather[0].main
    if (dataTypeWord === 'Clouds') {
        weatherType.forEach(elem => {
            elem.innerHTML = 'cloudy'
        })
        hideIcones()
        cloudyIcon.forEach(elem => {
            elem.classList.remove('d-none')
        })
        hideImagesFunc()
        cloudyImg.forEach(elem => {
            elem.classList.remove('d-none')
        })
    } else if (dataTypeWord === 'Rain') {
        weatherType.forEach(elem => {
            elem.innerHTML = 'rainy'
        })
        hideIcones()
        rainyIcon.forEach(elem=>{
            elem.classList.remove('d-none')
        })
            hideImagesFunc()
            rainyImg.forEach(elem=>{
            elem.classList.remove('d-none')
        })
        } else if (dataTypeWord === 'Clear') {
            weatherType.forEach(elem=>{
            elem.innerHTML = 'Sunny'
        })
            hideIcones()
            sunnyIcon.forEach(elem=>{
            elem.classList.remove('d-none')
        })
            hideImagesFunc()
            sunnyImg.forEach(elem=>{
            elem.classList.remove('d-none')
        })
        } else if (dataTypeWord === 'Snow') {
            weatherType.forEach(elem=>{
            elem.innerHTML = 'Sunny'
        })
            hideIcones()
            snowyIcon.forEach(elem=>{
            elem.classList.remove('d-none')
        })
            hideImagesFunc()
            snowyImg.forEach(elem=>{
            elem.classList.remove('d-none')
        })
        } else if (dataTypeWord === 'Drizzle') {
            weatherType.forEach(elem=>{
            elem.innerHTML = 'Windy'
        })
            hideIcones()
            windyIcon.forEach(elem=>{
            elem.classList.remove('d-none')
        })
            hideImagesFunc()
            windyImg.forEach(elem=>{
            elem.classList.remove('d-none')
        })
        }
        else {
            weatherType.forEach(elem=>{
            elem.innerHTML = data.weather[0].main
        })
            hideIcones()
            hideImagesFunc()
            sunnyImg.forEach(elem=>{
            elem.classList.remove('d-none')
        })
        }
    ///////////////Upcoming hours section
    firstHour.forEach(elem=>{
        elem.innerHTML = `${(nowHour === 24 ? '01' : nowHour + 1)}:00`
    })
    firstHour.forEach(elem=>{
        elem.innerHTML.length === 5 ? firstHour.innerHTML = firstHour.innerHTML : firstHour.innerHTML = `0${firstHour.innerHTML}`
    })

    secondHour.forEach(elem=>{
        elem.innerHTML = `${Number(firstHour.innerHTML.slice(0, 2)) === 24 ? '01' : Number(firstHour.innerHTML.slice(0, 2)) + 1}:00`
    })
    secondHour.forEach(elem=>{
        elem.innerHTML.length === 5 ? secondHour.innerHTML = secondHour.innerHTML : secondHour.innerHTML = `0${secondHour.innerHTML}`
    })

    thirdHour.forEach(elem=>{
        elem.innerHTML = `${Number(secondHour.innerHTML.slice(0, 2)) === 24 ? '01' : Number(secondHour.innerHTML.slice(0, 2)) + 1}:00`
    })
    thirdHour.forEach(elem=>{
        elem.innerHTML.length === 5 ? thirdHour.innerHTML = thirdHour.innerHTML : thirdHour.innerHTML = `0${thirdHour.innerHTML}`
    })

    fourthHour.forEach(elem=>{
        elem.innerHTML = `${Number(thirdHour.innerHTML.slice(0, 2)) === 24 ? '01' : Number(thirdHour.innerHTML.slice(0, 2)) + 1}:00`
    })
    fourthHour.forEach(elem=>{
        elem.innerHTML.length === 5 ? fourthHour.innerHTML = fourthHour.innerHTML : fourthHour.innerHTML = `0${fourthHour.innerHTML}`
    })

    fifthHour.forEach(elem=>{
        elem.innerHTML = `${Number(fourthHour.innerHTML.slice(0, 2)) === 24 ? '01' : Number(fourthHour.innerHTML.slice(0, 2)) + 1}:00`
    })
    fifthHour.forEach(elem=>{
        elem.innerHTML.length === 5 ? fifthHour.innerHTML = fifthHour.innerHTML : fifthHour.innerHTML = `0${fifthHour.innerHTML}`
    })

    sixthHour.forEach(elem=>{
        elem.innerHTML = `${Number(fifthHour.innerHTML.slice(0, 2)) === 24 ? '01' : Number(fifthHour.innerHTML.slice(0, 2)) + 1}:00`
    })
    sixthHour.forEach(elem=>{
        elem.innerHTML.length === 5 ? sixthHour.innerHTML = sixthHour.innerHTML : sixthHour.innerHTML = `0${sixthHour.innerHTML}`
    })

    seventhHour.forEach(elem=>{
        elem.innerHTML = `${Number(sixthHour.innerHTML.slice(0, 2)) === 24 ? '01' : Number(sixthHour.innerHTML.slice(0, 2)) + 1}:00`
    })
    seventhHour.forEach(elem=>{
        elem.innerHTML.length === 5 ? seventhHour.innerHTML = seventhHour.innerHTML : seventhHour.innerHTML = `0${seventhHour.innerHTML}`
    })
    ///////////////detail boxs Quantities
    windQuantity.forEach(elem=>{
        elem.innerHTML = Math.floor(data.wind.speed)
    })
    humidityPercent.forEach(elem=>{
        elem.innerHTML = Math.floor(data.main.humidity)
    })
    feelsLikeTemp.forEach(elem=>{
        elem.innerHTML = Math.floor(data.main.feels_like)
    })
    feelsLikeTempQuantity = Math.floor(data.main.feels_like)
}

window.addEventListener('load', () => {
    fetchFunc('urmia')
    showData()
})

searchButton.forEach(elem => {
    elem.addEventListener('click', function () {
        if (elem.value) {
            fetchFunc(elem.value)
            elem.value = ''
            showData()
        }
    })
})

searchInput.forEach(elem => {
    elem.addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
            fetchFunc(elem.value)
            elem.value = ''
            showData()
        }
    })
})

changeDegreeTypeBtn.forEach(elemBtn => {
    elemBtn.addEventListener('click', () => {
        elemBtn.classList.toggle('fahrenheit')
        if (elemBtn.className === 'degree-type-switch') {
            mainTemperature.forEach(tempElem => {
                tempElem.innerHTML = mainTemperatureQuantity
            })
            feelsLikeTemp.forEach(feelsElem => {
                feelsElem.innerHTML = feelsLikeTempQuantity
            })
        } else {
            mainTemperature.forEach(tempElem => {
                tempElem.innerHTML = Math.floor(Number(tempElem.innerHTML) * 1.8 + 32)
            })
            feelsLikeTemp.forEach(feelsElem => {
                feelsElem.innerHTML = Math.floor(Number(feelsElem.innerHTML) * 1.8 + 32)
            })
        }
    })
})

////////////////////////Select Languge

langSelect.addEventListener('change', (e) => {
    if (e.target.value === 'persian') {
        englishDiv.style.display = 'none';
        persianDiv.style.display = 'flex';
        body.style.direction = 'rtl';
        body.style.textAlign = 'right';
        body.style.fontFamily = 'Dana';
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
    } else {
        englishDiv.style.display = 'flex';
        persianDiv.style.display = 'none';
        body.style.direction = 'ltr';
        body.style.textAlign = 'left';
        body.style.fontFamily = 'HelveticaNormal';
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'eng');
    }
});