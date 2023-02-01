let triesElement = document.querySelector(".tries span");
let successElement = document.querySelector(".success-matches span");
// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function () {
  show_pop_input();
};

// Effect Duration
let duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelector(".block-container");

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

// Create Range Of Keys
// let orderRange = [...Array(blocks.length).keys()];

let orderRange = Array.from(Array(blocks.length).keys());

// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {
  // Add CSS Order Property
  block.style.order = orderRange[index];

  // Add Click Event
  block.addEventListener("click", function () {
    // Trigger The Flip Block Function
    flipBlock(block);
  });
});

// Flip Block Function
function flipBlock(selectedBlock) {
  // Add Class is-flipped
  selectedBlock.classList.add("is-flipped");

  // Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  // If Theres Two Selected Blocks
  if (allFlippedBlocks.length === 2) {
    // console.log('Two Flipped Blocks Selected');

    // Stop Clicking Function
    stopClicking();

    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// Stop Clicking Function
function stopClicking() {
  // Add Class No Clicking on Main Container
  blocksContainer.classList.add("no-clicking");

  // Wait Duration
  setTimeout(() => {
    // Remove Class No Clicking After The Duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {
  if (firstBlock.dataset.character === secondBlock.dataset.character) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    document.getElementById("success").play();
    successElement.innerHTML = parseInt(successElement.innerHTML) + 1;
    if (successElement.innerHTML == 10) {
      show_pop_conformation();
    }
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    document.getElementById("fail").play();

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}

// Shuffle Function
function shuffle(array) {
  // Settings Vars
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);

    // Decrease Length By One
    current--;

    // [1] Save Current Element in Stash
    temp = array[current];

    // [2] Current Element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element From Stash
    array[random] = temp;
  }
  return array;
}

function resetGame() {
  location.reload();
}

/* pop up */

function show_pop_input() {
  document.querySelector(".pop-up-container").classList.add("open");
  document.querySelector(".card-input").classList.add("open");
}

function hide_pop_input() {
  document.querySelector(".pop-up-container").classList.remove("open");
  document.querySelector(".card-input").classList.remove("open");
  // Prompt Window To Ask For Name
  // let yourName = prompt("Whats Your Name?");

  let yourName = document.getElementById("input-name").value;
  if (yourName == null || yourName == "") {
    // If Name Is Empty
    // Set Name To Unknown
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    // Name Is Not Empty
    // Set Name To Your Name
    document.querySelector(".name span").innerHTML = yourName;
  }

  // Remove Splash Screen
  document.querySelector(".control-buttons").remove();

  document.getElementById("relax").play();

  // Timer Part //

  // The End Of The Year Date To Countdown To
  // 1000 milliseconds = 1 Second

  let countDownDate = new Date().getTime() + 1000 * 101;
  // console.log(countDownDate);

  let counter = setInterval(() => {
    // Get Date Now
    let dateNow = new Date().getTime();

    // Find The Date Difference Between Now And Countdown Date
    let dateDiff = countDownDate - dateNow;

    // Get Time Units
    let seconds = Math.floor(dateDiff / 1000);
    document.querySelector(".seconds").innerHTML = seconds;

    if (dateDiff < 2) {
      clearInterval(counter);
      document.querySelector(".seconds").innerHTML = 0;
      show_pop_warning();
    }
  }, 1000);
}

function show_pop_conformation() {
  document.querySelector(".pop-up-container").classList.add("open");
  document.querySelector(".card-confirmation").classList.add("open");
}

function hide_pop_conformation() {
  document.querySelector(".pop-up-container").classList.remove("open");
  document.querySelector(".card-confirmation").classList.remove("open");
  resetGame();
}

function show_pop_warning() {
  document.querySelector(".pop-up-container").classList.add("open");
  document.querySelector(".card-warning").classList.add("open");
}

function hide_pop_warning() {
  document.querySelector(".pop-up-container").classList.remove("open");
  document.querySelector(".card-warning").classList.remove("open");
  resetGame();
}
