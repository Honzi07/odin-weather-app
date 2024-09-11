const getLocationInput = () => {
  const inputSearch = document.querySelector('#search');
  console.log({ loc: inputSearch.value });
  // return inputSearch.value;
  return { loc: inputSearch.value };
};

const locationData = (pos) => {
  console.log(pos);

  const position = {
    lat: pos.coords.latitude,
    lon: pos.coords.longitude,
  };
  console.log(position);

  // getWeather2(position.latitude, position.longitude);

  // return {
  //   lat: pos.coords.latitude,
  //   lon: pos.coords.longitude,
  // };
};

const error = (err) => {
  console.error(`ERROR(${err.code}): ${err.message}`);
};

const locationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
};

navigator.geolocation.getCurrentPosition(locationData, error, locationOptions);

export { getLocationInput };
