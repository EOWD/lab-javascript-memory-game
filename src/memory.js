class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
    this.elapsedTime;
    
  }

  shuffleCards() {
    if (!this.cards) {
      return undefined;
    } else {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    } 
  }

  checkIfPair(card1, card2) {
    this.pairsClicked += 1;
    if (card1 === card2) {
      this.pairsGuessed += 1;
    }
    return card1 === card2;
  }

  checkIfFinished() {
    return this.pairsGuessed / 2 === this.cards.length / 2;
  }
  showWinPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "block";
  }

  startTimer() {
    this.elapsedSeconds = 0;
    this.updateTimer();
    this.timerInterval = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }
  updateTimer() {
    const minutes = Math.floor(this.elapsedSeconds / 60);
    const seconds = this.elapsedSeconds % 60;

    const timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = `Time: ${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    this.elapsedSeconds++;
  }
  stopTimer() {
    clearInterval(this.timerInterval);
  }
  resetGame() {
    this.pairsClicked = 0;
    this.pairsGuessed = 0;

    clearInterval(this.timerInterval);

    document.querySelectorAll(".card.turned").forEach((card) => {
      card.classList.remove("turned");
    });

    const timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = "Time: 00:00";
  }
}
