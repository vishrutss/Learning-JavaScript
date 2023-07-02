// Get references to the HTML input elements
let ratioWidth = document.getElementById("ratio-width");
let ratioHeight = document.getElementById("ratio-height");
let width = document.getElementById("width");
let height = document.getElementById("height");

// Calculate the width based on the height and ratio
let calculateWidth = () => {
    let ratio = ratioWidth.value / ratioHeight.value;
    width.value = parseFloat(height.value * ratio).toFixed(2);
}

// Calculate the height based on the width and ratio
let calculateHeight = () => {
    let ratio = ratioWidth.value / ratioHeight.value;
    height.value = parseFloat(width.value / ratio).toFixed(2);
}

// Add event listener to the height input to calculate the width
height.addEventListener("input", calculateWidth);

// Add event listener to the height input to calculate the height
width.addEventListener("input", calculateHeight);

// Add event listener to the ratio height input to calculate the width
ratioHeight.addEventListener("input", calculateWidth);

// Add event listener to the ratio width input to calculate the height
ratioWidth.addEventListener("input", calculateHeight);