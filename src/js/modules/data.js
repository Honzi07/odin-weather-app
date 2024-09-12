import { getLocationInput } from './location';

async function getWeather(location = 'budapest') {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=T963D97FLMH7J94QPR4VCDHZZ&contentType=json`
  );
  return await response.json();
}

const processWeather = (data) => {
  // console.log(data);

  const weatherObj = {
    today: data.currentConditions,
    days: data.days,
    description: data.description,
    location: data.resolvedAddress,
  };

  return weatherObj;
};

export default async (ev) => {
  ev.preventDefault();

  const location = getLocationInput();
  const weatherData = await getWeather(location);
  processWeather(weatherData);

  console.log(processWeather(weatherData));
  return processWeather(weatherData);
};
