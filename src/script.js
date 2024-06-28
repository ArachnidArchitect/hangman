let hiddenWord;
let wordArray;
let livesLeft = [];
let userGuess = [];

async function getData() {
  try {
    const response = await fetch('https://random-word-api.herokuapp.com/word');
    const data = await response.json();
    hiddenWord = data[0]; // assuming the API returns an array with a single word
    wordArray = hiddenWord.split('');
    printDOM();
  } catch (error) {
    alert('Error fetching data:', error);
  }
}

async function init() {
  await getData();
  // now you can use hiddenWord and wordArray
  console.log(hiddenWord);
  console.log(wordArray);
}

init();

let letters = document.querySelectorAll('.letter');
let displayDOM = document.querySelector('.display');
let lives = document.querySelector('.lifelines');

function printDOM() {
  for (let i = 0; i < wordArray.length; i++) {
    userGuess.push('-');
  }
  for (let i = 0; i < wordArray.length; i++) {
    if (wordArray.includes(' ')) {
      let index = wordArray.indexOf(' ');
      userGuess[index] = ' '
      wordArray[index] = '-';
    }
  }
  displayDOM.innerText = userGuess.join('');
  lives.innerText = livesLeft.join('');
}

letters.forEach(letter => {
  letter.addEventListener("click", () => {
    letter.setAttribute('disabled', '');
    if (livesLeft.length == 7) {
      alert("You lose!");
      alert(`you're word was: ${hiddenWord}`);
    } else {
      // validation goes here
      if (wordArray.includes(letter.innerText)) {
        let findMe = wordArray.filter(realLetter => {
          return realLetter == letter.innerText
        })
        while (findMe.length > 0) {
          let index = wordArray.indexOf(letter.innerText)
          userGuess[index] = letter.innerText
          displayDOM.innerText = userGuess.join('')
          wordArray[index] = '-'
          findMe.pop()
        }
      } else {
        livesLeft.push('X');
        lives.innerText = livesLeft.join('');
      }
      if (userGuess.join('') == hiddenWord) alert('Woohoo! you got it right')
    }
  });
});