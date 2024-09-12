const getLocationInput = () => {
  const inputSearch = document.querySelector('#search');
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
    console.error(`ERROR(${err.code}): ${err.message}`);
  }
}

export { getLocationInput, getCurrentPosition };
