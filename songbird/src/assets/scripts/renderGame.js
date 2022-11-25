const body = document.querySelector('body');

function renderGame() {
  body.innerHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Songbird</title>
  </head>
  <body>
    <header class="header inner-container">
      <div class="header-content">
        <h1 class="header__title">
          Song<span class="header__title_red">Bird</span>
        </h1>
        <div class="header__main">
          <div class="burger">
            <span class="burger__icon burger__icon"></span>
          </div>
          <div class="header__settings">
            <div class="settings__item gallery">View Gallery</div>
            <div class="settings__item results">Best Results</div>
            <div class="settings__lang settings__item">
              <div class="nav__lang lang btn_active">EN</div>
              <div class="nav__lang lang btn_inactive">RU</div>
            </div>
          </div>
        </div>
      </div>
      <nav class="header__nav">
        <ul class="nav__list">
          <li class="nav__item nav__item_active">Разминка</li>
          <li class="nav__item">Воробьиные</li>
          <li class="nav__item">Лесные птицы</li>
          <li class="nav__item">Певчие птицы</li>
          <li class="nav__item">Хищные птицы</li>
          <li class="nav__item">Морские птицы</li>
        </ul>
      </nav>
      <div class="header__score">Score: <span class="score">0</span></div>
      <div class="header__question">
        Listen to the sounds and try to guess bird
      </div>
    </header>
    <main class="game inner-container">
      <section class="question">
        <div class="question__picture bird-picture"></div>
        <div class="question__content">
          <div class="question__subcontainer">
            <div class="question__bird-name bird-name">*****</div>
          </div>
          <div class="question__player player">
            <div class="player__controls">
              <button type="button" class="question__play play__btn"></button>
              <div class="timebar">
                <audio class="question__audio audio" src="#"></audio>
                <div class="timebar__row">
                  <input
                    class="timebar__row_input progress-bar"
                    id="timebar"
                    type="range"
                    value="40"
                    min="0"
                    max="100"
                    step="1"
                  />
                </div>
                <div class="timebar__timer">
                  <span class="current-time">00:00</span>
                  <span class="end-time">00:00</span>
                </div>
              </div>
            </div>

            <div class="volume">
              <button type="button" class="volume__btn"></button>
              <div class="volume__bar">
                <input
                  class="progress-bar volume__bar_input"
                  id="volume-bar"
                  type="range"
                  value="40"
                  min="0"
                  max="100"
                  step="1"
                />
              </div>
            </div>
          </div>
        </div>
        <button type="button" class="question__next_active">Next</button>
      </section>
      <section class="answers-info">
        <section class="answers">
          <ul class="answers__list">
            <li class="answers__item">
              <div class="answers__mark"></div>
              <div class="answer">gg</div>
            </li>
            <li class="answers__item">
              <div class="answers__mark"></div>
              <div class="answer">gg</div>
            </li>
            <li class="answers__item">
              <div class="answers__mark"></div>
              <div class="answer">gg</div>
            </li>
            <li class="answers__item">
              <div class="answers__mark"></div>
              <div class="answer">gg</div>
            </li>
            <li class="answers__item">
              <div class="answers__mark"></div>
              <div class="answer">gg</div>
            </li>
            <li class="answers__item">
              <div class="answers__mark"></div>
              <div class="answer">gg</div>
            </li>
          </ul>
        </section>
        <section class="bird-info_meta hidden">
          <div class="bird__picture bird-picture"></div>
          <div class="bird-data">
            <div class="bird__player player">
              <audio class="audio" src="#"></audio>
              <div class="player__controls">
                <div class="play__btn"></div>
                <div class="timebar">
                  <div class="timebar__row">
                    <input
                      class="timebar__row_input progress-bar"
                      id="timebar"
                      type="range"
                      value="40"
                      min="0"
                      max="100"
                      step="1"
                    />
                  </div>
                  <div class="timebar__timer">
                    <span class="current-time">00:00</span>
                    <span class="end-time">00:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      <section class="bird-info_main hidden">
        <div class="bird__name">Клест</div>
        <div class="bird__name_lat">ааа аааа</div>
        <div class="bird__description">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae sit
          corporis amet quo, et reiciendis aperiam eveniet nobis itaque
          dignissimos possimus harum soluta excepturi iure provident veritatis.
          Laborum, maxime dignissimos!
        </div>
      </section>
    </main>
    <footer class="footer inner-container">
      <div class="footer__name">By EmilyRight</div>
      <div class="footer__logo"></div>
      <div class="footer__year">2022</div>
    </footer>
  </body>
</html>
`;
}


export default questionIndex;
export { getRandomBird, renderGame };
