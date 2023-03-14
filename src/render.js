// Buttons
const videoElement = document.querySelector('video');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const videoSelectBtn = document.getElementById('videoSelectBtn');
videoSelectBtn.onclick = getVideoSources; // click event handler


const { desktopCapturer, remote } = require('electron'); // connetion electron
const { Menu } = remote;
// remote to control IPC

// Get the available video sources
async function getVideoSources() {
  const inputSources = await desktopCapturer.getSources({
    types: ['window', 'screen']
  });

  const videoOptionsMenu = Menu.buildFromTemplate(
    inputSources.map(source => {
      return {
        label: source.name,
        click: () => selectSource(source)
      };
    })
  );


  videoOptionsMenu.popup();
}


// change the videoSource window to record
async function selectSource(source) {
    videoSelectBtn.innerText = source.name;

    const constraints = {
        audio: false,
        video: {
            mandatory: {
                chromeMediaSouce: 'desktop',
                chromeMediaSouceId: source.id
            }
        }
    }

    //create a stream
    const stream = await navigator.mediaDevices
        .getUserMedia(constraints)

    // preview the source in a video element
    videoElement.srcObject = stream;
    videoElement.play()

}