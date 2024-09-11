import handleWeatherProcessing from './data';

function getHtmlElement() {
  return {
    form: document.querySelector('form'),
  };
}

// const { form } = getHtmlElement();
const form = getHtmlElement().form;

form.addEventListener('submit', handleWeatherProcessing);
