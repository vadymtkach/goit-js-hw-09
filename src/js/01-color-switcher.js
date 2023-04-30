
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

  let intervalId = null;
  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');
  const body = document.body;

  startButton.addEventListener('click', onStartButtonClick);
  stopButton.addEventListener('click', onStopButtonClick);

  function onStartButtonClick() {
    startButton.disabled = true;
    intervalId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }

  function onStopButtonClick() {
    startButton.disabled = false;
    clearInterval(intervalId);
  }

