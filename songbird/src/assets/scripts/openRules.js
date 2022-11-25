const openRulesBtn = document.querySelector('.rules');
const closeRulesBtn = document.querySelector('.close-rules');
const rules = document.querySelector('.start-page__rules');

function showRules() {
  rules.classList.remove('hidden');
}

function closeRules() {
  rules.classList.add('hidden');
}
openRulesBtn.addEventListener('click', showRules);
closeRulesBtn.addEventListener('click', closeRules);
