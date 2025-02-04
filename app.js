
const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModel = document.querySelector(".game-model");
const playAgainBtn = document.querySelector(".play-again");


let currentWord ,correctLetters , wrongGuessesCount;
const maxGuesses = 6;


const resetGame = () =>{
    correctLetters = [];
    wrongGuessesCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessesCount}.svg`;
    guessesText.innerHTML = `${wrongGuessesCount} / ${maxGuesses} `;
    keyboardDiv.querySelectorAll("button").forEach(btn =>btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(()=> `<li class="letter"></li>`).join("");
    gameModel.classList.remove("show")
}

const getRandomWord = ()=>{
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerHTML = hint;
    resetGame();

}

 const gameOver = (isVictory)=>{
    setTimeout( ()=>{
        const modalText = isVictory ? `You found the word: ` : ` The correct word was: `;
        gameModel.querySelector("img").src =  ` images/${isVictory? `victory` :  `lost`}.gif `;
        gameModel.querySelector("h4").src =  ` ${isVictory? `congrats!` :  `Game Over!`}. `;
        gameModel.querySelector("p").innerHTML =  ` ${modalText} <b> ${currentWord}</b>`;
        gameModel.classList.add("show")
    },300);
 }

  const intiGame = (button, clickedLetter) =>{
   if(currentWord.includes(clickedLetter)){
         [...currentWord].forEach((letter, index) => {
            if( letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerHTML = clickedLetter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
         })
   } else{
          wrongGuessesCount++;
          hangmanImage.src = `images/hangman-${wrongGuessesCount}.svg`;
   }
     button.disabled = true;
     guessesText.innerHTML = `${wrongGuessesCount} / ${maxGuesses} `;
     

        if(wrongGuessesCount === maxGuesses) return gameOver(false);
        if(correctLetters.length === currentWord.length) return gameOver(true);

  }
 
for(let i = 97 ; i<=122;i++){
    const button = document.createElement("button");
    button.innerHTML=String.fromCharCode(i)
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => intiGame(e.target,String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener('click',getRandomWord);