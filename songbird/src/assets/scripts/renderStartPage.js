export default function renderFinalPage(variableBlock, langIndex, dataObject) {
  console.log('renderFinalPage');
  variableBlock.classList.remove('hidden');
  variableBlock.innerHTML = `
  <section class="start-page">
          <div class="start-page__text-block">
            <p class="start-page__text">
              ${dataObject[langIndex].greeting}
            </p>
          </div>
          <div class="start-page__rules hidden">
            <ul class="rules__list">
              <li class="rules__item">
                Для прохождения игры нужно ответить на 6 вопросов
              </li>
              <li class="rules__item">
                За каждый голос, верно угаданный с первого раза, ты получаешь 5
                баллов
              </li>
              <li class="rules__item">
                С каждой неверной попыткой количество баллов за вопрос
                уменьшается на единицу
              </li>
            </ul>
            <button class="close-rules">ОК</button>
          </div>
          <button class="start__btn start">${dataObject[langIndex].buttons[1].startGame}</button>
        </section>
 `;
}
