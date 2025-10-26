// hidden box
const btn = document.getElementById("toggle");
const box = document.getElementById("box");

// audio assets
const S = 'public/audio_assets/';
const good_sound = new Audio(`${S}ding.mp3`);
const bad_sound = new Audio(`${S}swoosh.mp3`);
const Roulette_sound = new Audio(`${S}roleta.mp3`);
const Roulette_victory_sound = new Audio(`${S}roleta_victory.mp3`);


// Games setup and logic
// roulette game
function setUpRoulette() {
  const container =
    document.querySelector("#roulette-choices") ||
    document.querySelector("#forms__radio .list");

  // safety check
  if (!container) return; 
  container.innerHTML = "";

  // creating rulette number choices 1-36
  for (let i = 1; i <= 36; i++) {
    const li = document.createElement("li");
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "roulette-guess";
    radio.value = i;
    label.appendChild(radio);
    label.appendChild(document.createTextNode(" " + i));
    li.appendChild(label);
    container.appendChild(li);
  }
}
function spinRoulette() {
  const checked = document.querySelector('input[name="roulette-guess"]:checked');
  if (!checked) {
    alert("Please pick a number first.");
    return;
  }
  Roulette_sound.play();
  setTimeout(() => displayRouletteResult(), 3000); // 3s delay to simulate spinning
}

function displayRouletteResult() {
  const result = Math.floor(Math.random() * 36 + 1); 
  const resultEl = document.querySelector("#roulette-result");
  if (resultEl) resultEl.innerHTML = `Result: ${result}`;
  // Check user's guess
  const checked = document.querySelector('input[name="roulette-guess"]:checked');
  const userGuess = parseInt(checked.value, 10);

  if (userGuess === result) {
    Roulette_victory_sound.play();
    alert("Congratulations! Your guess was correct!");
  } else {
    bad_sound.play();
  }
}

// high low game
function setupHighLow() {
  let highScore = 0;
  let number = Math.floor(Math.random() * 52) + 1; // Random card
  let Shapes = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  let shape = Shapes[Math.floor((number - 1) / 13)];
  let cardNumber = ((number - 1) % 13) + 1;

  const cardImg = document.querySelector("#card-image");
  if (cardImg) {
    cardImg.src = `public/Image_assets/card images/card-${cardNumber}-${shape}.png`;
  }
  console.log("Starting number is " + number);

  function guessHigh() {
    let won = false;
    let newNumber = Math.floor(Math.random() * 52) + 1;
    let NewcardNumber = ((newNumber - 1) % 13) + 1;
    if (NewcardNumber >= cardNumber) {
      good_sound.play();
      won = true;
    } else {
      bad_sound.play();
    }
    number = newNumber;
    shape = Shapes[Math.floor((number - 1) / 13)];
    cardNumber = ((number - 1) % 13) + 1;
    if (cardImg) cardImg.src = `public/Image_assets/card images/card-${cardNumber}-${shape}.png`;

    const scoreEl = document.querySelector("#score");
    const highScoreEl = document.querySelector("#high-score");
    let score = scoreEl ? parseInt(scoreEl.innerText || "0", 10) : 0;

    if (won) {
      score++;
      if (score > highScore) {
        highScore = score;
        if (highScoreEl) highScoreEl.innerText = highScore;
      }
    } else {
      score = 0;
    }
    if (scoreEl) scoreEl.innerText = score;
  }

  function guessLow() {
    let won = false;
    let newNumber = Math.floor(Math.random() * 52) + 1;
    let NewcardNumber = ((newNumber - 1) % 13) + 1;
    if (NewcardNumber <= cardNumber) {
      good_sound.play();
      won = true;
    } else {
      bad_sound.play();
    }
    number = newNumber;
    shape = Shapes[Math.floor((number - 1) / 13)];
    cardNumber = ((number - 1) % 13) + 1;
    if (cardImg) cardImg.src = `public/Image_assets/card images/card-${cardNumber}-${shape}.png`;

    const scoreEl = document.querySelector("#score");
    const highScoreEl = document.querySelector("#high-score");
    let score = scoreEl ? parseInt(scoreEl.innerText || "0", 10) : 0;

    if (won) {
      score++;
      if (score > highScore) {
        highScore = score;
        if (highScoreEl) highScoreEl.innerText = highScore;
      }
    } else {
      score = 0;
    }
    if (scoreEl) scoreEl.innerText = score;
  }

  const gh = document.querySelector("#guess-high");
  const gl = document.querySelector("#guess-low");
  if (gh) gh.addEventListener("click", guessHigh);
  if (gl) gl.addEventListener("click", guessLow);
}

// Initialize games on page load
if (document.querySelector("#forms__radio .list") || document.querySelector("#roulette-choices")) {
  setUpRoulette();
  const spinBtn = document.querySelector("#spin-button");
  if (spinBtn) spinBtn.addEventListener("click", spinRoulette);
}

if (document.querySelector("#guess-high") || document.querySelector("#card-image")) {
  try {
    btn.addEventListener("click", () => {
    box.classList.toggle("hidden");
    });
    setupHighLow();
  } catch (e) {
    console.error("setupHighLow failed:", e);
  }
}