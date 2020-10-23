'use strict'

// Selecting elements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.getElementById('score--0')
const score1El = document.getElementById('score--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

// Modal
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.close-modal')
const btnOpenModal = document.getElementById('show-modal')

const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

// Starting conditions
score0El.textContent = 0
score1El.textContent = 0
diceEl.classList.add('hidden')

const scores = [0, 0]
let currentScore = 0
let activePlayer = 0

// Mutation functions
const updateCurrentScore = (dice, player) => {
  if (dice !== 0) {
    currentScore += dice
    if (player === 0) {
      current0El.textContent = currentScore
    } else {
      current1El.textContent = currentScore
    }
  } else {
    document.getElementById(`current--${player}`).textContent = 0
    currentScore = 0
  }
}

const updateScore = (player) => {
  scores[player] += currentScore
  if (player === 0) {
    score0El.textContent = scores[player]
  } else {
    score1El.textContent = scores[player]
  }
}

const changePlayer = (player) => {
  updateCurrentScore(0, player)
  player0El.classList.toggle('player--active')
  player1El.classList.toggle('player--active')
  activePlayer = player === 0 ? 1 : 0
}

// Rolling dice functionality
btnRoll.addEventListener('click', () => {
  const dice = Math.trunc(Math.random() * 6) + 1
  diceEl.classList.remove('hidden')
  diceEl.src = `/pig-game/img/dice-${dice}.png`

  if (dice !== 1) {
    updateCurrentScore(dice, activePlayer)
  } else {
    changePlayer(activePlayer)
  }
})

btnHold.addEventListener('click', () => {
  updateScore(activePlayer)
  changePlayer(activePlayer)
})

btnNew.addEventListener('click', () => {
  diceEl.classList.add('hidden')
  scores[0] = 0
  scores[1] = 0
  document.getElementById('score--0').textContent = 0
  document.getElementById('score--1').textContent = 0
  document.querySelector('.current--0').textContent = 0
  document.querySelector('.current--1').textContent = 0
})

const openModal = () => {
  modal.classList.remove('hidden')
  overlay.classList.remove('hidden')
}

const closeModal = () => {
  modal.classList.add('hidden')
  overlay.classList.add('hidden')
}

btnOpenModal.addEventListener('click', openModal)
btnCloseModal.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)