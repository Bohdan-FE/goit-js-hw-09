function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const button = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

button.start.addEventListener('click', handlerStart);
button.stop.addEventListener('click', handlerStop);
let timerId = null;
button.stop.setAttribute('disabled', 'disabled');

function handlerStart(e) {
  timerId = setInterval(() => {
    document.querySelector('body').style.backgroundColor = getRandomHexColor();
  }, 1000);
  e.target.setAttribute('disabled', 'disabled');
  button.stop.removeAttribute('disabled');
}

function handlerStop(e) {
  clearInterval(timerId);
  button.start.removeAttribute('disabled');
  e.target.setAttribute('disabled', 'disabled');
}
