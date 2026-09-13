// =====================================================
// MEMORY FLIPPER
// Beginner-friendly workshop version
// =====================================================


// STEP 1
// -----------------------------------------------------
// Make a list of the different symbols in our game.
//
// We have 8 different symbols.
const symbols = [
    "🍎",
    "🍌",
    "🍇",
    "🍉",
    "🍒",
    "🍍",
    "🥝",
    "🍑"
];


// STEP 2
// -----------------------------------------------------
// We need TWO copies of every symbol,
// because every card needs a matching card.
//
// The ... copies the items from the array.
let cardValues = [...symbols, ...symbols];


// STEP 3
// -----------------------------------------------------
// Shuffle the order of the cards.
//
// Math.random() gives randomness.
// sort() changes the order of the array.
cardValues.sort(function() {
    return 0.5 - Math.random();
});


// STEP 4
// -----------------------------------------------------
// These variables remember the current state of the game.

// Cards that the player has currently opened.
let flippedCards = [];

// Number of pairs already matched.
let matchedCount = 0;


// STEP 5
// -----------------------------------------------------
// Find the HTML elements we need to control.

// The empty game board from HTML.
const board = document.getElementById("game-board");

// The score number from HTML.
const scoreDisplay = document.getElementById("score");


// STEP 6
// -----------------------------------------------------
// Create one card for every value in cardValues.
//
// forEach means:
// "Do this once for every item."
cardValues.forEach(function(symbol) {

    // Create a new div.
    const card = document.createElement("div");

    // Give the new div the CSS class "card".
    card.classList.add("card");

    // Store the symbol inside the card.
    //
    // We are not showing it yet.
    // We are only remembering it.
    card.dataset.symbol = symbol;

    // Listen for a click on this card.
    //
    // When clicked, run flipCard.
    card.addEventListener("click", flipCard);

    // Put the card inside the game board.
    board.appendChild(card);
});


// STEP 7
// -----------------------------------------------------
// This function runs when a card is clicked.
function flipCard() {

    // If two cards are already selected,
    // do not allow another card to open.
    if (flippedCards.length === 2) {
        return;
    }

    // Do not allow a card to be selected
    // if it is already flipped or already matched.
    if (
        this.classList.contains("flipped") ||
        this.classList.contains("matched")
    ) {
        return;
    }

    // Add the "flipped" CSS class.
    this.classList.add("flipped");

    // Show the symbol on the card.
    this.textContent = this.dataset.symbol;

    // Store this card inside flippedCards.
    flippedCards.push(this);

    // If there are now two cards,
    // check whether they match.
    if (flippedCards.length === 2) {
        checkMatch();
    }
}


// STEP 8
// -----------------------------------------------------
// This function checks the two selected cards.
function checkMatch() {

    // Get the first selected card.
    const first = flippedCards[0];

    // Get the second selected card.
    const second = flippedCards[1];


    // Compare the hidden symbols.
    if (first.dataset.symbol === second.dataset.symbol) {

        // The cards match.
        // Add the "matched" CSS class.
        first.classList.add("matched");
        second.classList.add("matched");

        // Increase the score by 1.
        matchedCount++;

        // Show the new score on the webpage.
        scoreDisplay.textContent = matchedCount;

        // Clear the selected cards.
        flippedCards = [];


        // Check if all 8 pairs were found.
        if (matchedCount === symbols.length) {

            // Wait a small amount of time,
            // then show the winning message.
            setTimeout(function() {
                alert("You won!");
            }, 300);
        }

    } else {

        // The cards do NOT match.
        //
        // Wait for 800 milliseconds
        // before hiding them again.
        setTimeout(function() {

            // Remove the flipped style.
            first.classList.remove("flipped");
            second.classList.remove("flipped");

            // Remove the symbols from the cards.
            first.textContent = "";
            second.textContent = "";

            // Clear the selected cards.
            flippedCards = [];

        }, 800);
    }
}