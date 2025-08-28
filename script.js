const icons = ['⭐', '❤️', '🌈', '🚀', '💡', '🎸', '⚽', '🎨'];
const cards = [...icons, ...icons]; // Duplica os ícones
cards.sort(() => Math.random() - 0.5);
const gameContainer = document.querySelector('.game-container');
cards.forEach(icon => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = `
        <div class="card-inner">
            <div class="card-front">${icon}</div>
            <div class="card-back"></div>
        </div>
    `;
    gameContainer.appendChild(cardElement);
});
let firstCard = null;
let secondCard = null;
let lockBoard = false; // Para evitar cliques enquanto as cartas estão sendo checadas
let matches = 0;

const allCards = document.querySelectorAll('.card');

allCards.forEach(card => {
    card.addEventListener('click', () => {
        if (lockBoard) return;
        if (card === firstCard) return;

        card.classList.add('flipped');

        if (!firstCard) {
            firstCard = card;
            return;
        }

        secondCard = card;
        checkForMatch();
    });
});
function checkForMatch() {
    let isMatch = firstCard.querySelector('.card-front').textContent === secondCard.querySelector('.card-front').textContent;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}