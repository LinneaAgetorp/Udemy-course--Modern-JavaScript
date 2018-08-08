//game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign UI min-max
minNum.textContent = min;
maxNum.textContent = max;

//play again event-listener
game.addEventListener('mousedown', (e)=> {
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

//Listen for guess
guessBtn.addEventListener('click', ()=> {
    let guess = parseInt(guessInput.value);

    //Validate:
    if(isNaN(guess) || guess < min || guess > max) {

        setMessage(`Please enter a number between ${min} and ${max}`, 'red')
    } else {

        // Check if won
        if(guess === winningNum) {
            gameOver(true, ` ${winningNum} is correct, you win!`)
        } else {
            guessesLeft --;

            if (guessesLeft === 0) {
                gameOver(false, `Game over. The correct number was ${winningNum}.`)
            } else {
                if (guess > winningNum) {
                    setMessage(`${guess} is too high, try lower. You have ${guessesLeft} guesses left`, 'red')
                } else {
                    setMessage(`${guess} is too low, try higher. You have ${guessesLeft} guesses left`, 'red')
                }
            }
        }
    }
    guessInput.value = '';
});

function getRandomNum(min, max) {
    return Math.floor(Math.random()* (max-min+1)+min)
}

function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    setMessage(msg, color)

    //play again?
    guessBtn.value = 'Play again?';
    guessBtn.className += 'play-again';
}