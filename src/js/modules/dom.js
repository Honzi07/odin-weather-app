import { getProcessGeoWeather, getProcessUserWeather } from './data';

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

function currentWeatherElement(data, parentEl) {
  const html = `
      <section class="current-weather-container" aria-label="current weather">
        <header class="current-weather__header">
          <h1 class="current-weather__today-label">Current Weather</h1>
          <time
            class="current-weather__update-time"
            datetime="${data.currently.datetime}"
            >${data.currently.datetime}</time
          >
        </header>

        <section class="current-weather__summary-container">
          <div class="current-weather__alert-container"></div>
          <div class="current-weather__overview-current-temp">
            <img
              class="current-weather__image"
              src="${getWeatherIcon(data.currently.icon)}"
              alt="${data.currently.icon} weather icon"
            />
            <div class="current-weather__temp">
              ${Math.round(data.currently.temp)} ${data.units.temp}
            </div>
            <div class="current-weather__condition-details">
              <div class="current-weather__condition">
                ${data.currently.conditions}
              </div>
              <div class="current-weather__feelslike-container">
                <div class="current-weather__feelslike-label">Feels like</div>
                <span class="current-weather__feelslike-temp"
                  >${Math.round(data.currently.feelslike)}</span
                >
              </div>
            </div>
          </div>
          <div class="current-weather__summary">${data.description}</div>
        </section>
        <section class="current-weather__detail-container">
          <div class="current-weather__wind-item">
            <div class="current-weather__wind-label">Wind</div>
            <div class="current-weather__wind-speed-container">
              <div class="current-weather__wind-speed">
                ${Math.round(data.currently.windspeed)} ${data.units.speed}
              </div>
              <i
                aria-label="Wind direction arrow"
                class="current-weather__arrow-icon fa-solid fa-location-arrow fa-rotate-by"
                style="--fa-rotate-angle: ${getWindDirection(
                  data.currently.winddir
                )}deg;"
              ></i>
            </div>
          </div>
          <div class="current-weather__humidity-container">
            <div class="current-weather__humidity-label">Humidity</div>
            <div class="current-weather__humidity-percentage">
              ${Math.round(data.currently.humidity)}%
            </div>
          </div>
        </section>
      </section>
  `;

  parentEl.insertAdjacentHTML('beforeend', html);
}

function hourWeatherContainer(parentEl) {
  const html = `
      <section class="hourly-weather-container" aria-label="hourly weather forecast">
        <div class="hourly-weather__btn-container">
          <button class="hourly-weather__btn hourly-weather__btn--4" data-value="4">4 Hour</button>
          <button class="hourly-weather__btn hourly-weather__btn--24" data-value="1">24 Hour</button>
        </div>
        <div class="hourly-weather__hour-container"></div>
      </section>
  `;

  parentEl.insertAdjacentHTML('beforeend', html);
}

function hourWeatherElement(data, interval = 4) {
  const container = document.querySelector('.hourly-weather__hour-container');

  const getFormattedHour = (hour, i) =>
    i <= 9 ? hour.slice(1, 5) : hour.slice(0, 5);
  const nextTwoDays = [...data.days[0].hours, ...data.days[1].hours];
  const currentHour = new Date().getHours();

  let i;
  for (let num = currentHour; num <= currentHour + 24; num += interval) {
    i = num;

    const html = `
      <article class="hourly-weather__hour">
        <time class="hourly-weather__hour-time" datetime="${
          nextTwoDays[i].datetime
        }">${getFormattedHour(nextTwoDays[i].datetime, i)}</time>
        <img class="hourly-weather__hour-icon" src="${getWeatherIcon(
          nextTwoDays[i].icon
        )}" alt=" ${nextTwoDays[i].icon} weather icon" />
        <div class="hourly-weather__hour-temp">${Math.round(
          nextTwoDays[i].temp
        )}</div>
      </article>
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
  daysSection.classList.add('day-weather-container');
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
            <article class="day-weather">
            <div class="day-weather__date-container">
              <div class="day-weather__weekday">${weekday}</div>
              <time class="day-weather__date" datetime="${datetime}">${date}</time>
            </div>
  
            <div class="day-weather__icon-wrapper">
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
          </article>
    `;

    daysSection.insertAdjacentHTML('beforeend', html);
  });
}

function clearStatusText() {
  const statusText = document.querySelector('.status-message__text');
  statusText.textContent = '';
}

function createLoadingAnimation(parentEl) {
  if (!parentEl) return;

  const loadingWrapper = document.createElement('div');
  const loadingSpinner = document.createElement('div');

  loadingWrapper.classList.add('loading-wrapper');
  loadingSpinner.classList.add('loading-spinner');

  loadingWrapper.appendChild(loadingSpinner);
  parentEl.appendChild(loadingWrapper);

  return loadingWrapper;
}

async function renderCompleteWeather(ev) {
  const mainEl = document.querySelector('main');
  mainEl.innerHTML = '';
  clearStatusText();
  const loadingWrapper = createLoadingAnimation(mainEl);

  try {
    const weatherData = await handleWeatherEv(ev);
    if (!weatherData) return;

    currentWeatherElement(weatherData, mainEl);
    displayAlerts(weatherData);
    hourWeatherContainer(mainEl);
    hourWeatherElement(weatherData);
    updateHourlyWeather(weatherData);
    dayWeatherElement(weatherData, mainEl);
  } catch (err) {
    console.error(err);
  } finally {
    if (loadingWrapper) {
      loadingWrapper.remove();
    }
  }
}

document
  .querySelector('.search-container__form')
  .addEventListener('submit', renderCompleteWeather);

document
  .querySelector('.search-container__geolocation-btn')
  .addEventListener('click', renderCompleteWeather);
