export function greeting(lang) {
  greetingText.textContent = whatTimeOfDay(lang);
  name.placeholder = lang == 'ru' ? '[Введите имя]' : '[Enter name]';
}

let greetingText = document.querySelector('.greeting');
let name = document.querySelector('.name');

export function whatTimeOfDay(language) {
  let now = new Date();
  let hours = now.getHours();
  let greeting = '';
  if (hours >= 6 && hours < 12) {
    greeting = language == 'ru' ? 'Доброе утро' : 'Good morning';
  } else if (hours >= 12 && hours < 18) {
    greeting = language == 'ru' ? 'Добрый день' : 'Good afternoon';
  } else if (hours >= 18 && hours < 24) {
    greeting = language == 'ru' ? 'Добрый вечер' : 'Good evening';
  } else {
    greeting = language == 'ru' ? 'Доброй/Спокойной ночи' : 'Good night';
  }
  return greeting;
}

const storedName = localStorage.getItem('inputName');
//проверяем localStorage на наличие введеного ранее имени, если оно есть, то автоматически заполняем инпут
if (storedName) {
  name.value = storedName;
}

name.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    localStorage.setItem('inputName', event.target.value);
  }
});
