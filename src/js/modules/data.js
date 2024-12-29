import { getLocationInput, getCurrentPosition } from './location';

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

    return await response.json();
  } catch (err) {
    console.error(err);
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
