import { getProcessGeoWeather, getProcessUserWeather } from './data';

function getHtmlElement() {
  return {
    form: document.querySelector('.search-form'),
    searchInput: document.querySelector('.search-input'),
    btnGeo: document.querySelector('.geolocation-btn'),
    status: document.querySelector('.status-message'),
  };
}

getHtmlElement().form.addEventListener('submit', showWeather);

getHtmlElement().btnGeo.addEventListener('click', showWeather);

async function handleWeatherEv(ev) {
  ev.preventDefault();

  if (ev.target.classList.contains('geolocation-btn')) {
    return await getProcessGeoWeather();
  } else if (ev.target.classList.contains('search-form')) {
    return await getProcessUserWeather();
  }
}

async function showWeather(ev) {
  const data = await handleWeatherEv(ev);
  console.log('test', data);
  getHtmlElement().status.textContent = data.description;
}
