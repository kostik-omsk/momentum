import { getRandomNumber } from './getRandomNumber';
import { lang } from '../index';
const quoteOut = document.querySelector('.quote');
const author = document.querySelector('.author');
const change = document.querySelector('.change-quote');
let previous;

async function quote(lng = lang(), num) {
  const response = await fetch('assets/quotes.json');
  const data = await response.json();
  num == undefined ? (num = getRandomNumber(0, data.length - 1)) : num;
  let index = num;
  lng = lng.length > 2 ? lng.substring(0, 2) : lng;
  quoteOut.textContent = `${data[index][lng].text}`;
  author.textContent = `- ${data[index][lng].author}`;
  previous = index;
}

change.addEventListener('click', () => quote());
export { quote, previous };
