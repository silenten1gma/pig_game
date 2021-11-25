'use strict';
const player0el = document.querySelector(".player--0");
const player1el = document.querySelector(".player--1");
const score0El = document.getElementById('score--0');
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const newBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const current0el = document.querySelector("#current--0");
const current1el = document.querySelector("#current--1");

score0El.textContent = 0;
score1El.textContent = 0;

diceEl.classList.add("hidden");

let scores,
    currentScore,
    activeplayer,
    playing;

init();

rollBtn.addEventListener('click', () => {
    if (playing) {
        // 1 - we generate a random number
        const dice = Math.trunc(Math.random() * 6 + 1);
        // 2 - we display the dice
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`
        // 3 - we check for a one
        if (dice !== 1) {
            // add to the current score
            currentScore += dice;
            document.getElementById(`current--${activeplayer}`).textContent = currentScore;

        }
        else {
            // switch to player two
            switchPlayer()
        }
    }
})

holdBtn.addEventListener('click', () => {
    if (playing) {
        scores[activeplayer] += currentScore;

        document.getElementById(`score--${activeplayer}`).textContent = scores[activeplayer];

        if (scores[activeplayer] >= 100) {
            playing = false;
            diceEl.classList.add("hidden");
            document.querySelector(`.player--${activeplayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activeplayer}`).classList.remove('player--active');
        }
        else {
            switchPlayer();
        }
    }
})


newBtn.addEventListener('click', init);

function init() {
    scores = [0, 0];
    currentScore = 0;
    activeplayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0el.textContent = 0;
    current1el.textContent = 0;

    diceEl.classList.add("hidden");

    player0el.classList.remove("player--winner");
    player1el.classList.remove("player--winner");
    player0el.classList.add("player--active");
    player1el.classList.remove("player--active");
}

function switchPlayer() {
    currentScore = 0;
    document.getElementById(`current--${activeplayer}`).textContent = currentScore;
    activeplayer = activeplayer === 0 ? 1 : 0;
    player0el.classList.toggle("player--active");
    player1el.classList.toggle("player--active");
}