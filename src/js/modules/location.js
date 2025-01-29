import { showGeoPositionError } from './error.js';

const getLocationInput = () => {
  const inputSearch = document.querySelector('#search-input');
  return { loc: inputSearch.value };
};

const currentPositionPromise = (options) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

async function getCurrentPosition() {
  try {
    const position = await currentPositionPromise({
      enableHighAccuracy: true,
      timeout: 5000,
    });

    return {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };
  } catch (err) {
    if (err instanceof GeolocationPositionError) {
      showGeoPositionError(err.code);
      console.error(`Geolocation Error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

export { getLocationInput, getCurrentPosition };
