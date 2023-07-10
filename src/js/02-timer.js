import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';
const el = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  button: document.querySelector('[data-start]'),
};
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
};

el.button.setAttribute('disabled', 'disabled');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - new Date() < 0) {
        Notify.failure('Please choose a date in the future');
    } else {
      el.button.removeAttribute('disabled');
      el.button.addEventListener('click', onClick);
      function onClick(e) {
        setInterval(timerHandler, 1000);
        function timerHandler() {
          el.days.textContent = `${addLeadingZero(
            convertMs(selectedDates[0] - new Date()).days
          )}`;
          el.hours.textContent = `${addLeadingZero(
            convertMs(selectedDates[0] - new Date()).hours
          )}`;
          el.minutes.textContent = `${addLeadingZero(
            convertMs(selectedDates[0] - new Date()).minutes
          )}`;
          el.seconds.textContent = `${addLeadingZero(
            convertMs(selectedDates[0] - new Date()).seconds
          )}`;
        }
      }
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr(document.querySelector('#datetime-picker'), options);
