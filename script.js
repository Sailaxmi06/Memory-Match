// JavaScript to handle game logic

const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let flippedCards = [];
let matchedCards = [];
let boardLocked = false;

// Shuffle the cards
function shuffleCards() {
    const shuffledArray = [...cardValues];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];  // Swap elements
    }
    return shuffledArray;
}

// Create card elements
function createCard(cardValue, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-value', cardValue);
    card.setAttribute('data-id', index);
    card.addEventListener('click', onCardClick);
    return card;
}

// Handle card flip
function onCardClick(event) {
    if (boardLocked) return;
    
    const card = event.target;
    if (card.classList.contains('flipped') || matchedCards.includes(card)) return;

    card.textContent = card.getAttribute('data-value');
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        boardLocked = true;
        setTimeout(checkMatch, 1000);
    }
}

// Check if flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.getAttribute('data-value') === card2.getAttribute('data-value')) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        document.getElementById('status').textContent = `${matchedCards.length / 2} Pairs Matched!`;
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
    }
    flippedCards = [];
    boardLocked = false;

    // Check if all pairs are matched
    if (matchedCards.length === cardValues.length) {
        setTimeout(() => alert('You Win!'), 500);
    }
}

// Restart the game
function restartGame() {
    flippedCards = [];
    matchedCards = [];
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    const shuffledValues = shuffleCards();

    shuffledValues.forEach((value, index) => {
        const card = createCard(value, index);
        gameBoard.appendChild(card);
    });

    document.getElementById('status').textContent = '';
}

// Initialize game
restartGame();
