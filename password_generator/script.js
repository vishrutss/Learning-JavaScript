// Get the length slider, options, copy icon, password input, password indicator, and generate button elements
const lengthSlider = document.querySelector(".password-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".password-indicator");
const generateBtn = document.querySelector(".generate");

/**
 * Characters for different types of characters in the password
 */
const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-="
}

/**
 * Generates a random password based on selected options
 */
const generatePassword = () => {
    let staticPwd= "", // Static part of the password
        randomPwd = "", // Random part of the password
        excludeDuplicate = false, // Flag to exclude duplicate characters
        pwdLength = lengthSlider.value; // Length of the password

    options.forEach(option => {
        if(option.checked) {
            if(option.id !== "duplicate" && option.id !== "spaces") {
                staticPwd += characters[option.id];
            } else if(option.id === "spaces") {
                staticPwd += `${staticPwd}`; // Add the existing static part again to allow spaces
            } else {
                excludeDuplicate = true; // Exclude duplicate characters
            }
        }
    });

    for(let i = 0; i < pwdLength; i++) {
        let randomChar = staticPwd[Math.floor(Math.random() * staticPwd.length)];
        if(excludeDuplicate) {
            // Check if the random character is not already included in the password or is a space character
            !randomPwd.includes(randomChar) || randomChar== " " ? randomPwd += randomChar : i--;
        } else {
            randomPwd += randomChar;
        }
    }
    passwordInput.value = randomPwd; // Set the generated password in the input field
}

/**
 * Updates the password indicator based on the length
 */
const updatePasswordIndicator = () => {
    // Set the indicator ID based on the password length
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

/**
 * Updates the slider value and generates a new password
 */
const updateSlider = () => {
    document.querySelector(".password-length span").innerText = lengthSlider.value; // Update the span with the slider value
    generatePassword(); // Generate a new password
    updatePasswordIndicator(); // Update the password indicator
}
updateSlider(); // Initialize the slider value and generate the initial password

/**
 * Copies the password to the clipboard
 */
const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check"; // Copy the password to the clipboard
    copyIcon.style.color = "#4285f4"; // Change the icon color to blue
    setTimeout(() => {
        copyIcon.innerText = "copy_all"; // Change the icon back to copy icon
        copyIcon.style.color = "#707070"; // Change the icon color back to grey
    }, 1500);
}

// Event listeners
copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);