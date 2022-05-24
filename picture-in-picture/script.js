const videoElement = document.getElementById('video');
const startBtn = document.getElementById('start');

async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {   // onloadedmetadata returns true after media is loaded
            videoElement.play();
        }
    }
     catch (error) {
         console.log(`Whoops! something went wrong!`);
     }
}

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    videoElement.requestPictureInPicture();
    startBtn.disabled = false;
})


selectMediaStream();
