/* eslint-disable no-param-reassign */
let isPlayed = false;
let isPaused = false;
const isMuted = false;
let isEnded = false;
let isNext = false;
let audioMinutes = 0;
let audioSeconds = 0;
let timer;

function addAudioSource(audioItem, array, gameLvlNumber, questionNumber) {
  audioItem.src = array[gameLvlNumber][questionNumber].audio;
}

function togglePlay(btn) {
  if (isPlayed) {
    btn.classList.remove('play__btn');
    btn.classList.add('pause__btn');
  } else {
    btn.classList.remove('pause__btn');
    btn.classList.add('play__btn');
  }
}

function setAudioDuration(endTime, audioItem) {
  endTime.innerHTML = 'Loading...';
  audioItem.onloadedmetadata = function () {
    audioDuration = Math.ceil(audioItem.duration);
    const min = Math.floor(audioDuration / 60);
    const sec = audioDuration % 60;
    if (sec < 10) {
      endTime.innerHTML = `0${min}:0${sec}`;
    } else {
      endTime.innerHTML = `0${min}:${sec}`;
    }
  };
}
function setTimer(min, sec, secondsHTML, minutesHTML) {
  timer = setInterval(() => {
    passedTrackTime += 1;
    sec += 1;
    if (sec < 10) {
      secondsHTML.innerHTML = `0${sec}`;
    } else {
      secondsHTML.innerHTML = `${sec}`;
    }

    if (sec >= 59) {
      min += 1;
      sec = 0;
      secondsHTML.innerHTML = `0${sec}`;
    }
    if (min < 10) {
      minutesHTML.innerHTML = `0${min}`;
    }
  }, 1000);
}
function saveTimer(secondsHTML, minutesHTML) {
  audioMinutes = +minutesHTML.innerHTML;
  audioSeconds = +secondsHTML.innerHTML;
}

function nullTimer(secondsHTML, minutesHTML) {
  audioMinutes = 0;
  audioSeconds = 0;
  secondsHTML.innerHTML = '00';
  minutesHTML.innerHTML = '00';
}

function handleTimeBar(audioItem, timeBar, btn) {
  let value = (audioItem.currentTime / audioItem.duration) * 100;
  if (value) {
    timeBar.style.background = `linear-gradient(to right, #800000 0%, #800000 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
    timeBar.value = value;
  }
  if (audioItem.currentTime === audioItem.duration) {
    value = 0;
    timeBar.value = 0;
    timeBar.style.background = `linear-gradient(to right, #800000 0%, #800000 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
    isPlayed = false;
    isPaused = false;
    isEnded = true;
    togglePlay(btn);
    nullTimer();
    clearInterval(timer);
  }
  if (audioItem.currentTime === 0 && isNext) {
    value = 0;
    timeBar.value = 0;
    timeBar.style.background = `linear-gradient(to right, #800000 0%, #800000 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
    isPlayed = false;
    isPaused = false;
    togglePlay(btn);
    nullTimer();
    clearInterval(timer);
  }
}

function playAudio(audioItem, timeBar, mainBtn, endtime) {
  if (!isPlayed) {
    if (!isPaused) {
      timeBar.value = 0;
      isPlayed = true;
      isNext = false;
      addAudioSource();
      togglePlay(mainBtn);
      audioItem.play();
      setTimer(audioMinutes, audioSeconds);
      setAudioDuration(endtime, audioItem);
    } else {
      isPlayed = true;
      togglePlay(mainBtn);
      audioItem.play();
      setTimer(audioMinutes, audioSeconds);
    }
  }
}

function pauseAudio(audioItem, timeBar, btn, secondsHTML, minutesHTML) {
  if (isPlayed) {
    isPaused = true;
    isPlayed = false;
    audioItem.pause();
    togglePlay(btn);
    saveTimer(secondsHTML, minutesHTML);
    clearInterval(timer);
  }
}

export { pauseAudio, playAudio };
