const buttonElement = document.getElementById('button');
const audioElement = document.getElementById('audio');


buttonElement.addEventListener('click', () => {
   playText(buttonElement.textContent);
});

function playText(text) {
     const utterance = new SpeechSynthesisUtterance(text);
     console.log(utterance);
     speechSynthesis.speak(utterance);
}