/* eslint-disable no-param-reassign */
function handleSettings(flag) {
  const burgerIcon = document.querySelector('.burger__icon');
  const settingsList = document.querySelector('.header__settings');
  if (!flag) {
    flag = true;
    burgerIcon.classList.add('burger__icon_opened');
    settingsList.style.left = '0';
  } else {
    flag = false;
    burgerIcon.classList.remove('burger__icon_opened');
    settingsList.style.left = '-100vw';
  }
}
export default handleSettings;
