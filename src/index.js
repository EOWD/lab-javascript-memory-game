const cards = [
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" },
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" },
];

const memoryGame = new MemoryGame(cards);
console.log(memoryGame);
const LoadGame = window.addEventListener("load", (event) => {
  memoryGame.startTimer();
  let html = "";
  memoryGame.shuffleCards();
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });


  document.querySelector("#memory-board").innerHTML = html;
  const playAgainButton = document.getElementById("play-again-button");

  playAgainButton.addEventListener("click", () => {
    memoryGame.resetGame();
    const popup = document.getElementById("popup");
    popup.style.display = "none";
  });

  const flippedCards = [];

  let isClickDisabled = false;

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      if (isClickDisabled) return;
      card.classList.toggle("turned");
      flippedCards.push(card);
      if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        if (
          memoryGame.checkIfPair(
            card1.getAttribute("data-card-name"),
            card2.getAttribute("data-card-name")
          )
        ) {
          memoryGame.checkIfPair();

          document.querySelector("#pairs-guessed").innerHTML =
            memoryGame.pairsGuessed / 2;
        } else {
          isClickDisabled = true;
          setTimeout(() => {
            card1.classList.remove("turned");
            card2.classList.remove("turned");
            isClickDisabled = false;
          }, 500);
        }
        flippedCards.length = 0;
      }
      if (memoryGame.checkIfFinished()) {
        memoryGame.updateTimer();
        memoryGame.stopTimer();
        memoryGame.showWinPopup();
      }

      document.querySelector("#pairs-clicked").innerHTML =
        memoryGame.pairsClicked;

      console.log(`Card clicked: ${card}`);
    });
  });
});
