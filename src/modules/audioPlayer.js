import playList from './playList';
export const audioPlayer = () => {
  const playBtn = document.querySelector('.play');
  const nextBtn = document.querySelector('.play-next');
  const prevBtn = document.querySelector('.play-prev');
  const volumeBtn = document.querySelector('.volume-icon');
  const trackName = document.querySelector('.player-name');
  const playerProgress = document.querySelector('.player-progress');
  const ulPlayList = document.querySelector('.play-list');

  for (let i = 0; i < playList.length; i++) {
    let li = document.createElement('li');
    li.classList.add('play-item');
    li.innerHTML = `<button class="play play-sm player-icon"></button>  ${playList[i].title} | ${playList[i].duration}`;
    ulPlayList.append(li);
  }

  let playItem = document.querySelectorAll('.play-item');
  let currentTrack = 0;
  let isPlay = false;
  let volLevel = soundVolume.value;
  let audio = new Audio();
  let pauseTrek;
  audio.src = playList[currentTrack].src;
  duration.textContent = playList[currentTrack].duration;
  trackName.textContent = playList[currentTrack].title;

  playItem.forEach((el, i) => {
    el.addEventListener('click', (e) => {
      let click = e.target;
      if (click.closest('.item-active')) {
        playAudio();
        pauseTrek = i;
        currentTrack = i;
      } else if (i == pauseTrek) {
        isPlay = false;
        currentTrack = i;
        playAudio();
      } else {
        audio.src = playList[i].src;
        pauseTrek = null;
        isPlay = false;
        currentTrack = i;
        playAudio();
      }
    });
  });

  function playAudio() {
    if (isPlay) {
      audio.pause();
      isPlay = false;
      playBtn.classList.remove('pause');
    } else {
      audio.play();
      isPlay = true;
      playBtn.classList.add('pause');
    }
    trackName.textContent = playList[currentTrack].title;
    duration.textContent = playList[currentTrack].duration;
    playItem.forEach((item, i) => {
      i == currentTrack && isPlay
        ? (item.classList.add('item-active'),
          item.firstChild.classList.add('pause'))
        : (item.classList.remove('item-active'),
          item.firstChild.classList.remove('pause'));
    });
  }

  function playNext() {
    isPlay = false;
    currentTrack < playList.length - 1 ? currentTrack++ : (currentTrack = 0);
    audio.src = playList[currentTrack].src;
    playAudio();
  }
  function playPrev() {
    isPlay = false;
    currentTrack < 1 ? (currentTrack = playList.length - 1) : currentTrack--;
    audio.src = playList[currentTrack].src;
    playAudio();
  }
  function muteVolume() {
    if (audio.volume > 0) {
      changeVolume(0);
    } else {
      changeVolume(volLevel);
    }
  }
  function changeVolume(volume) {
    audio.volume = volume;
    soundVolume.value = volume;
    soundVolume.style.backgroundSize = volume * 100 + '% 100%';
    volume == 0
      ? volumeBtn.classList.add('mute')
      : volumeBtn.classList.remove('mute');
  }

  function progressDuration() {
    let duration = (audio.currentTime / audio.duration) * 100;
    progress.style.width = duration + '%';
    timer.textContent = formatTime(audio.currentTime);
  }
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  playBtn.addEventListener('click', playAudio);
  nextBtn.addEventListener('click', playNext);
  prevBtn.addEventListener('click', playPrev);
  volumeBtn.addEventListener('click', muteVolume);
  audio.addEventListener('ended', playNext);
  audio.addEventListener('timeupdate', progressDuration);
  playerProgress.addEventListener('click', (event) => {
    let x = event.pageX - playerProgress.offsetLeft;
    let width = playerProgress.offsetWidth;
    let clickTime = x / width;
    audio.currentTime = audio.duration * clickTime;
  });
  soundVolume.addEventListener('input', () => {
    changeVolume(soundVolume.value);
  });
};
