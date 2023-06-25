// Get the DOM elements
const download = document.querySelector(".download");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const qrContainer = document.querySelector("#qr-code");
const qrText = document.querySelector(".qr-text");
const shareBtn = document.querySelector(".share-btn");
const sizes = document.querySelector(".sizes");

// Event listeners
dark.addEventListener("input", handleDarkColor); // Event listener for dark color input change
light.addEventListener("input", handleLightColor); // Event listener for light color input change
qrText.addEventListener("input", handleQRText); // Event listener for QR text input change
sizes.addEventListener("input", handleSize); // Event listener for QR size input change
shareBtn.addEventListener("click", handleShare); // Event listener for share button click

// Default values
const defaultUrl = "https://www.google.com";
let colorLight = "#ffffff",
    colorDark = "#000000",
    text = defaultUrl,
    size = 400;

/**
 * Handles the change in dark color input
 * @param {Event} e - The event object
 */
function handleDarkColor(e) {
    colorDark = e.target.value;
    generateQR();
}

/**
 * Handles the change in light color input
 * @param {Event} e - The event object
 */
function handleLightColor(e) {
    colorLight = e.target.value;
    generateQR();
}

/**
 * Handles the change in QR text input
 * @param {Event} e - The event object
 */
function handleQRText(e) {
    const value = e.target.value;
    text = value ? value : defaultUrl;
    generateQR();
}

/**
 * Generates the QR code based on the current settings
 */
async function generateQR() {
    qrContainer.innerHTML = "";
    new QRCode("qr-code", {
        text,
        height: size,
        width: size,
        colorDark,
        colorLight,
    });
    download.href=await resolveDataURL();
}

/**
 * Handles the share button click
 */
async function handleShare() {
    setTimeout(async() => {
        try {
            const base64 = await resolveDataURL();
            const blob = await (await fetch(base64)).blob();
            const file = new File([blob], "qr-code.png", { type: blob.type });
            await navigator.share({ files: [file], title: text });
        } catch (error) {
            alert("Error sharing");
        }
    }, 100);
}

/**
 * Handles the change in size input
 * @param {Event} e - The event object
 */
function handleSize(e) {
    size = e.target.value;
    generateQR();
}

/**
 * Resolves the data URL of the QR code image
 * @returns {Promise<string>} - The resolved data URL
 */
function resolveDataURL() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const img = document.querySelector("#qr-code img");
            if (img.currentSrc) {
                resolve(img.currentSrc);
                return;
            }
            const canvas = document.querySelector("canvas");
            resolve(canvas.toDataURL());
        }, 50);
    });
}

generateQR(); // Generate the QR code on page load