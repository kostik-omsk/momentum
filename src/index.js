//index.js
import { showTime, showDate } from './modules/clockAndCalendar';
import { greeting } from './modules/greeting';
import { imageBg } from './modules/imageBg';
import { weatherWidget } from './modules/weatherWidget';
import { quote } from './modules/quote';
import { audioPlayer } from './modules/audioPlayer';
import { settings } from './modules/settings';
import { todo } from './modules/todo';

imageBg();

if (localStorage.getItem('lang') == undefined) {
  localStorage.setItem('lang', navigator.language);
}
let language = lang();
todo();
settings(language);
showTime(language);
showDate(language);
greeting(language);
weatherWidget(language);
quote(language);
audioPlayer();

function lang() {
  return localStorage.getItem('lang');
}
export { lang };
