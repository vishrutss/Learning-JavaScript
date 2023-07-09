const btn = document.getElementById("btn");
const shapes = [
    "quad-circle-1",
    "quad-circle-2",
    "quad-circle-3",
    "quad-circle-4",
    "triange-1",
    "triange-2",
    "triange-3",
    "triange-4",
    "circle",
];

const colors=["#01d2fd", "#ffc700", "#fe9f12", "#06d0c7"];
const boxes=document.querySelectorAll(".container div");

//Generate a random pattern by assigning random shapes and colors to the boxes.
let generatePattern = () => {
    boxes.forEach((box) => {
        box.className=""; // Clear the current shape class
        let i=Math.floor(Math.random()*shapes.length); // Get a random shape index
        let j=Math.floor(Math.random()*colors.length); // Get a random color index
        box.classList.add(shapes[i]); // Add the random shape class
        box.style.backgroundColor=colors[j]; // Set the random color as background
    });
};

// Add click event listener to the button to generate a new pattern
btn.addEventListener("click", generatePattern);

// Generate a pattern when the window loads
window.addEventListener("load", generatePattern);