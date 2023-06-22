// Get the container element
let container=document.querySelector(".container");

// Get the buttons and input elements
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-picker");
let eraseBtn = document.getElementById("clear-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

// Define mouse and touch events
let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup",
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
    },
};

// Variable to store the device type (mouse or touch)
let deviceType = "";

// Variable to track drawing and erasing state
let draw=false;
let erase=false;

// Check if the device is touch-enabled
const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

// Detect the device type and set the appropriate event listeners
isTouchDevice();

// Add event listener to the grid button
gridButton.addEventListener("click", () => {
    // Clear the container
    container.innerHTML = "";

    // Counter variable for unique IDs
    let count=0;

    // Create rows and columns based on the selected grid width and height
    for(let i=0;i<gridHeight.value;i++){
        count+=2;
        let row=document.createElement("div");
        row.classList.add("gridRow");

        for(let j=0;j<gridWidth.value;j++){
            count+=2;
            let col=document.createElement("div");
            col.classList.add("gridCol");
            col.setAttribute("id",`gridCol${count}`);

            // Add event listeners for drawing and erasing
            col.addEventListener(events[deviceType].down, () => {
                draw = true;
                if(erase){
                    col.style.backgroundColor="transparent";
                } else {
                    col.style.backgroundColor=colorButton.value;
                }
            });

            col.addEventListener(events[deviceType].move, (e) => {
                // Get the element ID under the cursor/touch
                let elementId=document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY
                ).id;
                checker(elementId);
            });

            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });
            row.appendChild(col);
        }

        container.appendChild(row);
    }
});

// Function to check if the current element matches the one under the cursor/touch
function checker(elementId){
    let gridCols=document.querySelectorAll(".gridCol");
    gridCols.forEach((col)=>{
        if(col.id===elementId){
            if(draw){
                if(erase){
                    col.style.backgroundColor="transparent";
                } else {
                    col.style.backgroundColor=colorButton.value;
                }
            }
        }
    });
}

// Add event listener to the clear grid button
clearGridButton.addEventListener("click", () => {
    container.innerHTML = "";
});

// Add event listeners to the erase and paint buttons
eraseBtn.addEventListener("click", () => {
    erase = true;
});
paintBtn.addEventListener("click", () => {
    erase = false;
});

// Update the displayed width value when the width input changes
gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

// Update the displayed height value when the height input changes
gridHeight.addEventListener("input", () => {
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

// Initialize grid width and height values to 0 on page load
window.onload = () => {
    gridHeight.value = 0;
    gridWidth.value = 0;
};