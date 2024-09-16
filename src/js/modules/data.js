import { getLocationInput, getCurrentPosition } from './location';

async function getWeather({ loc, lat, lon, unit }) {
  try {
    const userInput = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?unitGroup=${unit}&key=T963D97FLMH7J94QPR4VCDHZZ&contentType=json`;

    const geolocation = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=${unit}&key=T963D97FLMH7J94QPR4VCDHZZ&contentType=json`;

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

const processWeather = (data) => {
  if (!data) return;

  const weatherObj = {
    today: data.currentConditions,
    days: data.days,
    description: data.description,
    location: data.resolvedAddress,
  };

  return weatherObj;
};

const getProcessGeoWeather = async () => {
  const coords = await getCurrentPosition();
  const unit = getTempUnit();
  const weatherParams = { ...coords, ...unit };

  if (coords) {
    const weatherData = await getWeather(weatherParams);
    console.log('geolocation', processWeather(weatherData));
    return processWeather(weatherData);
  }
};

const getProcessUserWeather = async () => {
  const unit = getTempUnit();
  const location = getLocationInput();
  const weatherParams = { ...location, ...unit };
  const weatherData = await getWeather(weatherParams);
  console.log('user', processWeather(weatherData));
  return processWeather(weatherData);
};

function getTempUnit() {
  const c = document.querySelector('#celsius');
  const f = document.querySelector('#fahrenheit');
  const unit = f.checked ? f.dataset.unit : c.dataset.unit;

  return { unit: unit };
}

export { getProcessGeoWeather, getProcessUserWeather, getTempUnit };
