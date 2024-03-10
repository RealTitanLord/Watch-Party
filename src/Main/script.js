const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

async function setupLocalVideo() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        localVideo.srcObject = stream;
    } catch (error) {
        console.error('Error accessing media devices:', error);
    }
}

function setupPeerConnection() {

    const peerConnection = new RTCPeerConnection();

    localVideo.srcObject.getTracks().forEach(track => peerConnection.addTrack(track, localVideo.srcObject));

    peerConnection.ontrack = event => {

        remoteVideo.srcObject = event.streams[0];
    };

    return peerConnection;
}

setupLocalVideo();

const peerConnection = setupPeerConnection();
