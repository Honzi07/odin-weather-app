async function getWeather(location = 'budapest') {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=T963D97FLMH7J94QPR4VCDHZZ&contentType=json`
  );
  return await response.json();
}
