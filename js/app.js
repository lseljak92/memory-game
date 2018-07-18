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
const TOTAL_MATCHES = 8;
const exitButton = document.querySelector('.modal-exit');
const replayButton = document.querySelector('.modal-replay');
const restartIcon = document.querySelector('.restart');

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
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        if(toggledCards.length === 2){
            checkPair(clickTarget);
            incrementMove();
            checkScore();
        }
    }
});


//Function to avoid multiple cards from being open
function validClick(clickTarget){
    return(
        clickTarget.classList.contains('card') && 
        !clickTarget.classList.contains('match') &&
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
    console.log(toggledCards);
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
        winGame();
    }else{
        setTimeout(() => {
            toggleCard(toggledCards[0]);
            toggleCard(toggledCards[1]);
            toggledCards = [];
        },  1000);
    }
}

function incrementMove(){
    ++moves;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}

//Based on user's moves define score
function checkScore(){
    if(moves === 15 || moves === 25){
        removeStar();
    }
}

function removeStar(){
    const starList = document.querySelectorAll('.stars li');
    //Loop through star elements to show user's score
    for(star of starList){
        if(star.style.display !== 'none'){
            star.style.display = 'none';
            break;
        }
    }
}

function winGame(){
    if(cardsMatched === TOTAL_MATCHES){
        stopClock();
        toggleModal();
        displayGameStats();
    }
}

function startTimer(){
    timer = setInterval(() => {
        time++;
        displayTime();
        console.log(time);
    },  1000);
}

//Format time display
function displayTime(){
    const clock = document.querySelector('.timer');
    const minutes = Math.floor(time/60);
    const seconds = time%60;

    if(seconds < 10){
        clock.innerHTML = `${minutes}:0${seconds}`;
    }else{
        clock.innerHTML = `${minutes}:${seconds}`;
    }
}

function stopClock(){
    clearInterval(timer);
}

//Shuffle cards function
function shuffleDeck(){
    const cardsUnshuffled = Array.from(document.querySelectorAll('.deck li'));
    const cardsShuffled = shuffle(cardsUnshuffled);
    for(card of cardsShuffled){
        deck.appendChild(card);
    }
}

shuffleDeck();

function toggleModal(){
    const modal = document.querySelector('.modal-background');
    modal.classList.toggle('hide');
}

exitButton.addEventListener('click', event => {
    const clickButton = event.target;
    toggleModal();
})

replayButton.addEventListener('click', event => {
    const clickButton = event.target;
    toggleModal();
    replayGame();
    shuffleDeck();
})

restartIcon.addEventListener('click', event => {
    const clickButton = event.target;
    replayGame();
})


function replayGame(){
    resetTime();
    resetMoves();
    resetScore();
    resetDeck();
    shuffleDeck();
}

function resetTime(){
    stopClock();
    timerOff = true;
    time = 0;
    displayTime();
}

function resetMoves(){
    moves = 0;
    cardsMatched = 0;
    document.querySelector('.moves').innerHTML = moves;
}

function resetScore(){
    stars = 0;
    const starList = document.querySelectorAll('.stars li');
    for(star of starList){
        star.style.display = 'inline';
    }
}

function resetDeck(){
    const cards = document.querySelectorAll('.deck li');
    for(let card of cards){
        card.className = 'card';
    }
}

function displayGameStats(){
    const clock = document.querySelector('.timer');
    const minutes = Math.floor(time/60);
    const seconds = time%60;
    const stars = getStars();
    const totalMoves = moves+1;
    
    document.querySelector('.modal-time').innerHTML = `Time: ${minutes}:${seconds}`;
    document.querySelector('.modal-moves').innerHTML = `Moves: ${totalMoves}`;
    document.querySelector('.modal-score').innerHTML = `Score: ${stars}/3 stars`;
}

function getStars(){
    stars = document.querySelectorAll('.stars li');
    let starCount = 0;
    for(star of stars){
        if(star.style.display !== 'none'){
            starCount++;
        }
    }
    console.log(starCount);
    return starCount;
    
}