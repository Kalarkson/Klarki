
const clock = document.querySelector('.clock');

function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString(2).padStart(8, '0');
  const minutes = now.getMinutes().toString(2).padStart(8, '0');
  const seconds = now.getSeconds().toString(2).padStart(8, '0');

  clock.innerHTML = ''; 

  for (let i = 0; i < 8; i++) {
    const digit = document.createElement('div');
    digit.classList.add('digit');
    if (hours[i] === '1') {
      digit.innerHTML = '<div class="led on"></div>';
    } else {
      digit.innerHTML = '<div class="led"></div>';
    }
    clock.appendChild(digit);
  }

  for (let i = 0; i < 8; i++) {
    const digit = document.createElement('div');
    digit.classList.add('digit');
    if (minutes[i] === '1') {
      digit.innerHTML = '<div class="led on"></div>';
    } else {
      digit.innerHTML = '<div class="led"></div>';
    }
    clock.appendChild(digit);
  }

  for (let i = 0; i < 8; i++) {
    const digit = document.createElement('div');
    digit.classList.add('digit');
    if (seconds[i] === '1') {
      digit.innerHTML = '<div class="led on"></div>';
    } else {
      digit.innerHTML = '<div class="led"></div>';
    }
    clock.appendChild(digit);
  }
}

setInterval(updateClock, 1000);
updateClock(); 