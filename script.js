
const apiKey = "35d659911c6039c894353fdb4d9d0bdb";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherIcon = document.getElementById("weatherIcon");

// Function to update date and time
function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit'
    };
    document.getElementById("current-datetime").innerText = now.toLocaleDateString('en-US', options);
}

// Update date and time every second
setInterval(updateDateTime, 1000);
updateDateTime();

// Function to fetch weather data
async function checkWeather(city) {
    if (!city) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Weather condition mapping
        const weatherConditions = {
            "Clouds": "clouds.png",
            "Clear": "clear.png",
            "Rain": "rain.png",
            "Haze": "mist.png",
            "Drizzle": "drizzle.png",
            "Mist": "mist.png",
            "Snow": "snow.png"
        };

        weatherIcon.src = "images/" + (weatherConditions[data.weather[0].main] || "default.png");

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

// Search button click event
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Allow search on pressing "Enter"
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
