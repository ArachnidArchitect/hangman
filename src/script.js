let letters = document.querySelectorAll('.letter')
let userGuess = []

let hiddenWord = "test"
let wordArray = hiddenWord.split('')
let index = 0

letters.forEach(letter => {
    letter.addEventListener("click", ()=>{
        if (index == wordArray.length-1) {
            alert('Woohoo! you got it right')
            index = 0
        }else{
        // validation goes here
        if(letter.innerText == wordArray[index]){
            userGuess.push(letter.innerText)
            console.log(wordArray[index])
            console.log(userGuess)
            index++
        }else{
            // console.log('your button is: ' + letter.innerText)
            // console.log('press ' + wordArray[index])

        }}
    })
    
});