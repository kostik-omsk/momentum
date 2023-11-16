import { quote, previous } from './quote';
import { greeting } from './greeting';
import { showDate } from './clockAndCalendar';
import { weatherWidget } from './weatherWidget';
import { imageBg } from './imageBg';
import { saveToLocalStorage } from './saveToLocalStorage';
import { readFromLocalStorage } from './readFromLocalStorage';

export function settings(lang) {
  const settingsBtn = document.querySelector('.sett-btn');
  const todoBtn = document.querySelector('.todo-btn');
  const settingsPanel = document.querySelector('.setting-panel');
  const todoPanel = document.querySelector('.todo-panel');
  const radioLang = document.querySelectorAll('input[name="sett-lang"]');
  const radioImg = document.querySelectorAll('input[name="sett-image"]');
  const tabs = document.querySelectorAll('#settings-tabs li');
  const inputTag = document.querySelector('#setting-tag-input');
  const toggleSwitchHidden = document.querySelectorAll(
    'input[name="sett-hidden"]'
  );

  for (let btn of toggleSwitchHidden) {
    if (readFromLocalStorage(btn.id) == null) {
      btn.checked = true;
      saveToLocalStorage(btn.id, btn.checked);
    } else {
      btn.checked = readFromLocalStorage(btn.id);
    }
    hiddenBlock(btn.id, readFromLocalStorage(btn.id));
    btn.addEventListener('change', function () {
      saveToLocalStorage(this.id, this.checked);
      hiddenBlock(this.id, this.checked);
    });
  }

  function hiddenBlock(className, checked) {
    let block = document.querySelector(`.${className}`);
    block.style.transition = 'opacity 0.5s ease-in';
    checked
      ? block.classList.remove('opacity')
      : block.classList.add('opacity');
  }

  // переменные для перевода настроек
  const settingTitleLang = document.querySelector('.setting-title-lang');
  const settingTitleImage = document.querySelector('.setting-title-image');
  const settingTitleHidden = document.querySelector('.setting-title-hidden');
  const timeTitle = document.querySelector('.switch-time');
  const dataTitle = document.querySelector('.switch-data');
  const greetingTitle = document.querySelector('.switch-greeting');
  const quoteTitle = document.querySelector('.switch-quote');
  const playerTitle = document.querySelector('.switch-player');
  const weatherTitle = document.querySelector('.switch-weather');
  const todoTitle = document.querySelector('.switch-todo');
  const todo = document.querySelector('.todo-title');
  const todoFact = document.querySelector('.p-todo');
  const todoInput = document.querySelector('.todo ');

  translateSettingDisplay(lang);
  let globalTags = '';

  for (let radioButton of radioLang) {
    if (radioButton.value === lang) {
      radioButton.checked = true;
    }
    radioButton.addEventListener('change', function () {
      localStorage.setItem('lang', this.value);
      quote(this.value, previous);
      greeting(this.value);
      translateSettingDisplay(this.value);
      showDate(this.value);
      weatherWidget(this.value);
    });
  }

  for (let radioButton of radioImg) {
    if (
      readFromLocalStorage('images') == null &&
      radioButton.value === 'github'
    ) {
      radioButton.checked = true;
    } else if (radioButton.value == readFromLocalStorage('images')) {
      radioButton.checked = true;
    }
    if (radioButton.value == 'unsplash' || radioButton.value == 'flickr') {
      inputTag.style.display = 'block';
    } else {
      inputTag.style.display = 'none';
    }

    radioButton.addEventListener('change', function () {
      if (radioButton.value == 'unsplash' || radioButton.value == 'flickr') {
        inputTag.style.display = 'block';
      } else {
        inputTag.style.display = 'none';
      }
      saveToLocalStorage('images', radioButton.value);
      inputTag.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
          globalTags = inputTag.value;
          imageBg(this.value, globalTags);
          saveToLocalStorage('tag', globalTags);
        }
      });
      imageBg(this.value, globalTags);
    });
  }
  // открыть/скрыть меню настройки
  document.addEventListener('click', (e) => {
    let click = e.target;

    if (click == settingsBtn) {
      settingsPanel.classList.toggle('active');
      settingsBtn.classList.toggle('setting-icon-active');
      todoPanel.classList.remove('active');
      todoBtn.classList.remove('todo-icon-active');
    }
    if (click == todoBtn) {
      todoPanel.classList.toggle('active');
      settingsPanel.classList.remove('active');
      todoBtn.classList.toggle('todo-icon-active');
      settingsBtn.classList.remove('setting-icon-active');
    }
    if (
      !click.matches('.sett-btn') &&
      !click.closest('.setting-panel') &&
      !click.matches('.todo-btn') &&
      !click.closest('.todo-panel') &&
      !click.matches('.delete-btn')
    ) {
      settingsPanel.classList.remove('active');
      settingsBtn.classList.remove('setting-icon-active');
      todoPanel.classList.remove('active');
      todoBtn.classList.remove('todo-icon-active');
    }
  });
  // выбирать и отбражать подпункт настроек
  tabs.forEach((tab) => {
    tab.addEventListener('click', function () {
      const tabId = this.getAttribute('data-tab');
      const activeTab = document.querySelector('#settings-tabs .active');
      const activeContent = document.querySelector('.settings-content.active');
      if (activeTab) {
        activeTab.classList.remove('active');
      }
      if (activeContent) {
        activeContent.classList.remove('active');
      }
      this.classList.add('active');
      const content = document.querySelector(`#${tabId}`);
      if (content) {
        content.classList.add('active');
      }
    });
  });

  function translateSettingDisplay(lang) {
    settingTitleLang.textContent =
      lang == 'ru' ? 'Настройки языка:' : 'Setting language:';
    settingTitleImage.textContent =
      lang == 'ru' ? 'Источник изображений:' : 'Image source:';
    settingTitleHidden.textContent =
      lang == 'ru' ? 'Скрыть / показать блоки:' : 'Hide / Show blocks:';
    inputTag.placeholder =
      lang == 'ru' ? 'Что ищем?' : 'What are we looking for?';
    timeTitle.textContent = lang == 'ru' ? 'Время' : 'Time';
    dataTitle.textContent = lang == 'ru' ? 'Дата' : 'Date';
    greetingTitle.textContent = lang == 'ru' ? 'Приветствие' : 'Greeting';
    quoteTitle.textContent = lang == 'ru' ? 'Цитаты' : 'Quote';
    playerTitle.textContent = lang == 'ru' ? 'Плеер' : 'Player';
    weatherTitle.textContent = lang == 'ru' ? 'Погода' : 'Weather';
    todoTitle.textContent = lang == 'ru' ? 'Список задач' : 'Todo';
    todo.textContent = lang === 'ru' ? 'Задачи' : 'Tasks';
    todoFact.textContent =
      lang == 'ru'
        ? 'Забавный факт: запись задач повышает производительность, введите что-нибудь ниже, чтобы начать.'
        : 'Fun Fact: Writing down tasks yields more productivity, input something below to get started.';
    todoInput.placeholder = lang == 'ru' ? 'Новая задача' : 'New task';
  }
}
