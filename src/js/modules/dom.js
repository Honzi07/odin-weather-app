import { getProcessGeoWeather, getProcessUserWeather } from './data';

function getHtmlElement() {
  return {
    form: document.querySelector('.search-form'),
    searchInput: document.querySelector('.search-input'),
    btnGeo: document.querySelector('.geolocation-btn'),
  };
}

// const { form } = getHtmlElement();
const form = getHtmlElement().form;
