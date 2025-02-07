document.addEventListener("DOMContentLoaded", () => {
    let inputData = document.getElementById("inputData");
    let fetchDataBtn = document.getElementById("fetchDataBtn");
    let weatherDetailsDiv = document.getElementById("weatherDetailsDiv");
    let cityName = document.getElementById("cityName");
    let cityTemp = document.getElementById("cityTemp");
    let description = document.getElementById("description");
    let weatherIcon = document.getElementById("weatherIcon");
    let errorText = document.getElementById("errorText");

    let API_KEY = ""; // use your own api key

    fetchDataBtn.addEventListener("click", async() =>{
        let city = inputData.value.trim();
        if(!city) return;

        try {
           let weatherData = await fetchDatafn(city);
           displayDatafn(weatherData);
        } catch (error) {
            showError(error);
        }
    });

    async function fetchDatafn(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        console.log("response", response);

        if(!response.ok){
            throw new Error("City not found");
        }
        else{
            const data = await response.json();
            return data;
        }
        
    }

    function displayDatafn(weatherData){
        console.log("weatherData", weatherData);
        cityName.innerText = `${weatherData.name.toUpperCase()}`;
        cityTemp.innerText = `TEMPERATURE : ${weatherData.main.temp}°C`;
        description.innerText = `DESCRIPTION : ${weatherData.weather[0].description.toUpperCase()}`;
        weatherIcon.classList.add("bg-violet-300");
        weatherIcon.classList.remove("hidden");
        weatherIcon.src =`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
        weatherDetailsDiv.classList.remove("hidden");  
        errorText.classList.add("hidden");
    }

    function showError(Error) {
        errorText.innerText = Error;
        errorText.classList.remove("hidden");
        weatherDetailsDiv.classList.add("hidden");
    }

});
