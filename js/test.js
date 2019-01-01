const phrase = document.getElementById('phrase');
const qwerty = document.getElementById('qwerty');
const missed = 0;

const startButton = document.querySelector('.btn__reset');
const startScreen = document.getElementById('overlay');

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

// Start play
startButton.addEventListener('click', (e) => {
  startScreen.style.display = "none";
});

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

// check keyboard input to compare with letters in phrase
qwerty.addEventListener('click', (e) => {
  if (e.target.tagName === "BUTTON") {
    const clicked = e.target;
    const letterChosen = clicked.textContent;
    // console.log(letterChosen); --> funktioniert, gibt Buchstabe zurück
    const lis = ul.children;
    // console.log(lis.length); funktioniert, gibt länge des arrays zurück
    const letters = [];
    const lettersUsed = [];

    for (let i = 0; i < lis.length; i++) {
      if (lis[i].className === "letter") {
        letters.push(lis[i]);
      }
    }
    // console.log(letters); gibt den Satz als einzelne Arrays zurück, wenn "letters.push(lis[i].textContent)"
    // console.log(letters[2].textContent); gibt den 3 Buchstaben zurück wenn "letters.push(lis[i]);"

    function checkLetter (clicked) {
      let letter = null;
      for (let i = 0; i < letters.length; i++) {
        if(clicked.textContent === letters[i].textContent) {
          letter = letters[i].textContent;
          letters[i].classList.add("show");
          //console.log(letters[i]);
        }
        clicked.classList.add("chosen");
        clicked.setAttribute("disabled", true);
      }
      return letter;
    }
    const letterFound = (checkLetter(clicked));
    checkLetter(clicked);
    console.log(letterFound);
    return letterFound;
  }
  const letterFound = checkLetter(clicked);
  if (letterFound === null) {
    missed++;
    console.log(missed);
  }
});


// display the phrase
addPhraseToDisplay(phrases);
