//Random quotes api
const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";
const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");

let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;

/**
 * Fetches a new quote from the API and renders it on the page.
 */
const renderNewQuote = async () => {
    const response = await fetch(quoteApiUrl);
    let data = await response.json();
    quote = data.content;

    let arr=quote.split("").map((value) => {
        return "<span class='quote-chars'>" + value + "</span>";
    });
    quoteSection.innerHTML += arr.join("");
};

userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars");
    quoteChars = Array.from(quoteChars);

    let userInputChars = userInput.value.split("");
    quoteChars.forEach((char, index) => {
        if(char.innerText == userInputChars[index]) {
            char.classList.add("success");
        } else if (userInputChars[index] == null) {
            if (char.classList.contains("success")) {
                char.classList.remove("success");
            } else {
                char.classList.remove("fail");
            }
        } else {
            if (!char.classList.contains("fail")) {
                mistakes++;
                char.classList.add("fail");
            }
            document.getElementById("mistakes").innerText = mistakes;
        }

        let check = quoteChars.every((element) => {
            return element.classList.contains("success");
        });

        if(check) {
            displayResult();
        }
    });
});

/**
 * Updates the timer display every second.
 */
function updateTimer() {
    if(time == 0) {
        displayResult();
    } else {
        document.getElementById("timer").innerText = --time + "s";
    }
}

/**
 * Reduces the time and starts the timer.
 */
const timeReduce = () => {
    time = 60;
    timer = setInterval(updateTimer, 1000);
};

/**
 * Displays the test result and calculates WPM and accuracy.
 */
const displayResult = () => {
    document.querySelector(".result").style.display = "block";
    clearInterval(timer);
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    let timeTaken = 1;
    if(time != 0) {
        timeTaken = (60 - time) / 100;
    }
    document.getElementById("wpm").innerText = (userInput.value.length / 5 / timeTaken).toFixed(2) + " wpm";
    document.getElementById("accuracy").innerText = Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100) + "%";
};

/**
 * Starts the test by resetting mistakes, enabling user input, and reducing the time.
 */
const startTest = () => {
    mistakes = 0;
    timer = "";
    userInput.disabled = false;
    timeReduce();
    document.getElementById("start-test").style.display = "none";
    document.getElementById("stop-test").style.display = "block";
};

window.onload = () => {
    userInput.value = "";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    renderNewQuote();
}