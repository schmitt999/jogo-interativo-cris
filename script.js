const icons = ['⭐', '❤️', '🌈', '🚀', '💡', '🎸', '⚽', '🎨'];
const cards = [...icons, ...icons];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Embaralha as cartas
cards.sort(() => Math.random() - 0.5);

// Pega o contêiner do jogo no HTML
const gameContainer = document.querySelector('.game-container');

// Cria as cartas e adiciona ao HTML
cards.forEach(icon => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = `
        <div class="card-inner">
            <div class="card-front">${icon}</div>
            <div class="card-back"></div>
        </div>
    `;
    cardElement.addEventListener('click', flipCard);
    gameContainer.appendChild(cardElement);
});

// Função para virar a carta
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Função para checar se as cartas são um par
function checkForMatch() {
    const firstCardContent = firstCard.querySelector('.card-front').textContent;
    const secondCardContent = secondCard.querySelector('.card-front').textContent;

    if (firstCardContent === secondCardContent) {
        disableCards();
    } else {
        unflipCards();
    }
}

// Lógica para cartas combinadas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    resetBoard();
}

// Lógica para cartas que não combinam
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Reseta o estado do tabuleiro para a próxima jogada
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}