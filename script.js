// Importing required elements from DOM
const playBtn = document.getElementById("playbutton");
const videoElmnt = document.getElementById("playvideo");
const selectStream = document.getElementById("selectscreen");

let mediaStream;

// function to get Screen and stream
async function streamVideo() {
  try {
    // Launch screen capture selector
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    // Stop any existing streams on video element
    if (videoElmnt.srcObject) {
      videoElmnt.srcObject.getTracks().forEach((track) => track.stop());
    }
    // Set new stream on video element
    videoElmnt.srcObject = stream;
  } catch (error) {
    console.log("Error encountered:", error);
  }
}

selectStream.addEventListener("click", async () => {
  await streamVideo();
});

playBtn.addEventListener("click", async () => {
  // Disable Button
  playBtn.disabled = true;
  // Start PIP
  await videoElmnt.requestPictureInPicture();
  videoElmnt.play();
  // Enable button
  playBtn.disabled = false;
});
