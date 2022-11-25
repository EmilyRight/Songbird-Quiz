/* eslint-disable no-loop-func */
/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import { birdsDataEn, gameDataEn } from './data/enData';
import birdsData from './data/ruData';
import renderFinalPage, { setFinalPageBlocks } from './renderFinalPage';
import handleSettings from './burger';
import renderStartPage from './renderStartPage';
import renderGallery, { flatArray } from './renderGallery';

const variableBlock = document.querySelector('.variable-block');
const main = document.querySelector('main');
const startPage = document.querySelector('.start-page');
const headerTitle = document.querySelector('.header__title');
let startGameBtn = document.querySelector('.start');
let startPhrase = document.querySelector('.start-page__text');
const langBtn = document.querySelectorAll('.lang');
const audioList = document.querySelectorAll('.audio');
const galleryBtn = document.querySelector('.gallery');
// subPlayer
let infoPlayBtn = document.querySelector('.bird__play');
let infoAudio = document.querySelector('.bird__audio');
let infoTimebar = document.getElementById('timebar-info');
let infoSeconds = document.querySelector('.current-time__seconds_info');
let infoMinutes = document.querySelector('.current-time__minutes_info');
let infoEndTime = document.querySelector('.end-time_info');
// mainPlayer
const mainPlayBtn = document.querySelector('.question__play');
const timebar = document.querySelector('.timebar__row_input');
const audio = document.querySelector('.question__audio');
const audioVolumeBar = document.querySelector('.volume__bar_input');
const audioVolumeBtn = document.querySelector('.volume__btn');
const seconds = document.querySelector('.current-time__seconds');
const minutes = document.querySelector('.current-time__minutes');
const endTime = document.querySelector('.end-time');
// UI
const birdsTypes = document.querySelectorAll('.nav__item');
const scoreSpan = document.querySelector('.score');
const nextBtn = document.querySelector('.question__next_active');
const birdMainInfo = document.querySelector('.bird-info_main');
const birdName = document.querySelector('.bird-name');
const finishBtn = document.querySelector('.question__finish_active');
const startText = document.querySelector('.start-page__text');
const guessPhrase = document.querySelector('.bird-info__question');
const headerScore = document.querySelector('.score-title');
const answersItemsList = document.querySelectorAll('.answers__item');
const answers = document.querySelectorAll('.answer');
const answerMarks = document.querySelectorAll('.answers__mark');
const contentSectionList = document.querySelectorAll('.content-section');

const rightAnswerSound = document.querySelector('.right-answer');
const wrongAnswerSound = document.querySelector('.wrong-answer');
const bestResultsBtn = document.querySelector('.results');
const BackToStartBtn = document.querySelector('.back-to-start');
const settingsList = document.querySelectorAll('.settings__item');
const rulesList = document.querySelectorAll('.rules__item');
const burger = document.querySelector('.burger');
let finalPageBtn;
let finalPage = document.querySelector('.final-page');
let finalPageGrats = document.querySelector('.final-page__grats');
let ratingList;
let isOpened = false;
let questionIndex;
let lang;
let langIndex;

let sourceArray = birdsData;
let gameData;
let isPlayed = false;
let isPaused = true;
let isMainAudioPlaying = false;
let isInfoAudioPlaying = false;
const isEnded = false;
let isNext = false;
let isMuted = false;
let rightAnswer = false;
let ableToGuess = true;
let isGameEnded = false;
let isRatingOpened = false;
let isGalleryOpened = false;
let level = 0;
let score = 0;
let tries = 0;
let birdIndexInArray = 0;
// timer
let audioMinutes = 0;
let audioSeconds = 0;
let infoAudioMinutes = 0;
let infoAudioSeconds = 0;
let timer;

function chooseJSONsource() {
  return lang === 'EN' ? birdsDataEn : birdsData;
}

function getRandomBird() {
  questionIndex = Math.floor(Math.random() * 6);
  console.log('правильный ответ -', sourceArray[level][questionIndex].name);
  return questionIndex;
}
// ui
function setActiveLang(language) {
  langBtn.forEach((btn) => {
    if (btn.innerHTML === language) {
      btn.classList.add('hidden');
    } else {
      btn.classList.remove('hidden');
    }
  });
}
function showBirdMetaInfo() {
  const hiddenInfoItems = document.querySelectorAll('.bird-info_hidden');
  const question = document.querySelector('.bird-info__question');
  hiddenInfoItems.forEach((item) => {
    if (tries > 0) {
      item.classList.remove('hidden');
      question.classList.add('hidden');
    } else {
      item.classList.add('hidden');
      question.classList.remove('hidden');
    }
  });
}

function getLang() {
  const langLocal = localStorage.getItem('lang');
  if (langLocal) {
    lang = langLocal;
  }
}

function setLanguage(event) {
  lang = event.target.innerHTML;
  localStorage.setItem('lang', lang);
  sourceArray = chooseJSONsource();
  setTranslation(lang);
  if (isGameEnded) {
    endGame();
  }

  if (isRatingOpened) {
    showBest();
  }
  if (isGalleryOpened) {
    showGallery(birdIndexInArray);
  }
  throwAnswers();
  setActiveLang(lang);
  return lang;
}

function setTranslation(langSet) {
  if (langSet === 'EN') {
    langIndex = 0;
  } else {
    langIndex = 1;
  }

  nextBtn.innerHTML = gameDataEn[langIndex].buttons[0].next;
  startGameBtn.innerHTML = gameDataEn[langIndex].buttons[1].startGame;
  finishBtn.innerHTML = gameDataEn[langIndex].buttons[2].finish;
  startPhrase.innerHTML = gameDataEn[langIndex].greeting;
  for (let k = 0; k < birdsTypes.length; k += 1) {
    birdsTypes[k].innerHTML = gameDataEn[langIndex].levels[k];
  }
  for (let k = 0; k < settingsList.length; k += 1) {
    settingsList[k].innerHTML = gameDataEn[langIndex].settings[k];
  }
  for (let k = 0; k < rulesList.length; k += 1) {
    rulesList[k].innerHTML = gameDataEn[langIndex].rules[k];
  }
  startText.innerHTML = gameDataEn[langIndex].greeting;
  guessPhrase.innerHTML = gameDataEn[langIndex].guessFrase;
  headerScore.innerHTML = gameDataEn[langIndex].score;
}
function throwAnswers() {
  for (let i = 0; i < answers.length; i += 1) {
    answers[i].innerHTML = sourceArray[level][i].name;
  }
}

function resetGame() {
  level = 0;
  score = 0;
  tries = 0;
  isPlayed = false;
  isPaused = true;
  isMainAudioPlaying = false;
  isInfoAudioPlaying = false;
  isNext = false;
  rightAnswer = false;
  ableToGuess = true;
  audioMinutes = 0;
  audioSeconds = 0;
  isGameEnded = false;
  timer = 0;
  clearMark();
  audioList.forEach((audioItem) => {
    audioItem.pause();
  });
}
function startGame(page) {
  page.classList.add('hidden');
  resetGame();
  countScore();
  getRandomBird();
  setName();
  showBirdMetaInfo();
  setActiveLevel(birdsTypes, level);
  setSecretPic();
  activeFinishBtn(level, birdsTypes);
  contentSectionList.forEach((section) => {
    section.classList.remove('hidden');
  });
  birdMainInfo.classList.add('hidden');
  throwAnswers();
  inactiveNextBtn();
}

function setName() {
  const { name } = sourceArray[level][questionIndex];
  if (rightAnswer) {
    birdName.innerHTML = name;
  } else {
    birdName.innerHTML = '******';
  }
}
function markAnswer(event) {
  const answerItem = event.target.closest('.answers__item');
  const mark = answerItem.children[0];
  if (ableToGuess) {
    if (rightAnswer) {
      mark.classList.add('answers__mark_right');
    } else {
      mark.classList.add('answers__mark_wrong');
    }
  }
}

function setAnswerSounds() {
  if (ableToGuess) {
    if (rightAnswer) {
      rightAnswerSound.play();
    } else {
      wrongAnswerSound.play();
    }
  }
}

function clearMark() {
  answerMarks.forEach((mark) => {
    if (mark.classList.contains('answers__mark_right')) {
      mark.classList.remove('answers__mark_right');
    }
    if (mark.classList.contains('answers__mark_wrong')) {
      mark.classList.remove('answers__mark_wrong');
    }
  });
}

function setActiveLevel(array, index) {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].classList.contains('nav__item_active')) {
      array[i].classList.remove('nav__item_active');
    }
    array[index].classList.add('nav__item_active');
  }
}

function renderAnswer(event, birdTypeIndex, birdIndex) {
  birdMainInfo.classList.remove('hidden');
  const index = Array.from(answersItemsList).indexOf(event.target);
  const birdInfoPicture = document.querySelector('.bird__picture');
  const birdRightName = document.querySelector('.bird__name');
  const birdNameLat = document.querySelector('.bird__name_lat');
  const birdDescription = document.querySelector('.bird__description');
  const birdPictures = document.querySelectorAll('.bird-picture');
  setAudioDuration(infoEndTime, infoAudio);
  if ((!rightAnswer && ableToGuess) || (rightAnswer && !ableToGuess)) {
    birdInfoPicture.style.backgroundImage = `url(${sourceArray[level][index]?.image})`;
    birdRightName.innerHTML = sourceArray[level][index]?.name;
    birdNameLat.innerHTML = sourceArray[level][index]?.species;
    birdDescription.innerHTML = sourceArray[level][index]?.description;
    infoAudio.src = sourceArray[level][index]?.audio;
  } else {
    birdRightName.innerHTML = sourceArray[birdTypeIndex][birdIndex]?.name;
    birdNameLat.innerHTML = sourceArray[birdTypeIndex][birdIndex]?.species;
    birdDescription.innerHTML = sourceArray[birdTypeIndex][birdIndex]?.description;
    birdPictures.forEach((pic) => {
      pic.style.backgroundImage = `url(${sourceArray[birdTypeIndex][birdIndex]?.image})`;
    });
    infoAudio.src = sourceArray[birdTypeIndex][birdIndex]?.audio;
  }
}

function countScore() {
  if (rightAnswer) {
    const levelScore = 6 - tries;
    score += levelScore;
  }
  scoreSpan.innerHTML = `${score}`;
}

function choseAnswer(event) {
  const answerItem = event.target.closest('.answers__item');
  const mark = answerItem.children[0];
  const isRight = mark.classList.contains('answers__mark_right');
  const isWrong = mark.classList.contains('answers__mark_wrong');
  const userAnswer = answerItem.children[1].innerHTML;
  const answer = sourceArray[level][questionIndex]?.name;
  const sec = 0;
  const min = 0;
  if (tries < 6 && (!isRight && !isWrong)) {
    tries += 1;
  }
  showBirdMetaInfo();
  stopAudio(infoAudio, infoTimebar, infoPlayBtn, infoMinutes, infoSeconds, sec, min);
  clearInterval(timer);
  if (userAnswer === answer) {
    rightAnswer = true;
    markAnswer(event);
    setAnswerSounds();
    renderAnswer(event, level, questionIndex);
    ableToGuess = false;
    inactiveNextBtn();
    pauseAudio(audio, mainPlayBtn);
    setName();
    countScore();
    activeFinishBtn(level, birdsTypes);
  } else {
    setAnswerSounds();
    renderAnswer(event, level, questionIndex);
    markAnswer(event);
  }
}

// audio
function addAudioSource(audioItem, source) {
  if (audioItem) {
    audioItem.src = source;
  }
}

function togglePlay(button) {
  if (isPlayed) {
    button.classList.remove('play__btn');
    button.classList.add('pause__btn');
  } else {
    button.classList.remove('pause__btn');
    button.classList.add('play__btn');
  }
}

function setAudioDuration(endtime, audioItem) {
  let audioDuration;
  endtime.innerHTML = 'Loading...';
  audioItem.onloadedmetadata = function () {
    audioDuration = Math.trunc(audioItem.duration);
    const min = Math.floor(audioDuration / 60);
    const sec = audioDuration % 60;
    if (sec < 10) {
      endtime.innerHTML = `0${min}:0${sec}`;
    } else {
      endtime.innerHTML = `0${min}:${sec}`;
    }
  };
}

// function setTimer(min, sec, minutesHTML, secondsHTML) {
//   timer = setInterval(() => {
//     sec = audio.currentTime;
//     if (sec < 10) {
//       secondsHTML.innerHTML = `0${sec}`;
//     } else {
//       secondsHTML.innerHTML = `${sec}`;
//     }

//     if (sec >= 59) {
//       min += 1;
//       sec = 0;
//       secondsHTML.innerHTML = `0${sec}`;
//     }
//     if (min < 10) {
//       minutesHTML.innerHTML = `0${min}`;
//     }
//   }, 1000);
// }
function setTimer(audioItem, minutesHTML, secondsHTML) {
  let sec = 0;
  let min = 0;

  timer = setInterval(() => {
    sec = Math.floor(Math.trunc(audioItem.currentTime) % 60);
    min = Math.floor(Math.trunc(audioItem.currentTime) / 60);
    if (sec < 10) {
      secondsHTML.innerHTML = `0${sec}`;
    } else {
      secondsHTML.innerHTML = `${sec}`;
    }
    if (min < 10) {
      minutesHTML.innerHTML = `0${min}`;
    }
    if (min >= 10) {
      minutesHTML.innerHTML = `${min}`;
    }
    if (audioItem.currentTime === 0) {
      secondsHTML.innerHTML = '00';
      minutesHTML.innerHTML = '00';
    }
  }, 1000);
}
function saveTimer() {
  audioMinutes = +minutes.innerHTML;
  audioSeconds = +seconds.innerHTML;
  // console.log('saved', audioMinutes, audioSeconds, +minutes.innerHTML, +seconds.innerHTML);
}

function saveInfoAudioTimer() {
  infoAudioMinutes = +infoMinutes.innerHTML;
  infoAudioSeconds = +infoSeconds.innerHTML;
  // console.log('saved', infoAudioMinutes, infoAudioSeconds, +infoMinutes.innerHTML, +infoSeconds.innerHTML);
}

function nullTimer(minutesHTML, secondsHTML, secondsNumber, minutesNumber) {
  minutesHTML.innerHTML = '00';
  secondsHTML.innerHTML = '00';
  secondsNumber = 0;
  minutesNumber = 0;
}

function handleTimeBar(audioItem, audioTimeBar, button, minutesHTML, secondsHTML) {
  const value = (audioItem.currentTime / audioItem.duration) * 100;
  if (value) {
    audioTimeBar.style.background = `linear-gradient(to right, #800000 0%, #800000 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
    audioTimeBar.value = value;
  }
  if (audioItem.currentTime === audioItem.duration) {
    stopAudio(audioItem, audioTimeBar, button, minutesHTML, secondsHTML);
  }
  if (audioItem.currentTime === 0 && isNext) {
    stopAudio(audioItem, audioTimeBar, button, minutesHTML, secondsHTML);
  }
}

function playAudio(audioItem, bar, playBtn, minutesHTML, secondsHTML, endTimeHTML, src) {
  // console.log('audioItem -', audioMinutes, audioSeconds, minutesHTML, secondsHTML, endTimeHTML);
  if (isInfoAudioPlaying) {
    pauseInfoAudio();
  }
  isPlayed = true;
  isPaused = false;
  isMainAudioPlaying = true;
  if (audioItem.currentTime === 0) {
    bar.value = 0;
    isNext = false;
    togglePlay(playBtn);
    addAudioSource(audioItem, src);
    audioItem.play();
    setTimer(audioItem, minutesHTML, secondsHTML);
    setAudioDuration(endTimeHTML, audioItem);
  } else {
    togglePlay(playBtn);
    audioItem.play();
    setTimer(audioItem, minutesHTML, secondsHTML);
  }
}
audio.onended = function () {
  stopAudio(audio, timebar, mainPlayBtn, minutes, seconds, audioSeconds, audioMinutes);
};
infoAudio.onended = function () {
  stopAudio(infoAudio, infoTimebar, infoPlayBtn, infoMinutes, infoSeconds, 0, 0);
};
function pauseAudio(audioItem, playBtn) {
  isPaused = true;
  isPlayed = false;
  isMainAudioPlaying = false;
  audioItem.pause();
  togglePlay(playBtn);
  saveTimer();
  clearInterval(timer);
}
function stopAudio(
  audioItem,
  audioItemBar,
  button,
  minutesHTML,
  secondsHTML,
  secondsNumber,
  minutesNumber,
) {
  let value = (audioItem.currentTime / audioItem.duration) * 100;
  isPlayed = false;
  isPaused = true;
  value = 0;
  audioItemBar.value = 0;
  audioItemBar.style.background = `linear-gradient(to right, #800000 0%, #800000 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
  audioItem.pause();
  togglePlay(button);
  nullTimer(minutesHTML, secondsHTML, secondsNumber, minutesNumber);
  clearInterval(timer);
}
function playInfoAudio() {
  if (isMainAudioPlaying) {
    pauseAudio(audio, mainPlayBtn);
  }
  const infoAudioSec = +infoSeconds.innerHTML;
  const infoAudioMin = +infoMinutes.innerHTML;
  isPlayed = true;
  isPaused = false;
  isInfoAudioPlaying = true;
  togglePlay(infoPlayBtn);
  infoAudio.play();
  setTimer(infoAudio, infoMinutes, infoSeconds);
}

function pauseInfoAudio() {
  if (isPlayed) {
    isPaused = true;
    isPlayed = false;
    infoAudio.pause();
    togglePlay(infoPlayBtn);
    saveInfoAudioTimer();
    clearInterval(timer);
  }
}

infoPlayBtn.addEventListener('click', () => {
  if (infoPlayBtn.classList.contains('play__btn')) {
    playInfoAudio();
  } else {
    pauseInfoAudio();
  }
});

// UI
function inactiveNextBtn() {
  if (!rightAnswer) {
    nextBtn.classList.remove('question__next_active');
    nextBtn.classList.add('question__next_inactive');
  } else {
    nextBtn.classList.remove('question__next_inactive');
    nextBtn.classList.add('question__next_active');
  }
}

function activeFinishBtn(lvl, lvlsArray) {
  if (lvl + 1 === lvlsArray.length) {
    nextBtn.classList.add('hidden');
    finishBtn.classList.remove('hidden');
  } else {
    nextBtn.classList.remove('hidden');
    finishBtn.classList.add('hidden');
  }
}
function setSecretPic() {
  const birdPictures = document.querySelectorAll('.bird-picture');
  if (!rightAnswer) {
    birdPictures.forEach((birdPicture) => {
      birdPicture.style.backgroundImage = 'url("assets/images/pictures/bird06a46938.jpg")';
    });
  }
}

function setNewQuestion() {
  setName();
  birdMainInfo.classList.add('hidden');
}

function formatDate(date) {
  let dd = date.getDate();
  if (dd < 10) dd = `0${dd}`;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = `0${mm}`;

  let yy = date.getFullYear() % 100;
  if (yy < 10) yy = `0${yy}`;

  return `${dd}.${mm}.${yy}`;
}

function setScoreToLocalStorage(finalScore) {
  let savedResults = [];
  const date = formatDate(new Date());
  if (localStorage.getItem('emiResults')) {
    savedResults = JSON.parse(localStorage.getItem('emiResults'));
    const resultsRating = [].sort().reverse();
    for (let i = 0; i < savedResults.length; i += 1) {
      resultsRating.push(Number(savedResults[i].score));
    }
    if (finalScore > resultsRating[0]) {
      savedResults.push({ date: `${date.trim()}`, score: `${finalScore}` });
      localStorage.setItem('emiResults', JSON.stringify(savedResults));
    }
  } else {
    const results = [];
    results.push({ date: `${date.trim()}`, score: `${finalScore}` });
    localStorage.setItem('emiResults', JSON.stringify(results));
  }
}
function getScoreFromLocalStorage() {
  let results = [];
  if (localStorage.getItem('emiResults')) {
    results = JSON.parse(localStorage.getItem('emiResults'));
    ratingList = document.querySelector('.rating__list');
    results.forEach((result) => {
      const ratingItem = document.createElement('li');
      ratingItem.classList.add('rating__item');
      ratingItem.innerHTML = `
      <div class="rating__date">${result.date}</div>
      <div class="rating__score">${result.score}</div>`;
      ratingList.append(ratingItem);
    });
  }
}

function endGame() {
  isGameEnded = true;
  renderFinalPage(variableBlock, main, langIndex, gameDataEn, score);
  setFinalPageBlocks(score);
  setScoreToLocalStorage(score);
  finalPage = document.querySelector('.final-page');
  finalPageGrats = document.querySelector('.final-page__grats');
  finalPageBtn = document.querySelector('.final-page__button');
  getScoreFromLocalStorage();
  const BackToStartPageBtn = document.querySelector('.final-page__button_to-start');
  BackToStartPageBtn?.addEventListener('click', () => {
    showStartPage();
    resetGame();
  });
  finalPageBtn.addEventListener('click', () => {
    startGame(variableBlock);
  });
  stopAudio(audio, timebar, mainPlayBtn, minutes, seconds, audioSeconds, audioMinutes);
  stopAudio(infoAudio, infoTimebar, infoPlayBtn, infoMinutes, infoSeconds, 0, 0);
}

function showBest() {
  resetGame();
  isRatingOpened = true;
  isGalleryOpened = false;
  renderFinalPage(variableBlock, main, langIndex, gameDataEn, score);
  const grats = document.querySelector('.final-page__grats');
  if (grats) {
    grats.classList.add('hidden');
  }
  getScoreFromLocalStorage();
}

function showStartPage() {
  isRatingOpened = false;
  isGalleryOpened = false;
  const page = document.querySelector('.final-page');
  page?.classList.add('hidden');
  renderStartPage(variableBlock, langIndex, gameDataEn);
  startPhrase = document.querySelector('.start-page__text');
  setTranslation(lang);
  resetGame();
  const mainContent = document.querySelector('.game');
  mainContent?.classList.add('hidden');
  // const startPageContent = document.querySelector('.start-page');
  startGameBtn = document.querySelector('.start');
  startGameBtn?.addEventListener('click', () => {
    startGame(variableBlock);
  });
}
function showGallery(index) {
  isRatingOpened = false;
  isGalleryOpened = true;
  const flattenArray = flatArray(sourceArray);
  resetGame();
  renderGallery(variableBlock, main, flattenArray, index);
  setAudioDuration(infoEndTime, infoAudio);
  const galleryPicture = document.querySelector('.gallery-picture');
  galleryPicture.style.backgroundImage = `url(${flattenArray[index].image})`;
  // const galleryPlay = document.querySelector('.gallery__play');
  const galleryList = document.querySelector('.birds__list');
  infoAudio = document.querySelector('.bird__audio');
  infoPlayBtn = document.querySelector('.bird__play');
  infoTimebar = document.getElementById('timebar-info');
  infoSeconds = document.querySelector('.current-time__seconds_info');
  infoMinutes = document.querySelector('.current-time__minutes_info');
  infoEndTime = document.querySelector('.end-time_info');

  for (let i = 0; i < flattenArray.length; i += 1) {
    const galleryItem = document.createElement('li');
    galleryItem.classList.add('birds__item');

    galleryItem.innerHTML = flattenArray[i].name;
    galleryList.append(galleryItem);
    galleryItem.addEventListener('click', () => {
      birdIndexInArray = i;
      showGallery(i);
      galleryItem.classList.add('active');
    });
  }
  infoPlayBtn.addEventListener('click', () => {
    console.log(
      infoMinutes,
      infoSeconds,
    );
    clearInterval(timer);
    if (infoPlayBtn.classList.contains('play__btn')) {
      isPlayed = true;
      isPaused = false;
      infoPlayBtn.classList.remove('play__btn');
      infoPlayBtn.classList.add('pause__btn');
      playAudio(
        infoAudio,
        infoTimebar,
        infoPlayBtn,
        infoMinutes,
        infoSeconds,
        infoEndTime,
        flattenArray[birdIndexInArray].audio,
      );
    } else {
      // audioMinutes = +infoMinutes.innerHTML;
      // audioSeconds = +infoSeconds.innerHTML;
      isPlayed = false;
      isPaused = true;
      pauseAudio(infoAudio, infoPlayBtn);
    }
  });
  infoTimebar.addEventListener('click', (e) => scrub(e, infoAudio, infoTimebar));

  infoAudio.addEventListener('timeupdate', () => {
    handleTimeBar(infoAudio, infoTimebar, infoPlayBtn, infoMinutes, infoSeconds);
  });
  // console.log(
  //   isPlayed,
  //   isPaused,
  //   isMainAudioPlaying,
  //   isEnded,
  //   isNext,
  //   isMuted,
  //   rightAnswer,
  //   ableToGuess,
  //   level,
  //   score,
  //   tries,
  //   audioMinutes,
  //   audioSeconds,
  //   timer,
  // );
}
function scrub(e, audioItem, bar) {
  audioItem.currentTime = (e.offsetX / bar.offsetWidth) * audioItem.duration;
  console.log(e.offsetX, bar.offsetWidth, audioItem.currentTime);
}
function setNextQuestion() {
  stopAudio(audio, timebar, mainPlayBtn, minutes, seconds, audioSeconds, audioMinutes);
  stopAudio(infoAudio, infoTimebar, infoPlayBtn, infoMinutes, infoSeconds, 0, 0);
  if (rightAnswer) {
    isNext = true;
    rightAnswer = false;
    ableToGuess = true;
    audioSeconds = 0;
    audioMinutes = 0;
    isMainAudioPlaying = false;
    isInfoAudioPlaying = false;
    level += 1;
    setActiveLevel(birdsTypes, level);
    tries = 0;
    showBirdMetaInfo();
    inactiveNextBtn();
    getRandomBird();
    addAudioSource(audio, sourceArray[level][questionIndex]?.audio);
    nullTimer(minutes, seconds, audioSeconds, audioMinutes);
    throwAnswers();
    rightAnswer = false;
    setSecretPic();
    setNewQuestion();
    clearMark();
  }
}
// console.log(
//   isPlayed,
//   isPaused,
//   isMainAudioPlaying,
//   isEnded,
//   isNext,
//   isMuted,
//   rightAnswer,
//   ableToGuess,
//   level,
//   score,
//   tries,
//   audioMinutes,
//   audioSeconds,
//   timer,
// );
/* ------------------sound----------------*/
function toggleMuteSound(value) {
  if (isMuted) {
    audioVolumeBtn.classList.add('volume__btn_muted');
    audioVolumeBar.style.background = 'linear-gradient(to right, #710707 0%, #710707 0%, #c4c4c4 0%, #c4c4c4 100%)';
  } else {
    audioVolumeBtn.classList.remove('volume__btn_muted');
    audioVolumeBar.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
  }
}
function videoVolume() {
  isMuted = false;
  const v = this.value;
  audio.volume = v / 100;
  toggleMuteSound(v);
  if (audio.volume === 0) {
    isMuted = true;
    toggleMuteSound(v);
  }
}

function muteSound() {
  if (audio.volume && !isMuted) {
    isMuted = true;
    audio.volume = 0;
    audioVolumeBar.value = 0;
    toggleMuteSound(audio.volume);
  } else {
    isMuted = false;
    audio.volume = 0.5;
    audioVolumeBar.value = 50;
    toggleMuteSound(audioVolumeBar.value);
  }
}

langBtn.forEach((btn) => {
  btn.addEventListener('click', setLanguage);
});
headerTitle.addEventListener('click', () => {
  showStartPage();
  resetGame();
});
BackToStartBtn.addEventListener('click', () => {
  showStartPage();
  resetGame();
});

startGameBtn?.addEventListener('click', () => {
  startGame(variableBlock);
});
finishBtn.addEventListener('click', endGame);
mainPlayBtn.addEventListener('click', () => {
  if (mainPlayBtn.classList.contains('play__btn')) {
    playAudio(
      audio,
      timebar,
      mainPlayBtn,
      minutes,
      seconds,
      endTime,
      sourceArray[level][questionIndex]?.audio,
    );
  } else {
    pauseAudio(audio, mainPlayBtn);
  }
});
answersItemsList.forEach((item) => {
  item.addEventListener('click', choseAnswer);
});
nextBtn.addEventListener('click', setNextQuestion);
audio.addEventListener('timeupdate', () => {
  handleTimeBar(audio, timebar, mainPlayBtn, minutes, seconds);
});
infoAudio.addEventListener('timeupdate', () => {
  handleTimeBar(infoAudio, infoTimebar, infoPlayBtn, infoMinutes, infoSeconds);
});
audioVolumeBar.addEventListener('input', videoVolume);
audioVolumeBar.addEventListener('mousedown', videoVolume);
audioVolumeBtn.addEventListener('click', muteSound);
burger.addEventListener('click', () => {
  handleSettings(isOpened);
  if (!isOpened) {
    isOpened = true;
  } else {
    isOpened = false;
  }
});
bestResultsBtn.addEventListener('click', showBest);
window.onload = function () {
  getLang();
  setTranslation(lang);
  setActiveLang(lang);
  sourceArray = chooseJSONsource();
};
galleryBtn.addEventListener('click', () => {
  showGallery(birdIndexInArray);
});
timebar.addEventListener('click', (e) => scrub(e, audio, timebar));
timebar.addEventListener('touchend', (e) => scrub(e, audio, timebar));
infoTimebar.addEventListener('click', (e) => scrub(e, infoAudio, infoTimebar));
// alert('Привет) Я очень старалась успеть, но нишмагла. Буду очень благодарна, если дашь мне время до вечера среды)');
