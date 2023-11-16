//clockAndCalendar.js
import { lang } from '../index';
const time = document.querySelector('.time');
const nodeDate = document.querySelector('.date');

function showTime(lng = lang()) {
  const date = new Date();
  const currentTime = date.toLocaleTimeString({
    hour12: false,
  });
  time.textContent = currentTime;
  showDate(lng);
  setTimeout(showTime, 1000);
}

function showDate(lng) {
  const date = new Date();
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };
  const currentDate = date.toLocaleDateString(lng, options);
  nodeDate.textContent = currentDate;
}

export { showTime, showDate };
