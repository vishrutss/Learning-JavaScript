const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchageIcon = document.querySelector(".exchange");
const selectTag = document.querySelectorAll("select");
const icons = document.querySelectorAll(".row i");
const translateBtn = document.querySelector("button");

// Populate select tags with options for language selection
selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "am-ET" ? "selected" : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

// Exchange input language and translated language
exchageIcon.addEventListener("click", () => {
    let tempText = fromText.value, tempLang = selectTag[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
});

// Clear "to" text if "from" text is empty
fromText.addEventListener("keyup", () => {
    if (!fromText.value) toText.value = "";
});

translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim(), translateFrom = selectTag[0].value, translateTo = selectTag[1].value;
    if(!text)
        return;

    // Set placeholder while translating
    toText.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${translateFrom}&tl=${translateTo}&dt=t&q=${encodeURI(text)}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        // Display translated text
        toText.value=data[0][0][0];

        // If available, display alternative translation
        data.matches.forEach(data => {
            if(data.id===0){
                toText.value=data.translation;
            }
        });

        // Set placeholder back to normal
        toText.setAttribute("placeholder", "Translated");
    });
});

icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        if (!fromText.value || !toText.value) return;
        if (target.classList.contains("fa-copy")) {
            // Copy text to clipboard
            if (target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            // Speak the text using text-to-speech
            let utterance;
            if (target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
});