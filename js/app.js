/*
 * List that holds all of the cards
 */
const deck = document.querySelector('.deck');


//List of global variables
let toggledCards = [];
let moves = 0;
let stars = 3;
let timerOff = true;
let time = 0;
let timer;
let cardsMatched = 0;
const CARDS_PAIR = 2;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Event listener for a card
deck.addEventListener('click', event => {
    const clickTarget = event.target;
    if(validClick(clickTarget)
    ){
        if(timerOff){
            startTimer();
            timerOff = false;
        }
    }
    toggleCard(clickTarget);
    addToggleCard(clickTarget);
    if(toggledCards.length === CARDS_PAIR){
        checkPair(clickTarget);
        incrementMove();
        checkScore();
    }
});

//Function to avoid multiple cards from being open
function validClick(clickTarget){
    return(
        clickTarget.classList.contains('card')&&
        !clickTarget.classList.contains('match')&&
        toggledCards.length < 2 &&
        !toggledCards.includes(clickTarget)
    );
}

//Function that flips cards around to show pictures
function toggleCard(card){
    card.classList.toggle('open');
    card.classList.toggle('show');
}

//Store toggled cards into array
function addToggleCard(clickTarget){
    toggledCards.push(clickTarget);
}

//Compare card elements to establish if it is a match
function checkPair(){
    if(
        toggledCards[0].firstElementChild.className ===
        toggledCards[1].firstElementChild.className)
        {
        toggledCards[0].classList.toggle('match');
        toggledCards[1].classList.toggle('match'); 
        toggledCards = [];
        cardsMatched++;   
        }else{
            setTimeout(() => {
                toggleCard(toggledCards[0]);
                toggleCard(toggledCards[1]);
                toggledCards = [];
            },  1000);
        }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
