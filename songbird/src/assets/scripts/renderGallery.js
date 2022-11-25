export default function renderGallery(variableBlock, mainBlock, dataArray, index) {
  mainBlock.classList.add('hidden');
  variableBlock.classList.remove('hidden');
  variableBlock.innerHTML = `<section class="bird-info_meta gallery-block">

<div class="bird-info_hidden bird-data gallery-bird-data">
<div
  class="bird-info bird-picture gallery-picture"
></div>
  <div class="bird__player player">
    <audio class="bird__audio audio" src="${dataArray[index].audio}"></audio>
    <div class="player__controls">
      <div class="bird__play gallery__play play__btn"></div>
      <div class="timebar">
        <div class="timebar__row">
          <input
            class="timebar__row_input progress-bar"
            id="timebar-info"
            type="range"
            value="0"
            min="0"
            max="100"
            step="1"
          />
        </div>
        <div class="timebar__timer">
          <span class="current-time"
            ><span
              class="current-time__minutes current-time__minutes_info gallery-minutes"
              >00</span
            >:<span
              class="current-time__seconds current-time__seconds_info gallery-seconds"
              >00</span
            ></span
          >
          <span class="end-time end-time_info">00:00</span>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="bird-info_main gallery-bird-info_main">
  <div class="bird__name">${dataArray[index].name}</div>
  <div class="bird__name_lat">${dataArray[index].species}</div>
  <div class="bird__description">
  ${dataArray[index].description}
  </div>
</div>
<ul class="birds__list">
</ul>
</section>`;
}

function flatArray(array) {
  const newDataArray = array.flat();
  return newDataArray;
}

export { flatArray, renderGallery };
