// Відповідність назв → файлів картинок
const filenameMap = {
    "6": "picture6.png",
    "7": "picture7.png",
    "8": "picture8.png",
    "9": "picture9.png",
    "10": "picture10.png",
    "Валет": "picture11.png",
    "Дама": "picture12.png",
    "Король": "picture13.png",
    "Туз": "picture14.png"
};

// Значення карт
const cardValues = {
    "6": 6, "7": 7, "8": 8, "9": 9, "10": 10,
    "Валет": 2, "Дама": 3, "Король": 4, "Туз": 11
};

const cards = Object.keys(cardValues);

let userScore = 0;
let computerScore = 0;
let rounds = 0;

// DOM елементи
const userScoreEl = document.getElementById("userScore");
const computerScoreEl = document.getElementById("computerScore");
const userCardsEl = document.getElementById("userCards");
const computerCardsEl = document.getElementById("computerCards");
const generateBtn = document.getElementById("generateBtn");
const resultEl = document.getElementById("result");
const startBtn = document.getElementById("startBtn");
const nameInput = document.getElementById("playerName");
const userName = document.getElementById("userName");

// Випадкова карта
function getRandomCard() {
    return cards[Math.floor(Math.random() * cards.length)];
}

// Додати картку як <img>
function addCard(container, cardName) {
    const img = document.createElement("img");
    img.className = "card-image";
    img.alt = cardName;

    // Шлях до картинки
    img.src = `cards/${filenameMap[cardName]}`;

    // Якщо зображення не знайдено → placeholder
    img.onerror = function () {
        img.src = "cards.png";
        img.alt = cardName + " (немає зображення)";
    };

    container.appendChild(img);
}

// Скидання стану
function resetGame() {
    userScore = 0;
    computerScore = 0;
    rounds = 0;

    userScoreEl.textContent = 0;
    computerScoreEl.textContent = 0;

    userCardsEl.innerHTML = "";
    computerCardsEl.innerHTML = "";
    resultEl.textContent = "";

    generateBtn.disabled = true;
    startBtn.disabled = false;
    nameInput.disabled = false;
}

// Початок гри
startBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (name === "") {
        alert("Введіть ім’я!");
        return;
    }

    userName.textContent = name;
    nameInput.disabled = true;
    startBtn.disabled = true;
    generateBtn.disabled = false;
});

// Взяти карту
generateBtn.addEventListener("click", () => {
    if (rounds >= 3) return;

    const userCard = getRandomCard();
    const computerCard = getRandomCard();

    userScore += cardValues[userCard];
    computerScore += cardValues[computerCard];

    userScoreEl.textContent = userScore;
    computerScoreEl.textContent = computerScore;

    addCard(userCardsEl, userCard);
    addCard(computerCardsEl, computerCard);

    rounds++;

    if (rounds === 3) {
        generateBtn.disabled = true;

        if (userScore > computerScore)
            resultEl.textContent = userName.textContent + " переміг!";
        else if (computerScore > userScore)
            resultEl.textContent = "Комп’ютер переміг!";
        else
            resultEl.textContent = "Нічия!";

        const replay = document.createElement("button");
        replay.textContent = "Грати знову";
        replay.style.marginLeft = "10px";

        replay.addEventListener("click", () => {
            replay.remove();
            resetGame();
        });

        resultEl.appendChild(replay);
    }
});

