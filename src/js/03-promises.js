import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';
const el = {
  delay: document.querySelector('[name=delay]'),
  step: document.querySelector('[name=step]'),
  amount: document.querySelector('[name=amount]'),
};
document.querySelector('[type="submit"]').addEventListener('click', onClick);
let step = 0;
function onClick(event) {
  event.preventDefault();
  for (let i = 1; i <= Number(el.amount.value); i += 1) {
    createPromise(i, Number(el.delay.value))
      .then(value => Notify.success(value))
      .catch(value => Notify.failure(value));
    step += Number(el.step.value);
  }
};
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    delay = step + delay
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }}, delay)
    });
};
