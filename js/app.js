const phrase = document.getElementById('phrase');
const qwerty = document.getElementById('qwerty');
let missed = 0;

const ul = phrase.querySelector('ul');
const phrases = [
  "Live is a journey",
  "Happy new year",
  "Love what you do",
  "Take a break",
  "I love to code",
  "Do what you want",
  "Treehouse is cool"
];

const startButton = document.querySelector('.btn__reset');
const startScreen = document.getElementById('overlay');

const title = document.querySelector('.title');

// Choose random phrase
function getRandomPhraseArray(array) {
  let index = Math.floor(Math.random() * phrases.length);
  let phrase = array[index].toUpperCase();
  let letters = phrase.split("");
  return letters;
}

// Split phrase into letters and create list items for each letter
function addPhraseToDisplay(array) {
  let letters = getRandomPhraseArray(array);
  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];
    let li = document.createElement('li');
    li.className = "letter";
    li.textContent = letter;
    if (li.textContent === " ") {
      li.className = "space";
    }
    ul.appendChild(li);
  }
  return letters;
}

// reset phrase section
function resetPhrase() {
  let phraseUl = document.querySelector('ul');
  phraseUl.innerHTML = "";
}

// reset keyboard
function resetKeyboard() {
  let quertyKeys = document.querySelectorAll('.chosen');
  for (let i = 0; i < quertyKeys.length; i++) {
    quertyKeys[i].removeAttribute('disabled');
    quertyKeys[i].classList.remove('chosen');
  }
}

// reset lives
function resetHearts() {
  let ol = document.querySelector('ol');
  let lives = ol.querySelectorAll('img');
  for (let i = 0; i < lives.length; i++) {
    lives[i].setAttribute('src', 'images/green-bullet.png');
  }
}

// reset game
function clearGame() {
  missed = 0;
  resetPhrase();
  resetKeyboard();
  resetHearts();
}

function checkLetter(clicked, array) {
  let letter = null;
  for (let i = 0; i < array.length; i++) {
    if (clicked.textContent === array[i].textContent.toLowerCase()) {
      letter = array[i].textContent.toLowerCase();
      array[i].classList.add("show");
      array[i].style.transition = "all 3s ease";
    }
    clicked.classList.add("chosen");
    clicked.setAttribute("disabled", true);
  }
  return letter;
}

// check keyboard input to compare with letters in phrase
qwerty.addEventListener('click', (e) => {
  let letterFound;
  if (e.target.tagName === "BUTTON") {
    let clicked = e.target;
    let lis = ul.children;
    let letters = [];

    for (let i = 0; i < lis.length; i++) {
      if (lis[i].className === "letter") {
        letters.push(lis[i]);
      }
    }

    letterFound = checkLetter(clicked, letters);

    if (letterFound === null) {
      let ol = document.querySelector('ol');
      let lives = ol.getElementsByTagName('img');
      lives[missed].setAttribute('src', 'images/orange-bullet.png');
      missed++;
    }
  }
  checkWin();
});

function checkWin() {
  let show = document.getElementsByClassName('show');
  let letters = document.getElementsByClassName('letter');
  startButton.textContent = "New Game";

  if (show.length === letters.length) {
    clearGame();
    startScreen.className = 'win';
    startScreen.style.display = "flex";
    title.textContent = "Congatulations - you're a winner!";
  } else if (missed >= 5) {
    clearGame();
    startScreen.className = 'lose';
    startScreen.style.display = "flex";
    title.textContent = "Sorry - no lives left, you lost!";
  }
}

// Start play
startButton.addEventListener('click', (e) => {
  addPhraseToDisplay(phrases);
  startScreen.style.display = "none";
});
