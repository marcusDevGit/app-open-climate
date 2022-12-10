//Variaveis
const apiKey = "6577b91dd0810fb8fe3d9ce378124e39";
const apiCoutryURL = "https://countryflagsapi.com/png/";
//Seleção de elementos
const cityInput = document.querySelector("#city_input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather_icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather_data");
//Funções
const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data =  await res.json();
    
    return data;
}

    const showWeatherData = async (city) => {

       const data = await getWeatherData(city);

       cityElement.innerHTML = data.name;
       tempElement.innerHTML = parseInt(data.main.temp);
       descElement.innerText = data.weather[0].description;
       weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
       countryElement.setAttribute("src", apiCoutryURL + data.sys.country);
       humidityElement.innerText = `${data.main.humidity}%`;
       windElement.innerText = `${data.wind.speed}km/h`;

       weatherContainer.classList.remove("hide");

    }

//Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
})

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter") {
        const city = e.target.value

        showWeatherData(city);
    }
})
