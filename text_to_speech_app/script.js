// Get DOM elements
const textarea = document.querySelector('textarea'),
    voiceList = document.querySelector('select'),
    speechBtn = document.querySelector('button');

// Initialize SpeechSynthesis and set isSpeaking flag to true
let synth = speechSynthesis,
    isSpeaking = true;

// Load available voices on page load
voices();

/**
 * Loads available voices and populates the voice list.
 */
function voices() {
    for (let voice of synth.getVoices()) {
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML('beforeend', option);
    }
}

// Update voice list when voices change
synth.addEventListener('voiceschanged', voices);

/**
 * Converts the provided text to speech using the selected voice.
 * @param {string} text - The text to convert to speech.
 */
function textToSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        if (voice.name === voiceList.value) {
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}

// Event listener for speech button click
speechBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (textarea.value !== "") {
        if (!synth.speaking) {
            // If not speaking, start speech synthesis
            textToSpeech(textarea.value);
        }
        if (textarea.value > 80) {
            // If text length exceeds 80 characters, handle pause/resume functionality
            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    // Resume speech if paused
                    isSpeaking = true;
                    speechBtn.innerText = "Convert to Speech";
                }
            }, 500);
            if (isSpeaking) {
                // If speaking, pause speech
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            } else {
                // If paused, resume speech
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
        } else {
            // If text length is within limit, display default button text
            speechBtn.innerText = "Convert to Speech";
        }
    }
});