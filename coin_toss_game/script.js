// Initialize variables to keep track of the number of heads and tails
let heads=0;
let tails=0;

// Get references to the coin, toss button, and reset button elements
let coin = document.querySelector(".coin");
let toss = document.querySelector("#toss");
let reset = document.querySelector("#reset");

// Add event listener to toss button
toss.addEventListener("click", () =>{
    // Generate a random number (0 or 1) to determine the result of the toss
    let result = Math.floor(Math.random()*2);

    // Stop any ongoing animation on the coin
    coin.style.animation = "none";

    // Update the animation based on the toss result (heads or tails)
    if(result) {
        setTimeout(function() {
            coin.style.animation = "spin-heads 3s forwards";
        }, 100);
        heads++;
    } else {
        setTimeout(function() {
            coin.style.animation = "spin-tails 3s forwards";
        }, 100);
        tails++;
    }

    // Update the statistics after the animation completes
    setTimeout(updateStats, 3000);

    // Disable the toss button temporarily to prevent rapid clicking
    disableButton();
});

// Update the displayed statistics (number of heads and tails)
function updateStats() {
    document.querySelector("#heads").textContent = `Heads: ${heads}`;
    document.querySelector("#tails").textContent = `Tails: ${tails}`;
}

// Disable the toss button temporarily to prevent rapid clicking
function disableButton() {
    toss.disabled = true;
    setTimeout(function() {
        toss.disabled = false;
    }, 3000);
}

// Reset the coin animation and statistics to their initial state
reset.addEventListener("click", () => {
    coin.style.animation = "none";
    heads = 0;
    tails = 0;
    updateStats();
});