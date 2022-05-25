const videoElement = document.getElementById('video');
const toggleBtn = document.getElementById('toggle');

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

toggleBtn.addEventListener('click', () => {
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
    } else {
        videoElement.requestPictureInPicture().catch(err => console.log(err));
    }
})


selectMediaStream();
