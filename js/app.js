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
  "Someday never comes"
];

const startButton = document.querySelector('.btn__reset');
const startScreen = document.getElementById('overlay');

// Choose random phrase
function getRandomPhraseArray(array) {
  const index = Math.floor(Math.random() * phrases.length);
  const phrase = array[index];
  const letters = phrase.split("");
  return letters;
}

// Split phrase into letters and create list items for each letter
function addPhraseToDisplay(array) {
  const letters = getRandomPhraseArray(array);
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const li = document.createElement('li');
    li.className = "letter";
    li.textContent = letter;
      if (li.textContent === " ") {
        li.className = "space";
      }
    ul.appendChild(li);
  }
}

// reset game
function clearGame() {
  missed = 0;
  // reset phrase section
  let phraseUl = document.querySelector('ul');
  let phraseSection = phraseUl.parentNode;
  phraseSection.removeChild(phraseUl);
  let newUl = document.createElement('ul');
  phraseSection.appendChild(newUl);
  // reset keyboard
  let quertyKeys = document.querySelectorAll('.chosen');
  for (let i = 0; i < quertyKeys.length; i++) {
    quertyKeys[i].setAttribute('disabled', false);
    quertyKeys[i].classList.remove('chosen');
  }
  // reset lives
  const ol = document.querySelector('ol');
  const lives = ol.querySelectorAll('img');
  for (let i = 0; i < lives.length; i++) {
    lives[i].setAttribute('src', 'images/liveHeart.png');
  }
  addPhraseToDisplay(phrases);
}



// check keyboard input to compare with letters in phrase
qwerty.addEventListener('click', (e) => {
  let letterFound;
  if (e.target.tagName === "BUTTON") {
    const clicked = e.target;
    const lis = ul.children;
    const letters = [];

    for (let i = 0; i < lis.length; i++) {
      if (lis[i].className === "letter") {
        letters.push(lis[i]);
      }
    }

    function checkLetter (clicked) {
      let letter = null;
      for (let i = 0; i < letters.length; i++) {
        if(clicked.textContent === letters[i].textContent.toLowerCase()) {
          letter = letters[i].textContent.toLowerCase();
          letters[i].classList.add("show");
        }
        clicked.classList.add("chosen");
        clicked.setAttribute("disabled", true);
      }
      return letter;
    }
    letterFound = checkLetter(clicked);

    if (letterFound === null) {
      const ol = document.querySelector('ol');
      const lives = ol.getElementsByTagName('img');
      lives[missed].setAttribute('src', 'images/lostHeart.png');
      missed++;
    }

    function checkWin() {
      const show = document.getElementsByClassName('show');
      const letters = document.getElementsByClassName('letter');
      startButton.textContent = "Reset Game";

      if (show.length === letters.length) {
        clearGame();
        startScreen.classList.remove('start');
        startScreen.classList.add('win');
        startScreen.style.display = "flex";
      } else if (missed >= 5) {
        clearGame();
        startScreen.classList.remove('start');
        startScreen.classList.add('lose');
        startScreen.style.display = "flex";
      }
    }
  }
  checkWin();
});

// Start play
startButton.addEventListener('click', (e) => {
  //addPhraseToDisplay(phrases);
  startScreen.style.display = "none";
});

addPhraseToDisplay(phrases);
