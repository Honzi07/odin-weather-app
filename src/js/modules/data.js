import { getLocationInput, getCurrentPosition } from './location';
import { HttpError } from './error';

async function getWeather(locationConfig) {
  const { loc, lat, lon, unit } = locationConfig;
  const language = getUserLanguage().shortLang;

  try {
    const userInput = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?unitGroup=${unit}&lang=${language}&key=T963D97FLMH7J94QPR4VCDHZZ&contentType=json`;

    const geolocation = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=${unit}&lang=${language}&key=T963D97FLMH7J94QPR4VCDHZZ&contentType=json`;

    let response;
    if (loc) {
      response = await fetch(userInput);
    } else if (lat && lon) {
      response = await fetch(geolocation);
    }

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new HttpError(
        `Whoops something went wrong! HTTP code: ${response.status}`,
        response.status
      );
    }
  } catch (err) {
    if (err instanceof HttpError) {
      err.showHttpErrorImg();
      console.error(err.message);
    } else {
      throw new Error(`Network error or invalid request: ${err.message}`);
    }
  }
}

const getUserLanguage = () => {
  const language = {
    fullLang: navigator.language,
    shortLang: navigator.language.split('-')[0].toLowerCase(),
  };

  return language;
};

const processWeather = (data) => {
  if (!data) return;

  const weatherObj = {
    alerts: data.alerts,
    currently: data.currentConditions,
    days: data.days,
    description: data.description,
    location: data.resolvedAddress,
    language: getUserLanguage(),
    units: getSelectedUnits(),
  };

  return weatherObj;
};

const getProcessGeoWeather = async () => {
  const coords = await getCurrentPosition();
  const unit = getSelectedUnits().system;
  const locationConfig = { ...coords, unit };

  if (coords) {
    const weatherData = await getWeather(locationConfig);
    console.log('geolocation', processWeather(weatherData));
    return processWeather(weatherData);
  }
};

const getProcessUserWeather = async () => {
  const unit = getSelectedUnits().system;
  const location = getLocationInput();
  const locationConfig = { ...location, unit };
  const weatherData = await getWeather(locationConfig);
  console.log('user', processWeather(weatherData));
  return processWeather(weatherData);
};

function getSelectedUnits() {
  const f = document.querySelector('#fahrenheit');

  if (f.checked) {
    return {
      system: 'us',
      temp: '°F',
      speed: 'mph',
    };
  } else {
    return {
      system: 'metric',
      temp: '°C',
      speed: 'km/h',
    };
  }
}

export { getProcessGeoWeather, getProcessUserWeather };
