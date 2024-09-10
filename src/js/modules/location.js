const form = document.querySelector('form');

function getLocation() {
  const inputSearch = document.querySelector('#search');
  return inputSearch.value;
}

export { getLocation, form };
