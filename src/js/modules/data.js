import { getLocationInput, getCurrentPosition } from './location';

async function getWeather({ loc, lat, lon }) {
  try {
    const userInput = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?unitGroup=metric&key=T963D97FLMH7J94QPR4VCDHZZ&contentType=json`;

    const geolocation = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=T963D97FLMH7J94QPR4VCDHZZ&contentType=json`;

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

  if (coords) {
    const weatherData = await getWeather(coords);
    console.log('geolocation', processWeather(weatherData));
    return processWeather(weatherData);
  }
};

const getProcessUserWeather = async () => {
  const location = getLocationInput();
  const weatherData = await getWeather(location);
  console.log('user', processWeather(weatherData));
  return processWeather(weatherData);
};

export { getProcessGeoWeather, getProcessUserWeather };
