const getLocationInput = () => {
  const inputSearch = document.querySelector('#search');
  console.log({ loc: inputSearch.value });
  // return inputSearch.value;
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
getCurrentPosition();

export { getLocationInput, getCurrentPosition };
