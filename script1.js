'use strict';
let score0El = document.querySelector('#score--0');
let score1El = document.getElementById('score--1');

let currentScore0El = document.getElementById('current--0');
let currentScore1El = document.getElementById('current--1');

let diceEl = document.querySelector('.dice');
diceEl.classList.add('hidden');
let btnRollEl = document.querySelector('.btn--roll');
let btnHoldEl = document.querySelector('.btn--hold');
let newBtn = document.querySelector('.btn--new');
let active, isPlaying, current, score;

setInitialValues();
function findActivePlayer() {
  current = 0;

  document
    .querySelector(`.player--${active}`)
    .classList.remove('player--active');
  active = active === 0 ? 1 : 0;
  document.querySelector(`.player--${active}`).classList.add('player--active');
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
}

btnRollEl.addEventListener('click', function () {
  if (isPlaying) {
    let secretNumber = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${secretNumber}.png`;
    if (secretNumber != 1) {
      current += secretNumber;
      document.getElementById(`current--${active}`).textContent = current;
    } else {
      document.getElementById(`current--${active}`).textContent = 0;
      findActivePlayer();
    }
  }
});
btnHoldEl.addEventListener('click', function () {
  if (isPlaying) {
    score[active] += current;
    document.querySelector(`#score--${active}`).textContent = score[active];
    if (score[active] < 20) {
      findActivePlayer();
    } else {
      isPlaying = false;
      document
        .querySelector(`.player--${active}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${active}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    }
  }
});
newBtn.addEventListener('click', function () {
  document
    .querySelector(`.player--${active}`)
    .classList.remove('player--winner');

  setInitialValues();
});
function setInitialValues() {
  score0El.textContent = 0;
  score1El.textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  active = 0;
  isPlaying = true;
  score = [0, 0];
  current = 0;
  document.querySelector(`.player--${active}`).classList.add('player--active');
  diceEl.classList.add('hidden');
}
