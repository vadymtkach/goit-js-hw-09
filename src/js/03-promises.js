
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btn = document.querySelector('button');
const form = document.querySelector('.form');
// console.log(btn);

form.addEventListener('submit', event => {
  event.preventDefault();
  const firstDelay = Number(form.firstElementChild.firstElementChild.value);
  const stepDelay = Number(
    form.firstElementChild.nextElementSibling.firstElementChild.value
  );
  const amount = Number(
    form.lastElementChild.previousElementSibling.firstElementChild.value
  );
  let counterDelay = firstDelay;
  let counterItteration = 1;
  setTimeout(() => {
    const timerId = setInterval(() => {
      createPromise(counterItteration, counterDelay)
        .then(text => Notify.success(text))
        .catch(text => Notify.failure(text))
        .finally(() => {
          counterDelay += stepDelay;
          counterItteration++;
        });
      if (counterItteration === amount) {
        clearInterval(timerId);
      }
    }, stepDelay);
  }, firstDelay);
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      // Fulfill
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      // Reject
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  });
}
