//Variaveis
const apiKey = "6577b91dd0810fb8fe3d9ce378124e39";
const apiCoutryURL = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";
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

const erorMsgContainer = document.querySelector("#error_msg");
const loader = document.querySelector("#loader");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionBtn = document.querySelectorAll("#suggestions button");


// Loader
const toggleLoader = () => {
    loader.classList.toggle("hide");
};

//Funções

const getWeatherData = async(city) => {
    toggleLoader();

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data =  await res.json();

    toggleLoader();
    
    return data;
}

// Tratamento dos Erros

const showError = () => {
    erorMsgContainer.classList.remove("hide");
};

const hideInfo = () => {
    erorMsgContainer.classList.add("hide");
    weatherContainer.classList.add("hide");

    suggestionContainer.classList.add("hide");
};

const showWeatherData = async (city) => {
    hideInfo();

       const data = await getWeatherData(city);

       if(data.cod === "404") {
        showError();
        return;
       }

       cityElement.innerHTML = data.name;
       tempElement.innerHTML = parseInt(data.main.temp);
       descElement.innerText = data.weather[0].description;
       weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
       countryElement.setAttribute("src", apiCoutryURL + data.sys.country);
       humidityElement.innerText = `${data.main.humidity}%`;
       windElement.innerText = `${data.wind.speed}km/h`;

       //imagens da cidade celecionada
       document.body.style.backgroundImage = ` url("${apiUnsplash + city}")`;

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
});

//sugestoes
suggestionBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        const city = btn.getAttribute("id");

        showWeatherData(city);
    });
    
});

