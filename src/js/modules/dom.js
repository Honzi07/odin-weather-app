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

const getWindDirection = (windDegree) => {
  const baseRotation = windDegree + 135;
  return baseRotation < 360 ? baseRotation : baseRotation - 360;
};

function currentWeatherElement(data, element) {
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
            )} ${data.units.temp}</div>
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
                class="current-weather__arrow-icon fa-solid fa-location-arrow fa-rotate-by" 
                style="--fa-rotate-angle: ${getWindDirection(
                  data.currently.winddir
                )}deg;"
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

function hourWeatherContainer(element) {
  const html = `
      <div class="hourly-weather">
        <div class="hourly-weather__btn-container">
          <button class="hourly-weather__btn hourly-weather__btn--4" data-value="4">4 Hour</button>
          <button class="hourly-weather__btn hourly-weather__btn--24" data-value="1">24 Hour</button>
        </div>
        <div class="hourly-weather__hour-container"></div>
      </div>
  `;

  element.insertAdjacentHTML('beforeend', html);
}

function hourWeatherElement(data, interval = 3) {
  const container = document.querySelector('.hourly-weather__hour-container');

  const getFormattedHour = (hour, i) =>
    i <= 9 ? hour.slice(1, 5) : hour.slice(0, 5);
  const nextTwoDays = [...data.days[0].hours, ...data.days[1].hours];
  const currentHour = new Date().getHours();

  let i;
  for (let num = currentHour; num <= currentHour + 24; num += interval) {
    i = num;

    const html = `
      <div class="hourly-weather__hour">
        <div class="hourly-weather__hour-time">${getFormattedHour(
          nextTwoDays[i].datetime,
          i
        )}</div>
        <img class="hourly-weather__hour-icon" src="${getWeatherIcon(
          nextTwoDays[i].icon
        )}" alt=" ${nextTwoDays[i].icon} weather icon" />
        <div class="hourly-weather__hour-temp">${Math.round(
          nextTwoDays[i].temp
        )}</div>
      </div>
  `;

    container.insertAdjacentHTML('beforeend', html);
  }
}

function updateHourlyWeather(data) {
  const weatherBtns = document.querySelectorAll('.hourly-weather__btn');

  weatherBtns.forEach((btn) =>
    btn.addEventListener('click', function () {
      {
        document.querySelector('.hourly-weather__hour-container').innerHTML =
          '';
        hourWeatherElement(data, Number(this.dataset.value));
      }
    })
  );
}

function dayWeatherElement(data, mainContainer) {
  const daysSection = document.createElement('section');
  daysSection.classList.add('days-section');
  daysSection.setAttribute('aria-label', 'next 14 day weather forecast');
  mainContainer.appendChild(daysSection);

  const getFormattedDate = (inputDate) => {
    const options = {
      weekday: 'short',
      day: 'numeric',
    };

    const localizedDate = new Intl.DateTimeFormat(
      data.language.fullLang,
      options
    ).formatToParts(new Date(inputDate));

    let day = '';
    let weekday = '';

    if ((localizedDate[0].type = 'day')) day = localizedDate[0].value;
    if ((localizedDate[2].type = 'day')) weekday = localizedDate[2].value;

    return [day, weekday];
  };

  data.days.forEach((day) => {
    const { datetime, icon, tempmax, tempmin, windspeed, winddir } = day;
    const [date, weekday] = getFormattedDate(datetime);

    const html = `
            <div class="day-weather">
            <div class="day-weather__date-container">
              <div class="day-weather__weekday">${weekday}</div>
              <time class="day-weather__date" datetime="${datetime}">${date}</time>
            </div>
  
            <div class="day-weather__wrapper">
              <img class="day-weather__icon" src="${getWeatherIcon(
                icon
              )}" alt="${icon} weather icon" />
            </div>
  
            <div class="day-weather-temp-container">
              <div class="day-weather__temp day-weather__temp--max">${Math.round(
                tempmax
              )}</div>
              <div class="day-weather__temp day-weather__temp--min">${Math.round(
                tempmin
              )}</div>
            </div>
  
            <div class="day-weather__wind-container">
              <div class="day-weather__wind-speed">${windspeed}${
      data.units.speed
    }</div>
              <i
                class="day-weather__arrow-icon fa-solid fa-location-arrow fa-rotate-by" 
                style="--fa-rotate-angle: ${getWindDirection(winddir)}deg;"
                aria-label="Wind direction arrow"
              ></i>
            </div>
          </div>
    `;

    daysSection.insertAdjacentHTML('beforeend', html);
  });
}

async function renderCompleteWeather(ev) {
  const mainEl = document.querySelector('main');

  mainEl.innerHTML = '';

  try {
    const weatherData = await handleWeatherEv(ev);
    currentWeatherElement(weatherData, mainEl);
    displayAlerts(weatherData);
    hourWeatherContainer(mainEl);
    hourWeatherElement(weatherData);
    updateHourlyWeather(weatherData);
    dayWeatherElement(weatherData, mainEl);
  } catch (err) {
    console.error(err);
  }
}

getHtmlElement().form.addEventListener('submit', renderCompleteWeather);
getHtmlElement().btnGeo.addEventListener('click', renderCompleteWeather);
