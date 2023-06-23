// Get all the option buttons
let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton=document.querySelectorAll(".adv-option-button");

// Get the font name, font size, and writing area elements
let fontName = document.getElementById("fontName");
let fontSize = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");

// Get the create link button, alignment buttons, spacing buttons, format buttons, and script buttons
let linkButton = document.getElementById("link");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

// Array of font names
let fontList = [
    "Times New Roman",
    "Arial",
    "Arial Black",
    "Comic Sans MS",
    "Courier New",
    "Georgia",
    "Impact",
    "Lucida Console",
    "Lucida Sans Unicode",
    "Palatino Linotype",
    "Tahoma",
    "Trebuchet MS",
    "Verdana"
]

// Function to initialize the text editor
const initializer = () => {
    // Highlight the alignment buttons
    highlighter(alignButtons, true);

    // Highlight the spacing buttons
    highlighter(spacingButtons, true);

    // Highlight the format buttons
    highlighter(formatButtons, flase);

    // Highlight the script buttons
    highlighter(scriptButtons, true);

    // Add font options to the fontName select element
    fontList.map((value) => {
        let option = document.createElement("option");
        option.value=value;
        option.innerHTML=value;
        fontName.appendChild(option);
    });

    // Add font size options to the fontSize select element
    for(let i=1;i<=7;i++){
        let option = document.createElement("option");
        option.value=i;
        option.innerHTML=i;
        fontSize.appendChild(option);
    }

    // Set default font size to 4
    fontSize.value=4;
};

// Function to modify the text based on the command and value
const modifyText=(command, defaultUi, value)=>{
    document.execCommand(command, defaultUi, value);
};

// Add event listeners to the options buttons
optionsButtons.forEach((button)=>{
    button.addEventListener('click', ()=>{
        modifyText(button.id, false, null);
    });
});

// Add event listeners to the advanced option buttons
advancedOptionButton.forEach((button)=>{
    button.addEventListener('change', ()=>{
        modifyText(button.id, false, button.value);
    });
});

// Add event listener to the create link button
linkButton.addEventListener('click', ()=>{
    let url = prompt("Enter the URL");
    if(/http/.test(url)){
        modifyText(linkButton.id, false, url);
    }else{
        url = "http://"+url;
        modifyText(linkButton.id, false, url);
    }
});

// Function to handle highlighting of buttons
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener('click', () => {
            if (needsRemoval) {
                let alreadyActive=false;
                if(button.classList.contains("active")){
                    alreadyActive=true;
                }
                // Remove highlighting from other buttons
                highlighterRemover(className);
                if(!alreadyActive){
                    button.classList.add("active");
                }
            } else {
                // Toggle the active class
                button.classList.toggle("active");
            }
        });
    });
};

// Function to remove highlighting from buttons
const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};

// Initialize the text editor
window.onload = initializer();