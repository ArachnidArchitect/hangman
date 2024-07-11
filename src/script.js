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
    hangmanFrames();
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
        hangmanFrames();
      }
      if (userGuess.join('') == hiddenWord){
    alert('Woohoo! you got it right'); init()
      location.reload()
    }}
  });
});
function hangmanFrames(){
  switch (livesLeft.length) {
    case 0:
      lives.innerHTML = `<img src="./src/images/frame.png" alt="">`
      break;
      case 1:
        lives.innerHTML = `<img src="./src/images/frame1.png" alt="">`
        break;
      case 2:
        lives.innerHTML = `<img src="./src/images/frame2.png" alt="">`
        break;
      case 3:
        lives.innerHTML = `<img src="./src/images/frame3.png" alt="">`
        break;
      case 4:
        lives.innerHTML = `<img src="./src/images/frame4.png" alt="">`
        break;
      case 5:
        lives.innerHTML = `<img src="./src/images/frame5.png" alt="">`
        break;
      case 6:
        lives.innerHTML = `<img src="./src/images/frame6.png" alt="">`
        break;
  
    default:
      break;
  }
}