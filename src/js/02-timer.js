import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const datePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const minutes = document.querySelector("[data-minutes]");
const seconds = document.querySelector("[data-seconds]");

let intervalId;

flatpickr(datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      window.alert("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

function startTimer() {
  const selectedDate = new Date(datePicker.value);
  const currentDate = new Date();
  const timeRemaining = selectedDate - currentDate;
  if (timeRemaining <= 0) {
    clearInterval(intervalId);
    days.textContent = "00";
    hours.textContent = "00";
    minutes.textContent = "00";
    seconds.textContent = "00";
    return;
  }
  let totalSeconds = Math.floor(timeRemaining / 1000);
  let totalMinutes = Math.floor(totalSeconds / 60);
  let totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  seconds.textContent = pad(totalSeconds % 60);
  minutes.textContent = pad(totalMinutes % 60);
  hours.textContent = pad(totalHours % 24);
  days.textContent = pad(totalDays);
  intervalId = setInterval(() => {
    totalSeconds--;
    if (totalSeconds < 0) {
      clearInterval(intervalId);
      days.textContent = "00";
      hours.textContent = "00";
      minutes.textContent = "00";
      seconds.textContent = "00";
      return;
    }
    if (totalSeconds % 60 === 59) {
      totalMinutes--;
      if (totalMinutes < 0) {
        clearInterval(intervalId);
        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";
        return;
      }
      if (totalMinutes % 60 === 59) {
        totalHours--;
        if (totalHours < 0) {
          clearInterval(intervalId);
          days.textContent = "00";
          hours.textContent = "00";
          minutes.textContent = "00";
          seconds.textContent = "00";
          return;
        }
        if (totalHours % 24 === 23) {
          totalDays--;
          if (totalDays < 0) {
            clearInterval(intervalId);
            days.textContent = "00";
            hours.textContent = "00";
            minutes.textContent = "00";
            seconds.textContent = "00";
            return;
          }
          days.textContent = pad(totalDays);
        }
        hours.textContent = pad(totalHours % 24);
      }
      minutes.textContent = pad(totalMinutes % 60);
    }
    seconds.textContent = pad(totalSeconds % 60);
  }, 1000);
}

startButton.addEventListener("click", startTimer);

function pad(value) {
  return value.toString().padStart(2, "0");
}