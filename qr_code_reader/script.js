// Get DOM elements
const wrapper = document.querySelector(".wrapper");
const form = document.querySelector("form");
const fileInp = document.querySelector("input");
const infoText = document.querySelector("p");
const clearBtn = document.querySelector(".clear");
const copyBtn = document.querySelector(".copy");

/**
 * Sends a request to the API to fetch data from a QR code image.
 * @param {File} file - The QR code image file.
 * @param {FormData} formData - The form data containing the file to send in the request.
 */
function fetchRequest(file, formData) {
    infoText.innerText = "Scanning QR Code...";
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: 'POST', body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        infoText.innerText = result ? "Upload QR Code To Scan" : "Couldn't Scan QR Code";
        if (!result) return;
        document.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper.classList.add("active");
    }).catch(() => {
        infoText.innerText = "Couldn't Scan QR Code...";
    });
}

// Event listener for file input change
fileInp.addEventListener("change", async e => {
    let file = e.target.files[0];
    if (!file) return;
    let formData = new FormData();
    formData.append('file', file);
    fetchRequest(file, formData);
});

// Event listener for copy button click
copyBtn.addEventListener("click", () => {
    let text = document.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});

// Event listener to trigger file input when form is clicked
form.addEventListener("click", () => fileInp.click());

// Event listener for clear button click
clearBtn.addEventListener("click", () => wrapper.classList.remove("active"));