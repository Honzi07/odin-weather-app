import { getProcessGeoWeather, getProcessUserWeather } from './data';

function getHtmlElement() {
  return {
    form: document.querySelector('.search-container__form'),
    searchInput: document.querySelector('.search-container__input'),
    btnGeo: document.querySelector('.search-container__geolocation-btn'),
    summary: document.querySelector('.current-weather__summary'),
  };
}

async function handleWeatherEv(ev) {
  ev.preventDefault();

  if (ev.target.classList.contains('search-container__geolocation-btn')) {
    return await getProcessGeoWeather();
  } else if (ev.target.classList.contains('search-container__form')) {
    return await getProcessUserWeather();
  }
}

const getWeatherIcon = (icon) =>
  require('../../assets/images/' + icon + '.svg');

const displayAlerts = (data) => {
  if (!data.alerts.length) return;
  console.log('alert');

  const container = document.querySelector('.current-weather__alert-container');

  for (const alert of data.alerts) {
    console.log(alert);
    const html = `<div class="current-weather__alert-description">${alert.description}  <a href="${alert.link}"  target="_blank" rel="noopener noreferrer">More Information</a></div>`;

    container.insertAdjacentHTML('afterbegin', html);
  }
};

async function currentWeatherElement(data, element) {
  const html = `
        <div class="current-weather">
        <header class="current-weather__header">
          <div class="current-weather__today-label">Weather currently</div>
          <p class="current-weather__update-time">${data.currently.datetime}</p>
        </header>

        <div class="current-weather__summary-container">
          <div class="current-weather__alert-container">
          </div>
          <div class="current-weather__overview-current-temp">
            <img
              class="current-weather__image"
              src="${getWeatherIcon(data.currently.icon)}"
              alt="${data.currently.icon} weather icon"
            />
            <div class="current-weather__temp">${Math.round(
              data.currently.temp
            )}</div>
            <div class="current-weather__condition-details">
              <div class="current-weather__condition">${
                data.currently.conditions
              }</div>
              <div class="current-weather__feelslike-container">
                <div class="current-weather__feelslike-label">Feels like</div>
                <span class="current-weather__feelslike-temp">${Math.round(
                  data.currently.feelslike
                )}</span>
              </div>
            </div>
          </div>
          <div class="current-weather__summary">
          ${data.description}
          </div>
        </div>
        <div class="current-weather__detail-container">
          <div class="current-weather__wind-item">
            <div class="current-weather__wind-label">Wind</div>
            <div class="current-weather__wind-speed-container">
              <div class="current-weather__wind-speed">${Math.round(
                data.currently.windspeed
              )} ${data.units.speed}</div>
              <i
                aria-label="Wind direction arrow"
                class="current-weather__arrow-icon fa-solid fa-location-arrow"
              ></i>
            </div>
          </div>
          <div class="current-weather__humidity-item">
            <div class="current-weather__humidity-label">Humidity</div>
            <div class="current-weather__humidity-percentage">${Math.round(
              data.currently.humidity
            )}%</div>
          </div>
        </div>
      </div>
  `;

  element.insertAdjacentHTML('beforeend', html);
}

async function renderCompleteWeather(ev) {
  const mainEl = document.querySelector('main');

  try {
    const weatherData = await handleWeatherEv(ev);
    currentWeatherElement(weatherData, mainEl);
    displayAlerts(weatherData);
  } catch (err) {
    console.error(err);
  }
}

getHtmlElement().form.addEventListener('submit', renderCompleteWeather);
getHtmlElement().btnGeo.addEventListener('click', renderCompleteWeather);
