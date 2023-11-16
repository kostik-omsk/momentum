import { getRandomNumber } from './getRandomNumber';
import { whatTimeOfDay } from './greeting';
import { readFromLocalStorage } from './readFromLocalStorage';

let apiglobal = '';
let tagGlobal = '';
const next = document.querySelector('.slide-next');
const prev = document.querySelector('.slide-prev');
let numbeRandom = getRandomNumber(1, 20);
let timeOfDay = whatTimeOfDay('en');
timeOfDay = timeOfDay.slice(timeOfDay.indexOf(' ') + 1, timeOfDay.length);

function getSlideNext(api, tag) {
  numbeRandom++;
  if (numbeRandom > 20) {
    numbeRandom = 1;
  }
  imageBg(api, tag);
}
function getSlidePrev(api, tag) {
  numbeRandom--;
  if (numbeRandom < 1) {
    numbeRandom = 20;
  }
  imageBg(api, tag);
}

export async function imageBg(
  api = readFromLocalStorage('images'),
  tag = readFromLocalStorage('tag')
) {
  apiglobal = api;
  tagGlobal = tag;
  const body = document.querySelector('body');

  let img = new Image();

  function linkApi(api) {
    let link = '';
    switch (api) {
      case 'unsplash':
        link = getLinkToUnsplash(tag);
        return link;

      case 'flickr':
        link = getLinkToFlickr(tag);
        break;

      default:
        link = setBgGitHub();
        break;
    }
    return link;
  }

  let urlImageAPI = '';
  await linkApi(api).then(function (result) {
    urlImageAPI = result;
    return urlImageAPI;
  });
  img.src = urlImageAPI;
  img.addEventListener('load', function () {
    body.style.backgroundImage = `url('${img.src}')`;
    document.body.classList.remove('loading');
  });

  async function setBgGitHub() {
    let src = `https://raw.githubusercontent.com/kostik-omsk/stage1-tasks/assets/images/${timeOfDay}/${numbeRandom
      .toString()
      .padStart(2, '0')}.jpg`;
    return src;
  }
  async function getLinkToUnsplash(tag) {
    if (tag == '') {
      tag = timeOfDay;
    }
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=vBuZtD6PccwwGU5BC0NiUmumYGh0rNUFa7klPoum8qY`;
    const res = await fetch(url);
    const data = await res.json();
    let src = data.urls.regular;
    return src;
  }
  async function getLinkToFlickr(tag) {
    if (tag == '') {
      tag = timeOfDay;
    }
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=29a475ead5aaab916afff535a923ad54&tags=${tag}&extras=url_h&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    let photos = data.photos.photo;
    let x = getRandomNumber(1, 99);
    return photos[x].url_h;
  }
}
next.addEventListener('click', () => {
  getSlideNext(apiglobal, tagGlobal);
});
prev.addEventListener('click', () => {
  getSlidePrev(apiglobal, tagGlobal);
});
