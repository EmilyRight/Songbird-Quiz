export default function renderFinalPage(variableBlock, mainBlock, langIndex, dataOblect, score) {
  mainBlock.classList.add('hidden');
  variableBlock.classList.remove('hidden');
  variableBlock.innerHTML = `
  <section class="final-page">
  <div class="final-page__grats">
    <div class="final-page__text">
      <div class="final-page__title final-page__max-score">
      ${dataOblect[langIndex].maxScoreCongrats}
      </div>
      <div class="final-page__title final-page__low-score">
      ${dataOblect[langIndex].lowScoreCongrats}
    </div>
      <div class="final-page__text_main">
      ${dataOblect[langIndex].resultPhrase[0]} <span class="final-page__score">${score}</span> ${dataOblect[langIndex].resultPhrase[1]}!
      </div>
      <div class="final-page__content final-page__max-score">
      ${dataOblect[langIndex].finalPhrase}
      </div>
    </div>
    <button class="final-page__button final-page__low-score"> ${dataOblect[langIndex].buttons[3].restart}</button>
    <button class="final-page__button_to-start final-page__max-score">${dataOblect[langIndex].buttons[4].toStart}</button>
  </div>
  <div class="final-page__rating rating">
    <div class="rating__title">${dataOblect[langIndex].bestResults}</div>
    <ul class="rating__list">
      <li class="rating__item">
        <div class="rating__date">${dataOblect[langIndex].bestResultDate}</div>
        <div class="rating__score">${dataOblect[langIndex].bestResultScore}</div>
      </li>
    </ul>
  </div>
</section>
 `;
}

export function setFinalPageBlocks(score) {
  const maxScoreBlocksToHide = document.querySelectorAll('.final-page__max-score');
  const lowScoreBlocksToHide = document.querySelectorAll('.final-page__low-score');
  if (score < 30) {
    maxScoreBlocksToHide.forEach((block) => block.classList.add('hidden'));
  } else {
    lowScoreBlocksToHide.forEach((block) => block.classList.add('hidden'));
  }
}
