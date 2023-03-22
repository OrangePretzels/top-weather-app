require("dotenv").config();
const apiKey = process.env.API_KEY;

const locationInput = document.querySelector(".locationInput");
const currentLocation = document.querySelector(".currentLocation");
const currentTime = document.querySelector(".currentTime");
const currentTemp = document.querySelector(".currentTemp");
const dayNightCycleIcon = document.querySelector(".dayNightCycleIcon");
const dayOne = document.querySelector(".dayOne");
const dayTwo = document.querySelector(".dayTwo");
const dayThree = document.querySelector(".dayThree");
const dayFour = document.querySelector(".dayFour");
const dayFive = document.querySelector(".dayFive");
const daySix = document.querySelector(".daySix");

const days = [dayOne, dayTwo, dayThree, dayFour, dayFive, daySix];

async function myAsyncFunction(searchQuery) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchQuery}&days=7&aqi=no&alerts=no`,
      { mode: "cors" }
    );
    const data = await response.json();
    currentLocation.textContent = data.location.name;
    currentTime.textContent = data.location.localtime;
    currentTemp.textContent = data.current.temp_f + " f";
    dayNightCycleIcon.src = data.current.condition.icon;
    console.log(data.forecast.forecastday);

    for (let i = 1; i <= 6; i++) {
      days[i - 1].innerHTML = `${data.forecast.forecastday[i].date} <br> ${
        data.forecast.forecastday[i].day.mintemp_f + " f"
      }
          <br> ${data.forecast.forecastday[i].day.maxtemp_f + " f"}`;
    }
  } catch (error) {
    console.error(error);
  }
}

myAsyncFunction("Tokyo");

locationInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const locationValue = locationInput.value;
    myAsyncFunction(locationValue);
  }
});
